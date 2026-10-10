import React, { useState, useEffect } from 'react';
import { CVData, Language } from './types/cv';
import { emptyCVData, sampleCVData } from './data/defaultData';
import { Header } from './components/Header';
import { FormContainer } from './components/Form/FormContainer';
import { PreviewPane } from './components/Preview/PreviewPane';
import { TemplateGalleryModal } from './components/TemplateGalleryModal';
import { DownloadModal } from './components/Download/DownloadModal';
import { translations } from './utils/translations';
import { Edit3, Eye, Sparkles, LayoutTemplate, RotateCcw } from 'lucide-react';

const STORAGE_DATA_KEY = 'bangla_cv_builder_data_v1';
const STORAGE_LANG_KEY = 'bangla_cv_builder_lang_v1';
const STORAGE_TPL_KEY = 'bangla_cv_builder_tpl_v1';
const STORAGE_THEME_KEY = 'bangla_cv_builder_theme_v1';

export default function App() {
  // 1. Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_LANG_KEY);
    return saved === 'en' ? 'en' : 'bn';
  });

  // 2. Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_THEME_KEY) === 'dark';
  });

  // 3. Selected template ID
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_TPL_KEY) || 'classic-corporate';
  });

  // 4. CV Data state with LocalStorage
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return sampleCVData; // Pre-fill with rich sample data so user immediately sees live preview!
  });

  // 5. Modals and mobile views
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_THEME_KEY, 'light');
    }
  }, [darkMode]);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(cvData));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [cvData]);

  // Sync lang & template
  useEffect(() => {
    localStorage.setItem(STORAGE_LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TPL_KEY, selectedTemplateId);
  }, [selectedTemplateId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLoadSample = () => {
    setCvData(sampleCVData);
    showToast(translations[lang].actions.sampleLoadedAlert);
  };

  const handleResetData = () => {
    if (window.confirm(translations[lang].actions.confirmReset)) {
      setCvData(emptyCVData);
      showToast(translations[lang].actions.dataResetAlert);
    }
  };

  const t = translations[lang];

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
      {/* Top Navigation */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onLoadSample={handleLoadSample}
        onResetData={handleResetData}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Mobile Sub-Toolbar & Tab Switcher */}
      <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between no-print">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMobileTab('form')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              mobileTab === 'form'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.editForm}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              mobileTab === 'preview'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.preview}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-lg"
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>{t.templates}</span>
        </button>
      </div>

      {/* Main Workspace Split Layout */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-3 sm:px-6 py-4 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Form Editor (Sticky on Desktop) */}
          <section
            className={`lg:col-span-5 xl:col-span-4 flex flex-col ${
              mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="bg-slate-50/50 dark:bg-slate-900/40 p-1 rounded-2xl flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200 dark:border-slate-800 mb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-blue-600" />
                    <span>{t.editForm}</span>
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'bn'
                      ? 'যেকোনো তথ্য পরিবর্তন করলে স্বয়ংক্রিয়ভাবে ডানপাশের প্রিভিউতে আপডেট হবে'
                      : 'Changes sync immediately into the live resume preview'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title={t.loadSample}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetData}
                    className="p-1.5 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title={t.resetData}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Accordion Form Container */}
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
                <FormContainer
                  data={cvData}
                  onChange={setCvData}
                  lang={lang}
                />
              </div>
            </div>
          </section>

          {/* Right Column: Live A4 Preview Pane */}
          <section
            className={`lg:col-span-7 xl:col-span-8 flex flex-col min-h-[600px] ${
              mobileTab === 'form' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <PreviewPane
              data={cvData}
              lang={lang}
              templateId={selectedTemplateId}
              onOpenTemplates={() => setIsTemplateModalOpen(true)}
              onOpenDownload={() => setIsDownloadModalOpen(true)}
            />
          </section>
        </div>
      </main>

      {/* Modals */}
      <TemplateGalleryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={(tplId) => setSelectedTemplateId(tplId)}
        lang={lang}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        data={cvData}
        lang={lang}
        targetElementId="cv-preview-sheet"
      />
    </div>
  );
}

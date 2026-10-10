import React from 'react';
import {
  FileText,
  Globe,
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
  Download,
  LayoutTemplate,
} from 'lucide-react';
import { Language } from '../types/cv';
import { translations } from '../utils/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLoadSample: () => void;
  onResetData: () => void;
  onOpenTemplates: () => void;
  onOpenDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  onLoadSample,
  onResetData,
  onOpenTemplates,
  onOpenDownload,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5" />
          </div>
          <a href="#" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
            {t.appTitle}
          </a>
        </div>

        {/* Zone 2: Navigation & Quick Actions */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>{t.templates}</span>
          </button>

          <button
            type="button"
            onClick={onLoadSample}
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.loadSample}</span>
          </button>

          <button
            type="button"
            onClick={onResetData}
            className="flex items-center gap-1.5 hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap text-slate-500"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetData}</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition-colors whitespace-nowrap"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.toggleLang}</span>
          </button>

          {/* Dark Mode Switcher */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Dark / Light Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mobile Quick Toggles */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex lg:hidden items-center gap-1">
            <button
              type="button"
              onClick={onToggleLang}
              className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              {lang === 'bn' ? 'EN' : 'বাংলা'}
            </button>
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.download}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

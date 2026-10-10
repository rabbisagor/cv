import React, { useState } from 'react';
import { X, FileText, Image, FileCode, Printer, Check, Loader2, Download } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { translations } from '../../utils/translations';
import { exportToPdf, exportToImage } from '../../utils/exportPdf';
import { exportToDocx } from '../../utils/exportDocx';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  lang: Language;
  targetElementId: string;
}

type ExportFormat = 'pdf' | 'png' | 'jpg' | 'docx';

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  data,
  lang,
  targetElementId,
}) => {
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const defaultName = (lang === 'bn' ? data.personal.nameBn : data.personal.nameEn) || 'Resume';
  const sanitizedName = defaultName.trim().replace(/\s+/g, '_');
  const [filename, setFilename] = useState(`${sanitizedName}_CV`);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      const cleanFilename = filename.trim() || 'Resume';

      if (format === 'pdf') {
        await exportToPdf(targetElementId, cleanFilename);
      } else if (format === 'png') {
        await exportToImage(targetElementId, cleanFilename, 'png');
      } else if (format === 'jpg') {
        await exportToImage(targetElementId, cleanFilename, 'jpeg');
      } else if (format === 'docx') {
        await exportToDocx(data, lang, cleanFilename);
      }

      setExportSuccess(true);
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Download failed:', err);
      setIsExporting(false);
    }
  };

  const handleDirectPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 dark:text-white text-base">
              {t.exportModal.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Filename Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.exportModal.filenameLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <span className="text-xs font-mono font-bold text-slate-500 uppercase px-2 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                .{format}
              </span>
            </div>
          </div>

          {/* Format Picker Cards */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t.exportModal.formatLabel}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* PDF */}
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === 'pdf'
                    ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-600" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">PDF Document</span>
                  </div>
                  {format === 'pdf' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'bn' ? 'প্রিন্ট ও ইমেইলের জন্য সেরা' : 'Optimal for job applications'}
                </p>
              </button>

              {/* DOCX */}
              <button
                type="button"
                onClick={() => setFormat('docx')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === 'docx'
                    ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Word (DOCX)</span>
                  </div>
                  {format === 'docx' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'bn' ? 'MS Word-এ এডিটেবল' : 'Editable Microsoft Word format'}
                </p>
              </button>

              {/* PNG */}
              <button
                type="button"
                onClick={() => setFormat('png')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === 'png'
                    ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">PNG Image</span>
                  </div>
                  {format === 'png' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'bn' ? 'ক্রিস্প হাই-রেজোলিউশন ইমেজ' : 'High resolution graphic'}
                </p>
              </button>

              {/* JPG */}
              <button
                type="button"
                onClick={() => setFormat('jpg')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === 'jpg'
                    ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">JPG Image</span>
                  </div>
                  {format === 'jpg' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'bn' ? 'ছোট ফাইল সাইজ ইমেজ' : 'Compact picture format'}
                </p>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 leading-relaxed">
            💡 {t.exportModal.qualityNotice}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDirectPrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            {t.printDirect}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors"
            >
              {t.actions.cancel}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.exportModal.generating}</span>
                </>
              ) : exportSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportModal.downloadBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

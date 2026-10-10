import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Printer, Download, Sparkles, LayoutTemplate } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { TemplateRenderer } from '../Templates/TemplateRenderer';
import { translations } from '../../utils/translations';
import { templatesList } from '../../data/templates';

interface PreviewPaneProps {
  data: CVData;
  lang: Language;
  templateId: string;
  onOpenTemplates: () => void;
  onOpenDownload: () => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  data,
  lang,
  templateId,
  onOpenTemplates,
  onOpenDownload,
}) => {
  const [zoom, setZoom] = useState<number>(0.85); // good default view on standard screens
  const t = translations[lang];
  const activeTemplate = templatesList.find((tpl) => tpl.id === templateId);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.45));
  };

  const handleResetZoom = () => {
    setZoom(0.85);
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 dark:bg-slate-950/80 rounded-2xl border border-slate-300/80 dark:border-slate-800 overflow-hidden shadow-inner">
      {/* Top Controls Bar */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 no-print">
        {/* Template info & Quick trigger */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors truncate"
            title={t.templates}
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">
              {activeTemplate ? (lang === 'bn' ? activeTemplate.nameBn : activeTemplate.nameEn) : t.templates}
            </span>
          </button>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.printDirect}</span>
          </button>

          <button
            type="button"
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.download}</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Viewport Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shrink-0 mb-12 shadow-2xl rounded-sm transition-transform"
        >
          {/* Target for html2canvas and print */}
          <div
            id="cv-preview-sheet"
            className="cv-print-area w-[210mm] min-h-[297mm] bg-white overflow-hidden"
          >
            <TemplateRenderer
              templateId={templateId}
              data={data}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Check, LayoutTemplate, Sparkles, Filter } from 'lucide-react';
import { CVTemplateConfig, Language, TemplateCategory } from '../types/cv';
import { templatesList } from '../data/templates';
import { translations } from '../utils/translations';

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  lang: Language;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
  lang,
}) => {
  const [filter, setFilter] = useState<TemplateCategory>('all');
  const t = translations[lang];

  if (!isOpen) return null;

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'corporate', label: t.categories.corporate },
    { id: 'minimal', label: t.categories.minimal },
    { id: 'govt_bank', label: t.categories.govt_bank },
    { id: 'creative', label: t.categories.creative },
    { id: 'tech', label: t.categories.tech },
    { id: 'compact', label: t.categories.compact },
  ];

  const filteredTemplates = filter === 'all'
    ? templatesList
    : templatesList.filter((tpl) => tpl.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                {t.allTemplates}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'bn'
                  ? 'আপনার ক্যারিয়ার লক্ষ্যের সাথে মানানসই সেরা টেমপ্লেটটি নির্বাচন করুন'
                  : 'Select the optimal template aligned with your industry standard'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters (Segmented tabs) */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((tpl) => {
            const isSelected = tpl.id === selectedTemplateId;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`group relative rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Miniature Visual Layout representation */}
                  <div className="h-28 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 relative border border-slate-200/60 dark:border-slate-700/60 p-2.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: tpl.accentColor }}
                        />
                        <div className="w-16 h-2 rounded bg-slate-300 dark:bg-slate-600" />
                      </div>
                      <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <div className="space-y-1.5 my-auto">
                      <div className="w-full h-1.5 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="w-5/6 h-1.5 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="w-4/6 h-1.5 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700/60 text-[9px] text-slate-500">
                      <span>A4 Format</span>
                      <span className="font-semibold" style={{ color: tpl.accentColor }}>
                        {lang === 'bn' ? tpl.tagBn : tpl.tagEn}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Title and descriptions */}
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {lang === 'bn' ? tpl.nameBn : tpl.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {lang === 'bn' ? tpl.descriptionBn : tpl.descriptionEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">
                    {tpl.category.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                      isSelected
                        ? 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40'
                        : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white'
                    }`}
                  >
                    {isSelected ? t.actions.currentlySelected : t.actions.selectTemplate}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <span className="text-xs text-slate-500">
            {lang === 'bn'
              ? `মোট ${templatesList.length}টি টেমপ্লেট প্রস্তুত আছে`
              : `${templatesList.length} production templates ready`}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {t.actions.close}
          </button>
        </div>
      </div>
    </div>
  );
};

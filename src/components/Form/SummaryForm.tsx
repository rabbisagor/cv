import React from 'react';
import { CVData, Language } from '../../types/cv';
import { translations } from '../../utils/translations';

interface SummaryFormProps {
  data: CVData;
  onChange: (updated: { summaryBn?: string; summaryEn?: string }) => void;
  lang: Language;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          {lang === 'bn' ? 'ক্যারিয়ার অবজেক্টিভ / সামারি (বাংলায়)' : 'Career Objective / Summary (Bengali)'}
        </label>
        <textarea
          rows={4}
          value={data.summaryBn}
          onChange={(e) => onChange({ summaryBn: e.target.value })}
          placeholder="আপনার অভিজ্ঞতা, মূল দক্ষতা এবং লক্ষ্য সংক্রান্ত সংক্ষিপ্ত বিবরণ..."
          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          {lang === 'bn' ? 'ক্যারিয়ার অবজেক্টিভ / সামারি (ইংরেজিতে)' : 'Career Objective / Summary (English)'}
        </label>
        <textarea
          rows={4}
          value={data.summaryEn}
          onChange={(e) => onChange({ summaryEn: e.target.value })}
          placeholder="Professional summary describing your key strengths, years of experience, and objectives..."
          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};

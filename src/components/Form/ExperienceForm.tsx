import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { CVData, ExperienceItem, Language } from '../../types/cv';
import { translations } from '../../utils/translations';

interface ExperienceFormProps {
  data: CVData;
  onChange: (experience: ExperienceItem[]) => void;
  lang: Language;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const handleAdd = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      positionBn: '',
      positionEn: '',
      companyBn: '',
      companyEn: '',
      duration: '',
      location: '',
      responsibilities: [''],
    };
    onChange([...data.experience, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, val: any) => {
    onChange(
      data.experience.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.experience.filter((item) => item.id !== id));
  };

  const handleResponsibilitiesChange = (id: string, rawText: string) => {
    const bullets = rawText.split('\n').filter((line) => line.trim().length > 0);
    handleUpdate(id, 'responsibilities', bullets);
  };

  return (
    <div className="space-y-4">
      {data.experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>
                {lang === 'bn' ? `অভিজ্ঞতা #${idx + 1}` : `Experience #${idx + 1}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(exp.id)}
              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.positionBn}
              </label>
              <input
                type="text"
                value={exp.positionBn}
                onChange={(e) => handleUpdate(exp.id, 'positionBn', e.target.value)}
                placeholder="যেমন: সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.positionEn}
              </label>
              <input
                type="text"
                value={exp.positionEn}
                onChange={(e) => handleUpdate(exp.id, 'positionEn', e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.companyBn}
              </label>
              <input
                type="text"
                value={exp.companyBn}
                onChange={(e) => handleUpdate(exp.id, 'companyBn', e.target.value)}
                placeholder="ব্রেইন স্টেশন ২৩ পিএলসি, ঢাকা"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.companyEn}
              </label>
              <input
                type="text"
                value={exp.companyEn}
                onChange={(e) => handleUpdate(exp.id, 'companyEn', e.target.value)}
                placeholder="e.g. Brain Station 23 PLC"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.duration}
              </label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleUpdate(exp.id, 'duration', e.target.value)}
                placeholder="২০২১ - বর্তমান (2021 - Present)"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.location}
              </label>
              <input
                type="text"
                value={exp.location || ''}
                onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                placeholder="ঢাকা, বাংলাদেশ / Dhaka, Bangladesh"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t.fields.responsibilities}
            </label>
            <textarea
              rows={3}
              value={exp.responsibilities.join('\n')}
              onChange={(e) => handleResponsibilitiesChange(exp.id, e.target.value)}
              placeholder="মাইক্রোসার্ভিস ডিজাইন ও ডেভেলপমেন্ট&#10;টিম লিডিং ও কোড রিভিউ পরিচালনা&#10;পারফরম্যান্স অপটিমাইজেশন"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 border border-dashed border-blue-300 dark:border-blue-800 rounded-xl transition-colors"
      >
        <Plus className="w-4 h-4" />
        {t.actions.addExperience}
      </button>
    </div>
  );
};

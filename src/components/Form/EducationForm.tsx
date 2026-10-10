import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { CVData, EducationItem, Language } from '../../types/cv';
import { translations } from '../../utils/translations';

interface EducationFormProps {
  data: CVData;
  onChange: (education: EducationItem[]) => void;
  lang: Language;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degreeBn: '',
      degreeEn: '',
      institutionBn: '',
      institutionEn: '',
      boardUniversity: '',
      year: '',
      result: '',
      details: '',
    };
    onChange([...data.education, newItem]);
  };

  const handleUpdate = (id: string, field: keyof EducationItem, val: string) => {
    onChange(
      data.education.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.education.map((edu, idx) => (
        <div
          key={edu.id}
          className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>
                {lang === 'bn' ? `ডিগ্রি #${idx + 1}` : `Degree #${idx + 1}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(edu.id)}
              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.degreeBn}
              </label>
              <input
                type="text"
                value={edu.degreeBn}
                onChange={(e) => handleUpdate(edu.id, 'degreeBn', e.target.value)}
                placeholder="যেমন: বিএসসি ইন সিএসই"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.degreeEn}
              </label>
              <input
                type="text"
                value={edu.degreeEn}
                onChange={(e) => handleUpdate(edu.id, 'degreeEn', e.target.value)}
                placeholder="e.g. B.Sc. in CSE"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.institutionBn}
              </label>
              <input
                type="text"
                value={edu.institutionBn}
                onChange={(e) => handleUpdate(edu.id, 'institutionBn', e.target.value)}
                placeholder="বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (BUET)"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.institutionEn}
              </label>
              <input
                type="text"
                value={edu.institutionEn}
                onChange={(e) => handleUpdate(edu.id, 'institutionEn', e.target.value)}
                placeholder="e.g. BUET, Dhaka"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.passingYear}
              </label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleUpdate(edu.id, 'year', e.target.value)}
                placeholder="২০১৮ / 2018"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.resultGpa}
              </label>
              <input
                type="text"
                value={edu.result}
                onChange={(e) => handleUpdate(edu.id, 'result', e.target.value)}
                placeholder="CGPA: 3.82 / 4.00"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.boardUniversity}
              </label>
              <input
                type="text"
                value={edu.boardUniversity || ''}
                onChange={(e) => handleUpdate(edu.id, 'boardUniversity', e.target.value)}
                placeholder="BUET / Dhaka Board"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 border border-dashed border-blue-300 dark:border-blue-800 rounded-xl transition-colors"
      >
        <Plus className="w-4 h-4" />
        {t.actions.addEducation}
      </button>
    </div>
  );
};

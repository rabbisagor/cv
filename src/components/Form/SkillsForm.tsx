import React, { useState } from 'react';
import { Plus, X, Globe } from 'lucide-react';
import { CVData, Language, LanguageItem } from '../../types/cv';
import { translations } from '../../utils/translations';

interface SkillsFormProps {
  data: CVData;
  onChange: (updated: {
    technicalSkills?: string[];
    softSkills?: string[];
    languages?: LanguageItem[];
  }) => void;
  lang: Language;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange, lang }) => {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const t = translations[lang];

  // Technical skills handlers
  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const items = techInput.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    const updated = Array.from(new Set([...data.technicalSkills, ...items]));
    onChange({ technicalSkills: updated });
    setTechInput('');
  };

  const handleRemoveTech = (index: number) => {
    onChange({ technicalSkills: data.technicalSkills.filter((_, i) => i !== index) });
  };

  // Soft skills handlers
  const handleAddSoft = () => {
    if (!softInput.trim()) return;
    const items = softInput.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    const updated = Array.from(new Set([...data.softSkills, ...items]));
    onChange({ softSkills: updated });
    setSoftInput('');
  };

  const handleRemoveSoft = (index: number) => {
    onChange({ softSkills: data.softSkills.filter((_, i) => i !== index) });
  };

  // Language handlers
  const handleAddLanguage = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      nameBn: '',
      nameEn: '',
      proficiencyBn: 'মাতৃভাষা (Native)',
      proficiencyEn: 'Native',
    };
    onChange({ languages: [...data.languages, newItem] });
  };

  const handleUpdateLanguage = (id: string, field: keyof LanguageItem, val: string) => {
    onChange({
      languages: data.languages.map((l) => (l.id === id ? { ...l, [field]: val } : l)),
    });
  };

  const handleRemoveLanguage = (id: string) => {
    onChange({ languages: data.languages.filter((l) => l.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {t.fields.techSkills}
        </label>
        <div className="flex gap-2 mb-2.5">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTech();
              }
            }}
            placeholder="যেমন: React, TypeScript, Node.js, Docker..."
            className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="px-3 py-1.5 text-xs font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {lang === 'bn' ? '+ যোগ করুন' : '+ Add'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 min-h-8 p-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl">
          {data.technicalSkills.length === 0 && (
            <span className="text-xs text-slate-400 italic">
              {lang === 'bn' ? 'কোনো টেক স্কিল যোগ করা হয়নি' : 'No technical skills added yet'}
            </span>
          )}
          {data.technicalSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 shadow-2xs"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveTech(idx)}
                className="text-slate-400 hover:text-red-500 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {t.fields.softSkills}
        </label>
        <div className="flex gap-2 mb-2.5">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSoft();
              }
            }}
            placeholder="যেমন: টিম লিডারশিপ, যোগাযোগ দক্ষতা, ক্রিটিকাল থিংকিং..."
            className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAddSoft}
            className="px-3 py-1.5 text-xs font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {lang === 'bn' ? '+ যোগ করুন' : '+ Add'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 min-h-8 p-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl">
          {data.softSkills.length === 0 && (
            <span className="text-xs text-slate-400 italic">
              {lang === 'bn' ? 'কোনো সফট স্কিল যোগ করা হয়নি' : 'No soft skills added yet'}
            </span>
          )}
          {data.softSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 shadow-2xs"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSoft(idx)}
                className="text-slate-400 hover:text-red-500 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>{t.sections.languages}</span>
          </div>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {t.actions.addLanguage}
          </button>
        </div>

        <div className="space-y-2.5">
          {data.languages.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl"
            >
              <input
                type="text"
                value={item.nameBn}
                onChange={(e) => handleUpdateLanguage(item.id, 'nameBn', e.target.value)}
                placeholder="বাংলা নাম"
                className="w-1/4 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
              />
              <input
                type="text"
                value={item.nameEn}
                onChange={(e) => handleUpdateLanguage(item.id, 'nameEn', e.target.value)}
                placeholder="English name"
                className="w-1/4 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
              />
              <input
                type="text"
                value={item.proficiencyBn}
                onChange={(e) => handleUpdateLanguage(item.id, 'proficiencyBn', e.target.value)}
                placeholder="দক্ষতা (যেমন: মাতৃভাষা)"
                className="flex-1 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveLanguage(item.id)}
                className="p-1 text-slate-400 hover:text-red-500 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

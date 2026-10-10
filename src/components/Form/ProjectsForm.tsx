import React from 'react';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';
import { CVData, ProjectItem, Language } from '../../types/cv';
import { translations } from '../../utils/translations';

interface ProjectsFormProps {
  data: CVData;
  onChange: (projects: ProjectItem[]) => void;
  lang: Language;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      titleBn: '',
      titleEn: '',
      descriptionBn: '',
      descriptionEn: '',
      technologies: [],
      link: '',
      github: '',
    };
    onChange([...data.projects, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, val: any) => {
    onChange(
      data.projects.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.projects.map((proj, idx) => (
        <div
          key={proj.id}
          className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <FolderGit2 className="w-4 h-4 text-blue-600" />
              <span>
                {lang === 'bn' ? `প্রজেক্ট #${idx + 1}` : `Project #${idx + 1}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(proj.id)}
              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.projectTitleBn}
              </label>
              <input
                type="text"
                value={proj.titleBn}
                onChange={(e) => handleUpdate(proj.id, 'titleBn', e.target.value)}
                placeholder="ডিজিটাল ব্যাংকিং গেটওয়ে"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.projectTitleEn}
              </label>
              <input
                type="text"
                value={proj.titleEn}
                onChange={(e) => handleUpdate(proj.id, 'titleEn', e.target.value)}
                placeholder="Digital Banking Gateway"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t.fields.projectTech}
            </label>
            <input
              type="text"
              value={proj.technologies.join(', ')}
              onChange={(e) =>
                handleUpdate(
                  proj.id,
                  'technologies',
                  e.target.value.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
                )
              }
              placeholder="React, Node.js, PostgreSQL, Docker"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.projectDescBn}
              </label>
              <textarea
                rows={2}
                value={proj.descriptionBn}
                onChange={(e) => handleUpdate(proj.id, 'descriptionBn', e.target.value)}
                placeholder="প্রজেক্টের মূল কাজ ও ফলাফল..."
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.projectDescEn}
              </label>
              <textarea
                rows={2}
                value={proj.descriptionEn}
                onChange={(e) => handleUpdate(proj.id, 'descriptionEn', e.target.value)}
                placeholder="Key outcomes, architecture and impact..."
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.projectLink}
              </label>
              <input
                type="text"
                value={proj.link || ''}
                onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                placeholder="https://live-app.com"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                GitHub Repo URL
              </label>
              <input
                type="text"
                value={proj.github || ''}
                onChange={(e) => handleUpdate(proj.id, 'github', e.target.value)}
                placeholder="github.com/username/project"
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
        {t.actions.addProject}
      </button>
    </div>
  );
};

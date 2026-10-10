import React, { useState } from 'react';
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderGit2,
  ShieldCheck,
  Award,
  Users,
  ChevronDown,
} from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { translations } from '../../utils/translations';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm, AwardsForm, ReferencesForm } from './ExtraSectionsForm';

interface FormContainerProps {
  data: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const FormContainer: React.FC<FormContainerProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: false,
    projects: false,
    certifications: false,
    awards: false,
    references: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionsList = [
    {
      id: 'personal',
      title: t.sections.personal,
      icon: User,
      badge: (data.personal.nameBn || data.personal.nameEn) ? 'Done' : 'Required',
      component: (
        <PersonalInfoForm
          data={data}
          onChange={(personal) => onChange({ ...data, personal: { ...data.personal, ...personal } })}
          lang={lang}
        />
      ),
    },
    {
      id: 'summary',
      title: t.sections.summary,
      icon: FileText,
      badge: (data.summaryBn || data.summaryEn) ? `${(data.summaryBn || data.summaryEn).length} chars` : '',
      component: (
        <SummaryForm
          data={data}
          onChange={(summary) => onChange({ ...data, ...summary })}
          lang={lang}
        />
      ),
    },
    {
      id: 'experience',
      title: t.sections.experience,
      icon: Briefcase,
      badge: data.experience.length > 0 ? `${data.experience.length}` : '',
      component: (
        <ExperienceForm
          data={data}
          onChange={(experience) => onChange({ ...data, experience })}
          lang={lang}
        />
      ),
    },
    {
      id: 'education',
      title: t.sections.education,
      icon: GraduationCap,
      badge: data.education.length > 0 ? `${data.education.length}` : '',
      component: (
        <EducationForm
          data={data}
          onChange={(education) => onChange({ ...data, education })}
          lang={lang}
        />
      ),
    },
    {
      id: 'skills',
      title: t.sections.skills,
      icon: Wrench,
      badge: `${data.technicalSkills.length + data.softSkills.length}`,
      component: (
        <SkillsForm
          data={data}
          onChange={(skills) => onChange({ ...data, ...skills })}
          lang={lang}
        />
      ),
    },
    {
      id: 'projects',
      title: t.sections.projects,
      icon: FolderGit2,
      badge: data.projects.length > 0 ? `${data.projects.length}` : '',
      component: (
        <ProjectsForm
          data={data}
          onChange={(projects) => onChange({ ...data, projects })}
          lang={lang}
        />
      ),
    },
    {
      id: 'certifications',
      title: t.sections.certifications,
      icon: ShieldCheck,
      badge: data.certifications.length > 0 ? `${data.certifications.length}` : '',
      component: (
        <CertificationsForm
          data={data}
          onChange={(certifications) => onChange({ ...data, certifications })}
          lang={lang}
        />
      ),
    },
    {
      id: 'awards',
      title: t.sections.awards,
      icon: Award,
      badge: data.awards.length > 0 ? `${data.awards.length}` : '',
      component: (
        <AwardsForm
          data={data}
          onChange={(awards) => onChange({ ...data, awards })}
          lang={lang}
        />
      ),
    },
    {
      id: 'references',
      title: t.sections.references,
      icon: Users,
      badge: data.references.length > 0 ? `${data.references.length}` : '',
      component: (
        <ReferencesForm
          data={data}
          onChange={(references) => onChange({ ...data, references })}
          lang={lang}
        />
      ),
    },
  ];

  return (
    <div className="space-y-3 pb-8">
      {sectionsList.map((sec) => {
        const isOpen = !!openSections[sec.id];
        const Icon = sec.icon;

        return (
          <div
            key={sec.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs transition-all"
          >
            <button
              type="button"
              onClick={() => toggleSection(sec.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {sec.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {sec.badge && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                    {sec.badge}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                {sec.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

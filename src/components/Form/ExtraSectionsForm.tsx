import React from 'react';
import { Plus, Trash2, Award, ShieldCheck, Users } from 'lucide-react';
import { CVData, CertificationItem, AwardItem, ReferenceItem, Language } from '../../types/cv';
import { translations } from '../../utils/translations';

// --- Certifications Form ---
interface CertificationsFormProps {
  data: CVData;
  onChange: (certifications: CertificationItem[]) => void;
  lang: Language;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      titleBn: '',
      titleEn: '',
      issuerBn: '',
      issuerEn: '',
      year: '',
      credentialUrl: '',
    };
    onChange([...data.certifications, newItem]);
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, val: string) => {
    onChange(
      data.certifications.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.certifications.map((cert, idx) => (
        <div
          key={cert.id}
          className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>
                {lang === 'bn' ? `সার্টিফিকেশন #${idx + 1}` : `Certification #${idx + 1}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(cert.id)}
              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.certTitleBn}
              </label>
              <input
                type="text"
                value={cert.titleBn}
                onChange={(e) => handleUpdate(cert.id, 'titleBn', e.target.value)}
                placeholder="AWS সার্টিফাইড আর্কিটেক্ট"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.certTitleEn}
              </label>
              <input
                type="text"
                value={cert.titleEn}
                onChange={(e) => handleUpdate(cert.id, 'titleEn', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.certIssuerBn}
              </label>
              <input
                type="text"
                value={cert.issuerBn}
                onChange={(e) => handleUpdate(cert.id, 'issuerBn', e.target.value)}
                placeholder="অ্যামাজন ওয়েব সার্ভিসেস"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.certIssuerEn}
              </label>
              <input
                type="text"
                value={cert.issuerEn}
                onChange={(e) => handleUpdate(cert.id, 'issuerEn', e.target.value)}
                placeholder="Amazon Web Services"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.certYear}
              </label>
              <input
                type="text"
                value={cert.year}
                onChange={(e) => handleUpdate(cert.id, 'year', e.target.value)}
                placeholder="২০২৩ / 2023"
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
        {t.actions.addCertification}
      </button>
    </div>
  );
};

// --- Awards Form ---
interface AwardsFormProps {
  data: CVData;
  onChange: (awards: AwardItem[]) => void;
  lang: Language;
}

export const AwardsForm: React.FC<AwardsFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const handleAdd = () => {
    const newItem: AwardItem = {
      id: `award-${Date.now()}`,
      titleBn: '',
      titleEn: '',
      organizationBn: '',
      organizationEn: '',
      year: '',
      summaryBn: '',
      summaryEn: '',
    };
    onChange([...data.awards, newItem]);
  };

  const handleUpdate = (id: string, field: keyof AwardItem, val: string) => {
    onChange(
      data.awards.map((a) => (a.id === id ? { ...a, [field]: val } : a))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.awards.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.awards.map((award, idx) => (
        <div
          key={award.id}
          className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Award className="w-4 h-4 text-amber-500" />
              <span>
                {lang === 'bn' ? `পুরস্কার #${idx + 1}` : `Award #${idx + 1}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(award.id)}
              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.awardTitleBn}
              </label>
              <input
                type="text"
                value={award.titleBn}
                onChange={(e) => handleUpdate(award.id, 'titleBn', e.target.value)}
                placeholder="জাতীয় সফটওয়্যার অ্যাওয়ার্ড"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.awardTitleEn}
              </label>
              <input
                type="text"
                value={award.titleEn}
                onChange={(e) => handleUpdate(award.id, 'titleEn', e.target.value)}
                placeholder="National Software Innovation Award"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.awardOrgBn}
              </label>
              <input
                type="text"
                value={award.organizationBn}
                onChange={(e) => handleUpdate(award.id, 'organizationBn', e.target.value)}
                placeholder="তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ (ICT Division)"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.awardYear}
              </label>
              <input
                type="text"
                value={award.year}
                onChange={(e) => handleUpdate(award.id, 'year', e.target.value)}
                placeholder="২০১৯ / 2019"
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
        {t.actions.addAward}
      </button>
    </div>
  );
};

// --- References Form ---
interface ReferencesFormProps {
  data: CVData;
  onChange: (references: ReferenceItem[]) => void;
  lang: Language;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({ data, onChange, lang }) => {
  const t = translations[lang];

  const handleAdd = () => {
    const newItem: ReferenceItem = {
      id: `ref-${Date.now()}`,
      nameBn: '',
      nameEn: '',
      designationBn: '',
      designationEn: '',
      organizationBn: '',
      organizationEn: '',
      phone: '',
      email: '',
      relationBn: '',
      relationEn: '',
    };
    onChange([...data.references, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ReferenceItem, val: string) => {
    onChange(
      data.references.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleRemove = (id: string) => {
    onChange(data.references.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-4">
      {data.references.map((ref, idx) => (
        <div
          key={ref.id}
          className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Users className="w-4 h-4 text-blue-600" />
              <span>
                {lang === 'bn' ? `রেফারেন্স #${idx + 1}` : `Reference #${idx + 1}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(ref.id)}
              className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
              title={t.actions.delete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.refNameBn}
              </label>
              <input
                type="text"
                value={ref.nameBn}
                onChange={(e) => handleUpdate(ref.id, 'nameBn', e.target.value)}
                placeholder="ড. মো: শামসুল আরেফিন"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.refNameEn}
              </label>
              <input
                type="text"
                value={ref.nameEn}
                onChange={(e) => handleUpdate(ref.id, 'nameEn', e.target.value)}
                placeholder="Dr. Md. Shamsul Arefin"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.refDesignationBn}
              </label>
              <input
                type="text"
                value={ref.designationBn}
                onChange={(e) => handleUpdate(ref.id, 'designationBn', e.target.value)}
                placeholder="প্রফেসর ও বিভাগীয় প্রধান"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.refOrgBn}
              </label>
              <input
                type="text"
                value={ref.organizationBn}
                onChange={(e) => handleUpdate(ref.id, 'organizationBn', e.target.value)}
                placeholder="বুয়েট, ঢাকা"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.refPhone}
              </label>
              <input
                type="tel"
                value={ref.phone}
                onChange={(e) => handleUpdate(ref.id, 'phone', e.target.value)}
                placeholder="+880 1819-000000"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.fields.refEmail}
              </label>
              <input
                type="email"
                value={ref.email}
                onChange={(e) => handleUpdate(ref.id, 'email', e.target.value)}
                placeholder="referee@example.com"
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
        {t.actions.addReference}
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { Camera, Trash2, PenTool, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { translations } from '../../utils/translations';
import { SignatureCanvasModal } from './SignatureCanvasModal';

interface PersonalInfoFormProps {
  data: CVData;
  onChange: (updated: Partial<CVData['personal']>) => void;
  lang: Language;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  lang,
}) => {
  const [showBiodataExtra, setShowBiodataExtra] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const t = translations[lang];
  const p = data.personal;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ photoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ signatureUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo & Signature Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
        {/* Photo Box */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t.fields.photoUpload}
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0">
              {p.photoUrl ? (
                <img
                  src={p.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer shadow-xs transition-colors">
                <Upload className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'ছবি আপলোড' : 'Upload Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {p.photoUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ photoUrl: '' })}
                  className="inline-flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  {t.fields.photoRemove}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Signature Box */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t.fields.signature}
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-14 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 overflow-hidden px-1">
              {p.signatureUrl ? (
                <img
                  src={p.signatureUrl}
                  alt="Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">No signature</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setIsSignatureModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <PenTool className="w-3 h-3" />
                {t.fields.signatureDraw}
              </button>
              <label className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer">
                <Upload className="w-3 h-3" />
                {t.fields.signatureUpload}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
              </label>
              {p.signatureUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ signatureUrl: '' })}
                  className="text-[10px] text-red-500 hover:text-red-700 text-left"
                >
                  {t.fields.signatureClear}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Names (BN + EN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.nameBn} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={p.nameBn}
            onChange={(e) => onChange({ nameBn: e.target.value })}
            placeholder="যেমন: তানভীর আহমেদ চৌধুরী"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.nameEn} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={p.nameEn}
            onChange={(e) => onChange({ nameEn: e.target.value })}
            placeholder="e.g. Tanvir Ahmed Chowdhury"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Titles (BN + EN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.titleBn}
          </label>
          <input
            type="text"
            value={p.titleBn}
            onChange={(e) => onChange({ titleBn: e.target.value })}
            placeholder="যেমন: সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.titleEn}
          </label>
          <input
            type="text"
            value={p.titleEn}
            onChange={(e) => onChange({ titleEn: e.target.value })}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={p.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="tanvir@example.com"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.phone} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={p.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+880 1712-345678"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Address (BN + EN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.addressBn}
          </label>
          <input
            type="text"
            value={p.addressBn}
            onChange={(e) => onChange({ addressBn: e.target.value })}
            placeholder="ধানমন্ডি, ঢাকা-১২০৫"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.addressEn}
          </label>
          <input
            type="text"
            value={p.addressEn}
            onChange={(e) => onChange({ addressEn: e.target.value })}
            placeholder="Dhanmondi, Dhaka-1205"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Links (LinkedIn, GitHub, Website) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.linkedin}
          </label>
          <input
            type="text"
            value={p.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.github}
          </label>
          <input
            type="text"
            value={p.github}
            onChange={(e) => onChange({ github: e.target.value })}
            placeholder="github.com/username"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.fields.website}
          </label>
          <input
            type="text"
            value={p.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="yourportfolio.dev"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Collapsible BD Biodata / Govt extra info */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowBiodataExtra(!showBiodataExtra)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl transition-colors text-slate-700 dark:text-slate-200"
        >
          <span>
            🇧🇩 {lang === 'bn' ? 'বাংলাদেশী সরকারি / ব্যাংক / বায়োডাটা বিশেষ তথ্য' : 'Bangladeshi Govt / Bank / Biodata Extra Fields'}
          </span>
          {showBiodataExtra ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showBiodataExtra && (
          <div className="p-3.5 mt-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.fatherNameBn}
                </label>
                <input
                  type="text"
                  value={p.fatherNameBn || ''}
                  onChange={(e) => onChange({ fatherNameBn: e.target.value })}
                  placeholder="মো: রফিকুল ইসলাম"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.fatherNameEn}
                </label>
                <input
                  type="text"
                  value={p.fatherNameEn || ''}
                  onChange={(e) => onChange({ fatherNameEn: e.target.value })}
                  placeholder="Md. Rafiqul Islam"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.motherNameBn}
                </label>
                <input
                  type="text"
                  value={p.motherNameBn || ''}
                  onChange={(e) => onChange({ motherNameBn: e.target.value })}
                  placeholder="মোছা: নাসিমা বেগম"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.motherNameEn}
                </label>
                <input
                  type="text"
                  value={p.motherNameEn || ''}
                  onChange={(e) => onChange({ motherNameEn: e.target.value })}
                  placeholder="Mst. Nasima Begum"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.dob}
                </label>
                <input
                  type="date"
                  value={p.dateOfBirth || ''}
                  onChange={(e) => onChange({ dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.bloodGroup}
                </label>
                <select
                  value={p.bloodGroup || 'B+'}
                  onChange={(e) => onChange({ bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.religion}
                </label>
                <input
                  type="text"
                  value={p.religion || ''}
                  onChange={(e) => onChange({ religion: e.target.value })}
                  placeholder="ইসলাম / Islam"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.maritalStatus}
                </label>
                <input
                  type="text"
                  value={p.maritalStatus || ''}
                  onChange={(e) => onChange({ maritalStatus: e.target.value })}
                  placeholder="অবিবাহিত / Single"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.nationality}
                </label>
                <input
                  type="text"
                  value={p.nationality || 'Bangladeshi'}
                  onChange={(e) => onChange({ nationality: e.target.value })}
                  placeholder="বাংলাদেশী / Bangladeshi"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.fields.nid}
                </label>
                <input
                  type="text"
                  value={p.nid || ''}
                  onChange={(e) => onChange({ nid: e.target.value })}
                  placeholder="19952692518..."
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <SignatureCanvasModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSave={(dataUrl) => onChange({ signatureUrl: dataUrl })}
        lang={lang}
      />
    </div>
  );
};

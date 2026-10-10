import React from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Wrench, Award, FolderGit2 } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const IconBased: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-blue-200 mb-6">
          <div className="flex items-center gap-4">
            {c.photoUrl && (
              <img src={c.photoUrl} alt={c.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500 shadow-sm" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {c.name || 'Candidate Name'}
              </h1>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">
                {c.title || 'Professional Title'}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10.5px] text-slate-600">
                {c.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-500" /> {c.email}</span>}
                {c.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-blue-500" /> {c.phone}</span>}
                {c.address && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {c.address}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="p-1 rounded bg-blue-50 text-blue-600"><Briefcase className="w-3.5 h-3.5" /></span>
              <span>{isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience'}</span>
            </h2>
            <div className="space-y-3.5 pl-2">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-medium">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-blue-600 text-[10.5px] font-semibold">{exp.duration}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-1">
                    {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[10.5px]">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="p-1 rounded bg-blue-50 text-blue-600"><GraduationCap className="w-3.5 h-3.5" /></span>
              <span>{isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'}</span>
            </h2>
            <div className="space-y-2.5 pl-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                  </div>
                  <div className="text-right text-[10.5px]">
                    <span className="text-blue-700 font-semibold">{edu.year}</span>
                    <p className="text-slate-600">{edu.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.technicalSkills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="p-1 rounded bg-blue-50 text-blue-600"><Wrench className="w-3.5 h-3.5" /></span>
              <span>{isBn ? 'দক্ষতা' : 'Skills'}</span>
            </h2>
            <div className="flex flex-wrap gap-1.5 pl-2">
              {data.technicalSkills.map((sk, idx) => (
                <span key={idx} className="bg-slate-50 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-slate-400 block">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

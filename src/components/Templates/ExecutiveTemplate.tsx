import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Shield } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const ExecutiveTemplate: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-900 p-9 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed border-8 border-slate-900">
      <div>
        {/* Executive Gold & Navy Ribbon */}
        <div className="border-b-2 border-amber-600/70 pb-6 mb-6 flex justify-between items-end">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? 'এক্সিকিউটিভ রেজুমে' : 'Executive Leadership Profile'}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {c.title || 'Chief Executive / Director'}
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            {c.email && <div>{c.email}</div>}
            {c.phone && <div>{c.phone}</div>}
            {c.address && <div>{c.address}</div>}
          </div>
        </div>

        {/* Executive Summary */}
        {c.summary && (
          <div className="mb-6 bg-slate-50 border-l-4 border-amber-600 p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
              {isBn ? 'নির্বাহী সারসংক্ষেপ' : 'Executive Summary'}
            </h2>
            <p className="text-slate-700 text-justify text-[11.5px] leading-relaxed">
              {c.summary}
            </p>
          </div>
        )}

        {/* Leadership & Work Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-amber-600/40 pb-1 mb-3">
              {isBn ? 'নেতৃত্ব ও কাজের অভিজ্ঞতা' : 'Professional Leadership Experience'}
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-[12px]">
                    <span>{getLocalizedText(exp.positionBn, exp.positionEn, lang)}</span>
                    <span className="text-amber-800 text-[10.5px] font-semibold">{exp.duration}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1 font-medium">
                    {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[10.5px]">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Board Roles */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-amber-600/40 pb-1 mb-3">
              {isBn ? 'শিক্ষা ও ডিগ্রি' : 'Education & Credentials'}
            </h2>
            <div className="space-y-2.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                  </div>
                  <div className="text-right text-[10.5px]">
                    <span className="text-amber-900 font-semibold">{edu.year}</span>
                    <p className="text-slate-600 font-medium">{edu.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competencies */}
        {data.technicalSkills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-amber-600/40 pb-1 mb-2">
              {isBn ? 'মূল নেতৃত্ব দক্ষতা' : 'Core Competencies'}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.technicalSkills.map((sk, idx) => (
                <span key={idx} className="bg-amber-50 text-amber-950 border border-amber-200/60 px-2.5 py-0.5 rounded text-[10px] font-semibold">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-8 max-w-[120px] object-contain mx-auto" />
            <span className="text-[9.5px] text-slate-500 block uppercase tracking-wider mt-0.5">{isBn ? 'স্বাক্ষর' : 'Executive Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

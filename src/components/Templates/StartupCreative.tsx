import React from 'react';
import { Rocket, Zap, Mail, Phone, MapPin } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const StartupCreative: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed">
      <div>
        {/* Startup Dynamic Top Bar */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 rounded-2xl mb-6 shadow-md flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1.5 text-violet-200 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Rocket className="w-3.5 h-3.5" />
              <span>{isBn ? 'ইনোভেশন ও গ্রোথ প্রফেশনাল' : 'Builder & Problem Solver'}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs text-violet-100 font-medium mt-0.5">
              {c.title || 'Product & Tech Lead'}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2.5 text-[10.5px] text-violet-100">
              {c.email && <span>{c.email}</span>}
              {c.phone && <span>· {c.phone}</span>}
              {c.address && <span>· {c.address}</span>}
            </div>
          </div>
          {c.photoUrl && (
            <img src={c.photoUrl} alt={c.name} className="w-20 h-20 rounded-xl object-cover border-2 border-white/80 shadow-md shrink-0" />
          )}
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-5 bg-violet-50/50 border border-violet-100 p-3.5 rounded-xl">
            <p className="text-slate-700 text-justify text-[11px] leading-relaxed">
              {c.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-violet-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-violet-600" />
              <span>{isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience & Track Record'}</span>
            </h2>
            <div className="space-y-3.5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-[11.5px]">
                    <span>{getLocalizedText(exp.positionBn, exp.positionEn, lang)}</span>
                    <span className="text-violet-600 text-[10.5px]">{exp.duration}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-1 font-medium">
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

        {/* Projects & Education */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-violet-950 uppercase tracking-wider mb-2">
                {isBn ? 'প্রজেক্ট' : 'Shipped Projects'}
              </h2>
              <div className="space-y-2">
                {data.projects.map((p) => (
                  <div key={p.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="font-bold text-slate-900 text-[11px] block">
                      {getLocalizedText(p.titleBn, p.titleEn, lang)}
                    </span>
                    <p className="text-slate-600 text-[10px] mt-0.5">
                      {getLocalizedText(p.descriptionBn, p.descriptionEn, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-violet-950 uppercase tracking-wider mb-2">
                {isBn ? 'শিক্ষা' : 'Education'}
              </h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="font-bold text-slate-900 text-[11px] block">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-slate-500 text-[10px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                    <div className="flex justify-between text-[10px] text-violet-700 font-semibold mt-0.5">
                      <span>{edu.year}</span>
                      <span>{edu.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

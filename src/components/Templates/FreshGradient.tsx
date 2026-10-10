import React from 'react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const FreshGradient: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed">
      <div>
        {/* Vibrant Gradient Header */}
        <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 text-white p-6 rounded-2xl shadow-md mb-6 flex justify-between items-center gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-200">Curriculum Vitae</span>
            <h1 className="text-2xl font-black tracking-tight mt-0.5">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs text-sky-100 font-medium mt-1">
              {c.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[10.5px] text-sky-100">
              {c.email && <span>{c.email}</span>}
              {c.phone && <span>· {c.phone}</span>}
              {c.address && <span>· {c.address}</span>}
            </div>
          </div>
          {c.photoUrl && (
            <img src={c.photoUrl} alt={c.name} className="w-20 h-20 rounded-xl object-cover border-2 border-white/60 shadow-md shrink-0" />
          )}
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-5 bg-sky-50/60 border border-sky-100 p-3.5 rounded-xl">
            <p className="text-slate-700 text-[11px] leading-relaxed text-justify">
              {c.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-gradient-to-b from-sky-500 to-indigo-600 rounded-full" />
              {isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience'}
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex justify-between items-baseline font-medium">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-sky-700 font-semibold text-[10.5px]">{exp.duration}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1">
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

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-gradient-to-b from-sky-500 to-indigo-600 rounded-full" />
                {isBn ? 'শিক্ষা' : 'Education'}
              </h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="font-bold text-slate-900 text-[11px] block">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-slate-600 text-[10px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                    <div className="flex justify-between text-[10px] text-sky-700 font-medium mt-0.5">
                      <span>{edu.year}</span>
                      <span>{edu.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.technicalSkills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-gradient-to-b from-sky-500 to-indigo-600 rounded-full" />
                {isBn ? 'দক্ষতা' : 'Skills'}
              </h2>
              <div className="flex flex-wrap gap-1 p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                {data.technicalSkills.map((sk, idx) => (
                  <span key={idx} className="bg-white border border-sky-100 text-sky-900 px-2 py-0.5 rounded text-[10px] font-medium shadow-2xs">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-slate-500 block">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

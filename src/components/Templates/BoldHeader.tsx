import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const BoldHeader: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed">
      <div>
        {/* Massive Bold Header Banner */}
        <div className="bg-slate-900 text-white px-8 py-7 flex justify-between items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-sm font-semibold text-amber-400 mt-1">
              {c.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-slate-300">
              {c.email && <span>{c.email}</span>}
              {c.phone && <span>· {c.phone}</span>}
              {c.address && <span>· {c.address}</span>}
            </div>
          </div>
          {c.photoUrl && (
            <img src={c.photoUrl} alt={c.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 shadow-md shrink-0" />
          )}
        </div>

        {/* Content Body */}
        <div className="p-8">
          {/* Summary */}
          {c.summary && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
                {isBn ? 'ক্যারিয়ার সামারি' : 'Career Summary'}
              </h2>
              <p className="text-slate-700 text-justify text-[11.5px] leading-relaxed">
                {c.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                {isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience'}
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-950 text-[12px]">
                      <span>{getLocalizedText(exp.positionBn, exp.positionEn, lang)}</span>
                      <span className="text-slate-600 font-medium text-[10.5px]">{exp.duration}</span>
                    </div>
                    <div className="text-slate-600 text-[11px] font-medium mb-1">
                      {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                    </div>
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

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                {isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'}
              </h2>
              <div className="space-y-2.5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-950 text-[11.5px]">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </span>
                      <p className="text-slate-600 text-[11px]">
                        {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      </p>
                    </div>
                    <div className="text-right text-[10.5px]">
                      <span className="font-bold text-slate-900">{edu.year}</span>
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
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2">
                {isBn ? 'দক্ষতা' : 'Skills'}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.technicalSkills.map((sk, idx) => (
                  <span key={idx} className="bg-slate-900 text-white px-2.5 py-0.5 rounded text-[10px] font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {c.signatureUrl && (
        <div className="px-8 pb-6 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-slate-500 uppercase tracking-widest block">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const ModernMinimal: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-zinc-900 p-9 min-h-[1122px] flex flex-col justify-between text-xs leading-relaxed font-sans">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-tight text-zinc-950 uppercase">
            {c.name || 'Candidate Name'}
          </h1>
          <p className="text-xs tracking-widest text-zinc-500 uppercase font-medium mt-1">
            {c.title || 'Professional Title'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-zinc-600 font-light border-y border-zinc-200 py-2">
            {c.email && <span>{c.email}</span>}
            {c.phone && <><span className="text-zinc-300">/</span><span>{c.phone}</span></>}
            {c.address && <><span className="text-zinc-300">/</span><span>{c.address}</span></>}
            {c.linkedin && <><span className="text-zinc-300">/</span><span>{c.linkedin}</span></>}
            {c.github && <><span className="text-zinc-300">/</span><span>{c.github}</span></>}
          </div>
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-6">
            <h2 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-2">
              {isBn ? 'সংক্ষিপ্ত বিবরণ' : 'Profile'}
            </h2>
            <p className="text-zinc-700 font-light text-[11.5px] leading-relaxed text-justify">
              {c.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-3">
              {isBn ? 'অভিজ্ঞতা' : 'Experience'}
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-zinc-900 text-[12px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-zinc-500 text-[11px] font-light">{exp.duration}</span>
                  </div>
                  <div className="text-zinc-600 text-[11px] font-medium mb-1">
                    {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                  </div>
                  <ul className="space-y-1 text-zinc-600 text-[11px] font-light">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-zinc-400">·</span>
                        <span>{r}</span>
                      </li>
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
            <h2 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-3">
              {isBn ? 'শিক্ষা' : 'Education'}
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-zinc-900 text-[12px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-zinc-600 text-[11px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                    {edu.details && <p className="text-zinc-400 text-[10.5px]">{edu.details}</p>}
                  </div>
                  <div className="text-right text-[11px]">
                    <span className="text-zinc-500 font-light">{edu.year}</span>
                    <p className="font-medium text-zinc-800">{edu.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {data.technicalSkills.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                {isBn ? 'দক্ষতা' : 'Skills'}
              </h2>
              <p className="text-zinc-700 text-[11px] leading-relaxed">
                {data.technicalSkills.join(' · ')}
              </p>
            </div>
          )}

          {data.languages.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                {isBn ? 'ভাষা' : 'Languages'}
              </h2>
              <div className="space-y-0.5 text-zinc-700 text-[11px]">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{isBn ? l.nameBn : l.nameEn}</span>
                    <span className="text-zinc-400">{isBn ? l.proficiencyBn : l.proficiencyEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Signature */}
      {c.signatureUrl && (
        <div className="flex justify-end pt-4 border-t border-zinc-100">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mt-1">
              {isBn ? 'স্বাক্ষর' : 'Signature'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

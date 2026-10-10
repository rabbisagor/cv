import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const CompactOnePage: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-900 p-6 min-h-[1122px] flex flex-col justify-between text-[11px] leading-tight font-sans">
      <div>
        {/* Compact Header */}
        <div className="border-b border-slate-900 pb-2 mb-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              {c.name || 'Candidate Name'}
            </h1>
            <span className="text-[11px] font-semibold text-slate-600">
              {c.title || 'Professional Title'}
            </span>
          </div>
          <div className="text-right text-[10px] text-slate-600">
            <div>{c.email} | {c.phone}</div>
            <div>{c.address}</div>
          </div>
        </div>

        {/* Dense 2-Column Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column (8 cols): Experience & Projects */}
          <div className="col-span-8 space-y-3">
            {c.summary && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  {isBn ? 'সারসংক্ষেপ' : 'Summary'}
                </h3>
                <p className="text-slate-700 text-[10.5px] leading-normal">{c.summary}</p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
                  {isBn ? 'অভিজ্ঞতা' : 'Experience'}
                </h3>
                <div className="space-y-2">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[11px]">
                          {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                        </span>
                        <span className="text-slate-500 text-[9.5px]">{exp.duration}</span>
                      </div>
                      <div className="text-slate-600 text-[10px] font-medium">
                        {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                      </div>
                      <ul className="list-disc list-inside text-slate-700 text-[10px] space-y-0.5 mt-0.5">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.projects.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
                  {isBn ? 'প্রজেক্ট' : 'Projects'}
                </h3>
                <div className="space-y-1.5">
                  {data.projects.map((p) => (
                    <div key={p.id}>
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>{getLocalizedText(p.titleBn, p.titleEn, lang)}</span>
                        <span className="text-slate-500 font-normal text-[9.5px]">{p.technologies.join(', ')}</span>
                      </div>
                      <p className="text-slate-600 text-[10px]">{getLocalizedText(p.descriptionBn, p.descriptionEn, lang)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Education, Skills, Details */}
          <div className="col-span-4 space-y-3 border-l border-slate-200 pl-3">
            {data.education.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  {isBn ? 'শিক্ষা' : 'Education'}
                </h3>
                <div className="space-y-1.5">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-bold text-slate-900 text-[10.5px] block">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </span>
                      <p className="text-slate-600 text-[9.5px]">
                        {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      </p>
                      <div className="text-[9.5px] text-slate-500">
                        {edu.year} | {edu.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.technicalSkills.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  {isBn ? 'স্কিলস' : 'Skills'}
                </h3>
                <div className="text-[10px] text-slate-700 leading-normal">
                  {data.technicalSkills.join(', ')}
                </div>
              </div>
            )}

            {data.languages.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
                  {isBn ? 'ভাষা' : 'Languages'}
                </h3>
                <div className="space-y-0.5 text-[9.5px]">
                  {data.languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span className="font-medium text-slate-800">{isBn ? l.nameBn : l.nameEn}</span>
                      <span className="text-slate-500">{isBn ? l.proficiencyBn : l.proficiencyEn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {c.signatureUrl && (
        <div className="pt-2 border-t border-slate-200 flex justify-end">
          <img src={c.signatureUrl} alt="Signature" className="h-6 max-w-[100px] object-contain" />
        </div>
      )}
    </div>
  );
};

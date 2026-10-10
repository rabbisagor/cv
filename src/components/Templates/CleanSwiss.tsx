import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const CleanSwiss: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-neutral-900 p-9 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed border-t-8 border-red-600">
      <div>
        {/* Asymmetrical Swiss Grid Header */}
        <div className="grid grid-cols-12 gap-6 pb-6 border-b border-neutral-300 mb-6">
          <div className="col-span-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 block mb-1">
              Curriculum Vitae
            </span>
            <h1 className="text-3xl font-black text-neutral-950 tracking-tight uppercase">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs font-medium text-neutral-600 mt-0.5">
              {c.title || 'Professional Title'}
            </p>
          </div>
          <div className="col-span-4 text-right text-[10.5px] text-neutral-600 font-mono space-y-0.5">
            <div>{c.email}</div>
            <div>{c.phone}</div>
            <div>{c.address}</div>
          </div>
        </div>

        {/* Swiss Body Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Section Indicator Column (3 cols) vs Content (9 cols) */}
          <div className="col-span-12 space-y-6">
            {c.summary && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {isBn ? 'প্রোফাইল' : 'Profile'}
                </div>
                <div className="col-span-9 text-neutral-700 text-[11.5px] leading-relaxed">
                  {c.summary}
                </div>
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {isBn ? 'অভিজ্ঞতা' : 'Experience'}
                </div>
                <div className="col-span-9 space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline font-semibold text-neutral-900 text-[12px]">
                        <span>{getLocalizedText(exp.positionBn, exp.positionEn, lang)}</span>
                        <span className="font-mono text-neutral-500 text-[10.5px]">{exp.duration}</span>
                      </div>
                      <div className="text-neutral-600 text-[11px] mb-1">
                        {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                      </div>
                      <ul className="space-y-0.5 text-neutral-700 text-[10.5px]">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-600 font-bold">—</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {isBn ? 'শিক্ষা' : 'Education'}
                </div>
                <div className="col-span-9 space-y-2.5">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold text-neutral-900 text-[11.5px]">
                          {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                        </span>
                        <p className="text-neutral-600 text-[11px]">
                          {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                        </p>
                      </div>
                      <div className="text-right text-[10.5px] font-mono">
                        <span className="text-neutral-800">{edu.year}</span>
                        <p className="text-neutral-500">{edu.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.technicalSkills.length > 0 && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {isBn ? 'দক্ষতা' : 'Skills'}
                </div>
                <div className="col-span-9 text-neutral-700 text-[11px] leading-relaxed">
                  {data.technicalSkills.join('  /  ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-neutral-200 flex justify-end">
          <div className="text-center font-mono">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-neutral-400 block mt-0.5">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

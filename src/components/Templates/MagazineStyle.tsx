import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const MagazineStyle: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-stone-900 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-serif leading-relaxed">
      <div>
        {/* Magazine Editorial Masthead */}
        <div className="border-b-4 border-stone-900 pb-5 mb-6">
          <div className="text-[10px] tracking-widest uppercase font-sans text-stone-500 mb-1">
            {isBn ? 'প্রফেশনাল পোর্টফোলিও ও ডসিয়ার' : 'Professional Dossier & Portfolio'}
          </div>
          <div className="flex justify-between items-end gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-stone-950 font-sans">
                {c.name || 'Candidate Name'}
              </h1>
              <p className="text-sm italic text-stone-600 mt-1">
                {c.title || 'Creative & Engineering Specialist'}
              </p>
            </div>
            <div className="text-right text-[10.5px] font-sans text-stone-600 space-y-0.5">
              <div>{c.email}</div>
              <div>{c.phone}</div>
              <div>{c.address}</div>
            </div>
          </div>
        </div>

        {/* Editorial Pull Quote / Summary */}
        {c.summary && (
          <div className="mb-6 border-l-3 border-stone-900 pl-4 py-1 italic text-stone-800 text-[12px] leading-relaxed">
            "{c.summary}"
          </div>
        )}

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Story (8 cols) */}
          <div className="col-span-8 space-y-5">
            {data.experience.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans border-b border-stone-300 pb-1 mb-3">
                  {isBn ? 'কর্ম অভিজ্ঞতা' : 'Career Chronology'}
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-stone-950 text-[12px] font-sans">
                          {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                        </span>
                        <span className="text-stone-500 text-[10.5px] font-sans">{exp.duration}</span>
                      </div>
                      <div className="text-stone-600 italic text-[11px] mb-1">
                        {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-[10.5px] font-sans">
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-sans border-b border-stone-300 pb-1 mb-2">
                  {isBn ? 'নির্বাচিত প্রজেক্ট' : 'Selected Works'}
                </h2>
                <div className="space-y-2">
                  {data.projects.map((p) => (
                    <div key={p.id}>
                      <span className="font-bold text-stone-900 text-[11px] font-sans">
                        {getLocalizedText(p.titleBn, p.titleEn, lang)}
                      </span>
                      <p className="text-stone-600 text-[10.5px] font-sans">
                        {getLocalizedText(p.descriptionBn, p.descriptionEn, lang)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Note (4 cols) */}
          <div className="col-span-4 space-y-5 font-sans border-l border-stone-200 pl-4">
            {c.photoUrl && (
              <img src={c.photoUrl} alt={c.name} className="w-full aspect-square object-cover rounded grayscale" />
            )}

            {data.education.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-2">
                  {isBn ? 'শিক্ষা' : 'Education'}
                </h3>
                <div className="space-y-2 text-[10.5px]">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-semibold text-stone-900 block">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </span>
                      <p className="text-stone-500">{getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}</p>
                      <div className="text-stone-400 text-[10px]">{edu.year} · {edu.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.technicalSkills.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-2">
                  {isBn ? 'দক্ষতা' : 'Skills'}
                </h3>
                <div className="text-[10.5px] text-stone-700 leading-normal">
                  {data.technicalSkills.join(' · ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-stone-300 flex justify-end">
          <div className="text-center font-sans">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-stone-400 block mt-0.5">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

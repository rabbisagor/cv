import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const ElegantSerif: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-[#fcfbf9] text-stone-900 p-9 min-h-[1122px] flex flex-col justify-between text-xs font-serif leading-relaxed border-t-4 border-amber-800">
      <div>
        {/* Header */}
        <div className="text-center pb-6 border-b border-stone-300 mb-6">
          <h1 className="text-3xl font-normal text-stone-900 tracking-wide">
            {c.name || 'Candidate Name'}
          </h1>
          <p className="text-xs italic text-amber-900 tracking-wider mt-1">
            {c.title || 'Professional Title'}
          </p>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-stone-600 font-sans">
            {c.email && <span>{c.email}</span>}
            {c.phone && <span>· {c.phone}</span>}
            {c.address && <span>· {c.address}</span>}
            {c.linkedin && <span>· {c.linkedin}</span>}
          </div>
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-6 max-w-2xl mx-auto text-center italic text-stone-700 text-[11.5px] leading-relaxed">
            "{c.summary}"
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-amber-900 border-b border-stone-200 pb-1 mb-4">
              {isBn ? 'কর্ম অভিজ্ঞতা' : 'Professional History'}
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 text-[12px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-amber-900 text-[10.5px] italic font-sans">{exp.duration}</span>
                  </div>
                  <div className="text-stone-600 text-[11px] italic mb-1">
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

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-amber-900 border-b border-stone-200 pb-1 mb-4">
              {isBn ? 'শিক্ষা ও ডিগ্রি' : 'Academic Credentials'}
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-stone-900 text-[11.5px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-stone-600 text-[11px] italic">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                  </div>
                  <div className="text-right text-[10.5px] font-sans">
                    <span className="text-amber-900 font-semibold">{edu.year}</span>
                    <p className="text-stone-700">{edu.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.technicalSkills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-amber-900 border-b border-stone-200 pb-1 mb-3">
              {isBn ? 'দক্ষতা' : 'Key Competencies'}
            </h2>
            <div className="text-center text-[11px] text-stone-700 font-sans">
              {data.technicalSkills.join('  ♦  ')}
            </div>
          </div>
        )}
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-stone-300 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-stone-500 block italic">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

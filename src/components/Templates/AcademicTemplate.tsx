import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const AcademicTemplate: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-900 p-8 min-h-[1122px] flex flex-col justify-between text-xs leading-relaxed font-sans">
      <div>
        {/* Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-950">
            {c.name || 'Candidate Name'}
          </h1>
          <p className="text-xs font-semibold text-slate-700 mt-1">
            {c.title || 'Researcher / Academician'}
          </p>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-0.5 mt-2 text-[11px] text-slate-600">
            {c.address && <span>{c.address}</span>}
            {c.email && <span>· {c.email}</span>}
            {c.phone && <span>· {c.phone}</span>}
            {c.website && <span>· {c.website}</span>}
          </div>
        </div>

        {/* Education (First for Academic) */}
        {data.education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
              {isBn ? 'উচ্চশিক্ষা ও ডিগ্রি' : 'Higher Education & Degrees'}
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-medium">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <span className="text-slate-600 font-semibold text-[10.5px]">{edu.year}</span>
                  </div>
                  <p className="text-slate-700 text-[11px]">
                    {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    {edu.boardUniversity && ` (${edu.boardUniversity})`}
                    {edu.result && ` — Result: ${edu.result}`}
                  </p>
                  {edu.details && (
                    <p className="text-slate-500 text-[10.5px] italic pl-2 border-l border-slate-200 mt-0.5">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research / Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
              {isBn ? 'একাডেমিক ও গবেষণা অভিজ্ঞতা' : 'Academic & Research Experience'}
            </h2>
            <div className="space-y-3.5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-slate-600 font-semibold text-[10.5px]">{exp.duration}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] mb-1">
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

        {/* Publications / Projects */}
        {data.projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              {isBn ? 'গবেষণা প্রজেক্ট ও প্রকাশনা' : 'Research Projects & Publications'}
            </h2>
            <div className="space-y-2">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <span className="font-semibold text-slate-900 text-[11px]">
                    {getLocalizedText(p.titleBn, p.titleEn, lang)}
                  </span>
                  <p className="text-slate-600 text-[10.5px]">
                    {getLocalizedText(p.descriptionBn, p.descriptionEn, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Awards */}
        {(data.certifications.length > 0 || data.awards.length > 0) && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              {isBn ? 'সম্মাননা ও সার্টিফিকেশন' : 'Honors & Certifications'}
            </h2>
            <div className="space-y-1.5 text-[11px]">
              {data.awards.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span className="font-semibold text-slate-800">
                    {getLocalizedText(a.titleBn, a.titleEn, lang)} — {getLocalizedText(a.organizationBn, a.organizationEn, lang)}
                  </span>
                  <span className="text-slate-600">{a.year}</span>
                </div>
              ))}
              {data.certifications.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span>{getLocalizedText(c.titleBn, c.titleEn, lang)} ({getLocalizedText(c.issuerBn, c.issuerEn, lang)})</span>
                  <span className="text-slate-600">{c.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic References */}
        {data.references.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              {isBn ? 'রেফারেন্স' : 'Academic References'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-[10.5px]">
                  <span className="font-bold text-slate-900 block">
                    {getLocalizedText(ref.nameBn, ref.nameEn, lang)}
                  </span>
                  <span className="text-slate-700 block">
                    {getLocalizedText(ref.designationBn, ref.designationEn, lang)}, {getLocalizedText(ref.organizationBn, ref.organizationEn, lang)}
                  </span>
                  <span className="text-slate-500 block">Phone: {ref.phone} | Email: {ref.email}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-slate-600 block">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

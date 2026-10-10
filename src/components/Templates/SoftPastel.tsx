import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const SoftPastel: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-[#fffbfc] text-stone-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-sans leading-relaxed border-t-8 border-rose-300">
      <div>
        {/* Header */}
        <div className="pb-5 border-b border-rose-100 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-rose-950">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs font-semibold text-rose-700 mt-0.5">
              {c.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[11px] text-stone-500">
              {c.email && <span>{c.email}</span>}
              {c.phone && <span>· {c.phone}</span>}
              {c.address && <span>· {c.address}</span>}
            </div>
          </div>
          {c.photoUrl && (
            <img src={c.photoUrl} alt={c.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-rose-200 shadow-2xs" />
          )}
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-5 bg-rose-50/50 p-3.5 rounded-xl border border-rose-100/80">
            <p className="text-stone-700 text-justify text-[11px] leading-relaxed">
              {c.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-3">
              {isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience'}
            </h2>
            <div className="space-y-3.5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-medium">
                    <span className="font-bold text-stone-900 text-[11.5px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-rose-700 text-[10.5px] font-semibold">{exp.duration}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] mb-1">
                    {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[10.5px]">
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
          <div className="mb-5">
            <h2 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-3">
              {isBn ? 'শিক্ষা' : 'Education'}
            </h2>
            <div className="space-y-2.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-stone-900 text-[11.5px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-stone-500 text-[11px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </p>
                  </div>
                  <div className="text-right text-[10.5px]">
                    <span className="text-rose-800 font-semibold">{edu.year}</span>
                    <p className="text-stone-600">{edu.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.technicalSkills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">
              {isBn ? 'দক্ষতা' : 'Skills'}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.technicalSkills.map((sk, idx) => (
                <span key={idx} className="bg-rose-50 text-rose-900 border border-rose-100 px-2 py-0.5 rounded text-[10px]">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-rose-100 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-stone-400 block">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const TwoColumnProfessional: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-sans">
      <div>
        {/* Header */}
        <div className="border-b-2 border-slate-700 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              {c.title || 'Professional Title'}
            </p>
          </div>
          <div className="text-right text-[10.5px] text-slate-600 space-y-0.5">
            {c.email && <div>{c.email}</div>}
            {c.phone && <div>{c.phone}</div>}
            {c.address && <div>{c.address}</div>}
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column (4 cols) */}
          <div className="col-span-4 space-y-5 border-r border-slate-200 pr-5">
            {c.photoUrl && (
              <div className="w-24 h-28 mx-auto rounded overflow-hidden border border-slate-300 shadow-2xs">
                <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Skills */}
            {data.technicalSkills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  {isBn ? 'দক্ষতা' : 'Skills'}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {data.technicalSkills.map((sk, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  {isBn ? 'শিক্ষা' : 'Education'}
                </h3>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <span className="font-semibold text-slate-900 text-[11px] block">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </span>
                      <p className="text-slate-600 text-[10px]">
                        {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      </p>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>{edu.year}</span>
                        <span className="font-medium text-slate-700">{edu.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  {isBn ? 'ভাষা' : 'Languages'}
                </h3>
                <div className="space-y-1 text-[10.5px]">
                  {data.languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span className="text-slate-800 font-medium">{isBn ? l.nameBn : l.nameEn}</span>
                      <span className="text-slate-500">{isBn ? l.proficiencyBn : l.proficiencyEn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (8 cols) */}
          <div className="col-span-8 space-y-5">
            {c.summary && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  {isBn ? 'সংক্ষিপ্ত প্রোফাইল' : 'Profile'}
                </h2>
                <p className="text-slate-600 text-justify text-[11px] leading-relaxed">
                  {c.summary}
                </p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
                  {isBn ? 'অভিজ্ঞতা' : 'Experience'}
                </h2>
                <div className="space-y-3.5">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[11.5px]">
                          {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                        </span>
                        <span className="text-slate-500 text-[10.5px] font-medium">{exp.duration}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium mb-1">
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

            {data.projects.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  {isBn ? 'প্রজেক্ট' : 'Projects'}
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
          </div>
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

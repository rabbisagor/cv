import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const ModernSplit: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white min-h-[1122px] flex text-xs font-sans">
      {/* Left Contrast Column (Dark Zinc) */}
      <div className="w-[38%] bg-zinc-900 text-zinc-100 p-7 flex flex-col justify-between shrink-0">
        <div>
          {/* Photo */}
          {c.photoUrl ? (
            <div className="w-28 h-28 mx-auto rounded-xl overflow-hidden border-2 border-zinc-700 shadow-md mb-6">
              <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 text-xl font-bold mb-5">
              CV
            </div>
          )}

          {/* Name & Title in sidebar */}
          <div className="text-center pb-5 border-b border-zinc-800 mb-6">
            <h1 className="text-xl font-bold tracking-tight text-white">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              {c.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2.5 text-[10.5px] text-zinc-300 mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1 mb-2">
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </h3>
            {c.email && <div className="break-all">{c.email}</div>}
            {c.phone && <div>{c.phone}</div>}
            {c.address && <div>{c.address}</div>}
            {c.linkedin && <div className="break-all">{c.linkedin}</div>}
          </div>

          {/* Skills */}
          {data.technicalSkills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1 mb-2">
                {isBn ? 'দক্ষতা' : 'Skills'}
              </h3>
              <div className="flex flex-wrap gap-1">
                {data.technicalSkills.map((sk, idx) => (
                  <span key={idx} className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded text-[10px]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1 mb-2">
                {isBn ? 'ভাষা' : 'Languages'}
              </h3>
              <div className="space-y-1 text-[10.5px]">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{isBn ? l.nameBn : l.nameEn}</span>
                    <span className="text-zinc-500">{isBn ? l.proficiencyBn : l.proficiencyEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {c.signatureUrl && (
          <div className="pt-4 border-t border-zinc-800 text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto invert" />
            <span className="text-[9.5px] text-zinc-500 block mt-0.5">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        )}
      </div>

      {/* Right Column (Light Zinc) */}
      <div className="w-[62%] p-8 flex flex-col justify-between">
        <div>
          {/* Summary */}
          {c.summary && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                {isBn ? 'প্রোফাইল সামারি' : 'Profile Summary'}
              </h2>
              <p className="text-zinc-600 text-justify text-[11px] leading-relaxed">
                {c.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-3">
                {isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience'}
              </h2>
              <div className="space-y-3.5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-bold text-zinc-900 text-[11.5px]">
                      <span>{getLocalizedText(exp.positionBn, exp.positionEn, lang)}</span>
                      <span className="text-zinc-500 text-[10px] font-normal">{exp.duration}</span>
                    </div>
                    <p className="text-zinc-500 text-[10.5px] mb-1 font-medium">
                      {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-zinc-600 text-[10.5px]">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-3">
                {isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'}
              </h2>
              <div className="space-y-2.5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-zinc-900 text-[11px]">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </span>
                      <p className="text-zinc-500 text-[10.5px]">
                        {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      </p>
                    </div>
                    <div className="text-right text-[10px]">
                      <span className="font-semibold text-zinc-800">{edu.year}</span>
                      <p className="text-zinc-500">{edu.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                {isBn ? 'প্রজেক্ট' : 'Projects'}
              </h2>
              <div className="space-y-2">
                {data.projects.map((p) => (
                  <div key={p.id}>
                    <span className="font-semibold text-zinc-900 text-[11px]">
                      {getLocalizedText(p.titleBn, p.titleEn, lang)}
                    </span>
                    <p className="text-zinc-500 text-[10.5px]">
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
  );
};

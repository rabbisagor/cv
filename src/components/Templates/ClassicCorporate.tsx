import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const ClassicCorporate: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs leading-relaxed font-sans">
      <div>
        {/* Top Header */}
        <div className="border-b-2 border-blue-900 pb-5 mb-5 flex items-center justify-between gap-5">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-blue-950 tracking-tight">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-sm font-semibold text-blue-800 mt-1">
              {c.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-slate-600 text-[11px]">
              {c.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-800" /> {c.email}
                </span>
              )}
              {c.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-800" /> {c.phone}
                </span>
              )}
              {c.address && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-800" /> {c.address}
                </span>
              )}
              {c.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-blue-800" /> {c.linkedin}
                </span>
              )}
              {c.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-blue-800" /> {c.github}
                </span>
              )}
            </div>
          </div>
          {c.photoUrl && (
            <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-blue-900 shrink-0 shadow-sm">
              <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
              {isBn ? 'পেশাগত সারসংক্ষেপ' : 'Professional Summary'}
            </h2>
            <p className="text-slate-700 text-justify text-[11px] leading-normal">{c.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2.5">
              {isBn ? 'কর্ম অভিজ্ঞতা' : 'Work Experience'}
            </h2>
            <div className="space-y-3.5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-medium">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-blue-900 text-[10.5px] font-semibold">{exp.duration}</span>
                  </div>
                  <div className="text-slate-600 italic text-[11px] mb-1">
                    {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                    {exp.location && ` · ${exp.location}`}
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[10.5px]">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="pl-1">{r}</li>
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
            <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2.5">
              {isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'}
            </h2>
            <div className="space-y-2.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      {edu.boardUniversity && ` · ${edu.boardUniversity}`}
                    </p>
                    {edu.details && <p className="text-slate-500 text-[10px] italic">{edu.details}</p>}
                  </div>
                  <div className="text-right text-[10.5px]">
                    <span className="font-semibold text-blue-900">{edu.year}</span>
                    <p className="text-slate-700 font-medium">{edu.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {data.technicalSkills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                {isBn ? 'কারিগরি দক্ষতা' : 'Technical Skills'}
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.technicalSkills.map((sk, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                {isBn ? 'ভাষাগত দক্ষতা' : 'Languages'}
              </h2>
              <div className="space-y-1 text-[11px]">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium text-slate-800">{isBn ? l.nameBn : l.nameEn}</span>
                    <span className="text-slate-600">{isBn ? l.proficiencyBn : l.proficiencyEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-blue-950 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
              {isBn ? 'উল্লেখযোগ্য প্রজেক্ট' : 'Key Projects'}
            </h2>
            <div className="space-y-2">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between font-semibold text-slate-900 text-[11px]">
                    <span>{getLocalizedText(p.titleBn, p.titleEn, lang)}</span>
                    <span className="text-blue-900 text-[10px] font-normal">{p.technologies.join(', ')}</span>
                  </div>
                  <p className="text-slate-600 text-[10.5px]">{getLocalizedText(p.descriptionBn, p.descriptionEn, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Signature and Date Footer */}
      {(c.signatureUrl || c.nid) && (
        <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
          <div className="text-[10px] text-slate-500">
            {c.nid && <span>NID: {c.nid}</span>}
          </div>
          {c.signatureUrl && (
            <div className="text-center">
              <img src={c.signatureUrl} alt="Signature" className="h-8 max-w-[120px] object-contain mx-auto" />
              <div className="border-t border-slate-400 mt-1 pt-0.5 text-[9.5px] text-slate-600 font-medium">
                {isBn ? 'প্রার্থীর স্বাক্ষর' : 'Signature'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

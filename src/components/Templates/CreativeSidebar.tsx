import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const CreativeSidebar: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white min-h-[1122px] flex text-xs font-sans">
      {/* Left Sidebar (Teal background) */}
      <div className="w-[34%] bg-teal-900 text-teal-50 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Photo */}
          {c.photoUrl ? (
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-3 border-teal-300/40 shadow-lg mb-5">
              <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto rounded-full bg-teal-800 flex items-center justify-center text-teal-200 text-2xl font-bold mb-4">
              {c.name ? c.name[0] : 'U'}
            </div>
          )}

          {/* Contact Details */}
          <div className="mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-teal-300 border-b border-teal-800 pb-1 mb-3">
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </h3>
            <div className="space-y-2 text-[10.5px] text-teal-100/90 break-words">
              {c.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{c.email}</span>
                </div>
              )}
              {c.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{c.phone}</span>
                </div>
              )}
              {c.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{c.address}</span>
                </div>
              )}
              {c.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{c.linkedin}</span>
                </div>
              )}
              {c.github && (
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{c.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          {data.technicalSkills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-teal-300 border-b border-teal-800 pb-1 mb-2.5">
                {isBn ? 'দক্ষতাসমূহ' : 'Skills'}
              </h3>
              <div className="flex flex-wrap gap-1">
                {data.technicalSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="bg-teal-800/80 text-teal-100 px-2 py-0.5 rounded text-[10px] font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-teal-300 border-b border-teal-800 pb-1 mb-2.5">
                {isBn ? 'ভাষাগত দক্ষতা' : 'Languages'}
              </h3>
              <div className="space-y-1.5 text-[10.5px]">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium">{isBn ? l.nameBn : l.nameEn}</span>
                    <span className="text-teal-300/80 text-[10px]">{isBn ? l.proficiencyBn : l.proficiencyEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Signature */}
        {c.signatureUrl && (
          <div className="pt-4 border-t border-teal-800/60 text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-8 max-w-[120px] object-contain mx-auto brightness-200" />
            <p className="text-[10px] text-teal-400 mt-1">{isBn ? 'স্বাক্ষর' : 'Signature'}</p>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-[66%] p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="border-b border-teal-100 pb-4 mb-5">
            <h1 className="text-2xl font-bold text-teal-950 tracking-tight">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-sm font-semibold text-teal-700 mt-1">
              {c.title || 'Professional Title'}
            </p>
          </div>

          {/* Summary */}
          {c.summary && (
            <div className="mb-5">
              <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider pb-1 mb-2">
                {isBn ? 'সারসংক্ষেপ' : 'About Me'}
              </h2>
              <p className="text-slate-600 text-justify text-[11px] leading-relaxed">
                {c.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider pb-1 mb-3">
                {isBn ? 'কর্ম অভিজ্ঞতা' : 'Experience'}
              </h2>
              <div className="space-y-3.5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-medium">
                      <span className="font-bold text-slate-900 text-[11.5px]">
                        {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                      </span>
                      <span className="text-teal-700 text-[10.5px] font-semibold">{exp.duration}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mb-1 font-medium">
                      {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                      {exp.location && ` · ${exp.location}`}
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

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider pb-1 mb-3">
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
                      </p>
                    </div>
                    <div className="text-right text-[10.5px]">
                      <span className="text-teal-800 font-semibold">{edu.year}</span>
                      <p className="text-slate-700 font-medium">{edu.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-teal-900 uppercase tracking-wider pb-1 mb-2">
                {isBn ? 'প্রজেক্ট' : 'Projects'}
              </h2>
              <div className="space-y-2">
                {data.projects.map((p) => (
                  <div key={p.id}>
                    <span className="font-semibold text-slate-800 text-[11px]">
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
  );
};

import React from 'react';
import { Terminal, Code2, Cpu, Globe, Mail, Phone, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const TechFocused: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-[#0f172a] text-slate-200 p-8 min-h-[1122px] flex flex-col justify-between text-xs font-mono leading-relaxed">
      <div>
        {/* Terminal Header */}
        <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-5 mb-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-400 ml-2 font-mono">resume.ts — engineer-profile</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
                {c.name || 'Candidate Name'}
              </h1>
              <p className="text-xs text-indigo-400 font-semibold mt-1">
                &gt; {c.title || 'Full Stack Engineer'}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10.5px] text-slate-400">
                {c.email && <span>email: "{c.email}"</span>}
                {c.phone && <span>phone: "{c.phone}"</span>}
                {c.github && <span>github: "{c.github}"</span>}
              </div>
            </div>
            {c.photoUrl && (
              <img src={c.photoUrl} alt={c.name} className="w-20 h-20 rounded-lg object-cover border border-indigo-500/40" />
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        {data.technicalSkills.length > 0 && (
          <div className="mb-5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[11px] font-semibold text-emerald-400 mb-2 flex items-center gap-1.5 font-sans">
              <Code2 className="w-4 h-4" />
              <span>{isBn ? 'টেক স্ট্যাক ও টুলস' : 'Tech Stack & Skills'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.technicalSkills.map((sk, idx) => (
                <span key={idx} className="bg-slate-800 text-indigo-300 border border-indigo-900/60 px-2 py-0.5 rounded text-[10px]">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-5">
            <div className="text-[11px] font-bold text-indigo-400 mb-3 uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Terminal className="w-4 h-4" />
              <span>{isBn ? 'কাজের অভিজ্ঞতা' : 'Experience'}</span>
            </div>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-baseline font-sans">
                    <span className="font-bold text-white text-[12px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-emerald-400 text-[10.5px] font-mono">{exp.duration}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mb-2 font-mono">
                    @ {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[10.5px] font-sans">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400">#</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Projects */}
        {data.projects.length > 0 && (
          <div className="mb-4">
            <div className="text-[11px] font-bold text-indigo-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Cpu className="w-4 h-4" />
              <span>{isBn ? 'প্রজেক্ট আর্কিটেকচার' : 'Projects'}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.projects.map((p) => (
                <div key={p.id} className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-white text-[11px] block font-sans">
                    {getLocalizedText(p.titleBn, p.titleEn, lang)}
                  </span>
                  <p className="text-slate-400 text-[10px] mt-1 font-sans">
                    {getLocalizedText(p.descriptionBn, p.descriptionEn, lang)}
                  </p>
                  <div className="text-[9.5px] text-indigo-300 mt-2 font-mono">
                    [{p.technologies.join(', ')}]
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Signature */}
      {c.signatureUrl && (
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto invert" />
            <span className="text-[9.5px] text-slate-500 block font-mono">signature.sign()</span>
          </div>
        </div>
      )}
    </div>
  );
};

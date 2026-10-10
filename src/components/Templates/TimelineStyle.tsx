import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const TimelineStyle: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-800 p-8 min-h-[1122px] flex flex-col justify-between text-xs leading-relaxed font-sans">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-indigo-100 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-indigo-950">
              {c.name || 'Candidate Name'}
            </h1>
            <p className="text-xs font-semibold text-indigo-600 mt-1 uppercase tracking-wide">
              {c.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-500">
              {c.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-indigo-500" /> {c.email}</span>}
              {c.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-indigo-500" /> {c.phone}</span>}
              {c.address && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> {c.address}</span>}
            </div>
          </div>
          {c.photoUrl && (
            <img src={c.photoUrl} alt={c.name} className="w-20 h-20 rounded-full object-cover border-2 border-indigo-200 shadow-xs" />
          )}
        </div>

        {/* Summary */}
        {c.summary && (
          <div className="mb-6 pl-4 border-l-2 border-indigo-200">
            <p className="text-slate-600 text-justify text-[11px] leading-relaxed">
              {c.summary}
            </p>
          </div>
        )}

        {/* Experience Timeline */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              {isBn ? 'ক্যারিয়ার টাইমলাইন' : 'Experience Timeline'}
            </h2>
            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-4 ring-indigo-50" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {getLocalizedText(exp.positionBn, exp.positionEn, lang)}
                    </span>
                    <span className="text-indigo-600 text-[10px] font-semibold">{exp.duration}</span>
                  </div>
                  <div className="text-slate-500 text-[10.5px] font-medium mb-1">
                    {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                  </div>
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

        {/* Education Timeline */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              {isBn ? 'শিক্ষা ও ডিগ্রি' : 'Education Timeline'}
            </h2>
            <div className="relative pl-6 space-y-3 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative">
                  <span className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-indigo-400 ring-4 ring-indigo-50" />
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900 text-[11px]">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </span>
                      <p className="text-slate-500 text-[10.5px]">
                        {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      </p>
                    </div>
                    <div className="text-right text-[10.5px]">
                      <span className="text-indigo-700 font-semibold">{edu.year}</span>
                      <p className="text-slate-700 font-medium">{edu.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.technicalSkills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              {isBn ? 'দক্ষতা' : 'Skills & Toolkit'}
            </h2>
            <div className="flex flex-wrap gap-1.5 pl-6">
              {data.technicalSkills.map((sk, idx) => (
                <span key={idx} className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded text-[10px] font-medium border border-indigo-100">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {c.signatureUrl && (
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <div className="text-center">
            <img src={c.signatureUrl} alt="Signature" className="h-7 max-w-[110px] object-contain mx-auto" />
            <span className="text-[9.5px] text-slate-400 block mt-0.5">{isBn ? 'স্বাক্ষর' : 'Signature'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

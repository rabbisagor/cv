import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const FormalTraditional: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-900 p-8 min-h-[1122px] flex flex-col justify-between text-xs leading-normal font-sans border-2 border-emerald-900">
      <div>
        {/* Header */}
        <div className="text-center border-b-2 border-emerald-900 pb-3 mb-5 relative">
          <div className="absolute right-0 top-0">
            {c.photoUrl ? (
              <img src={c.photoUrl} alt={c.name} className="w-20 h-24 object-cover border border-slate-400 p-0.5" />
            ) : (
              <div className="w-20 h-24 border border-dashed border-slate-300 flex items-center justify-center text-[9.5px] text-slate-400">
                ছবি
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-emerald-950 underline decoration-1 underline-offset-4">
            {isBn ? 'জীবনবৃত্তান্ত' : 'CURRICULUM VITAE'}
          </h1>
          <p className="text-sm font-bold text-slate-900 mt-2">
            {c.name || 'Candidate Name'}
          </p>
          <p className="text-xs text-slate-700 mt-0.5">
            {c.address}
          </p>
          <p className="text-xs text-slate-700 mt-0.5">
            মোবাইল: {c.phone} | ই-মেইল: {c.email}
          </p>
        </div>

        {/* Career Objective */}
        {c.summary && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-emerald-950 uppercase bg-emerald-50 px-2 py-0.5 border-l-4 border-emerald-900 mb-1">
              {isBn ? 'ক্যারিয়ার উদ্দেশ্য' : 'Career Objective'}
            </h2>
            <p className="text-slate-800 text-[11px] leading-relaxed text-justify px-1">
              {c.summary}
            </p>
          </div>
        )}

        {/* Educational Qualifications Table */}
        {data.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-emerald-950 uppercase bg-emerald-50 px-2 py-0.5 border-l-4 border-emerald-900 mb-1.5">
              {isBn ? 'শিক্ষাগত যোগ্যতা' : 'Educational Qualifications'}
            </h2>
            <table className="w-full border-collapse border border-emerald-900 text-[10.5px]">
              <thead>
                <tr className="bg-emerald-100/70 font-bold text-emerald-950 text-center">
                  <th className="border border-emerald-900 p-1">{isBn ? 'পরীক্ষার নাম' : 'Examination'}</th>
                  <th className="border border-emerald-900 p-1">{isBn ? 'শিক্ষা প্রতিষ্ঠান' : 'Institute'}</th>
                  <th className="border border-emerald-900 p-1">{isBn ? 'বোর্ড / বিশ্ববিদ্যালয়' : 'Board'}</th>
                  <th className="border border-emerald-900 p-1">{isBn ? 'পাসের বছর' : 'Year'}</th>
                  <th className="border border-emerald-900 p-1">{isBn ? 'ফলাফল' : 'Result'}</th>
                </tr>
              </thead>
              <tbody>
                {data.education.map((edu) => (
                  <tr key={edu.id} className="text-center">
                    <td className="border border-emerald-900 p-1 font-semibold text-left pl-2">
                      {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                    </td>
                    <td className="border border-emerald-900 p-1 text-left pl-2">
                      {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                    </td>
                    <td className="border border-emerald-900 p-1">{edu.boardUniversity || '-'}</td>
                    <td className="border border-emerald-900 p-1">{edu.year}</td>
                    <td className="border border-emerald-900 p-1 font-semibold">{edu.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-emerald-950 uppercase bg-emerald-50 px-2 py-0.5 border-l-4 border-emerald-900 mb-1.5">
              {isBn ? 'কাজের অভিজ্ঞতা' : 'Experience'}
            </h2>
            <div className="space-y-2 px-1">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="text-[11px]">
                  <div className="font-bold text-slate-900">
                    {idx + 1}. {getLocalizedText(exp.positionBn, exp.positionEn, lang)} — {getLocalizedText(exp.companyBn, exp.companyEn, lang)} ({exp.duration})
                  </div>
                  <ul className="list-disc list-inside text-slate-700 text-[10px] pl-2 mt-0.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Details Table */}
        <div className="mb-4">
          <h2 className="text-xs font-bold text-emerald-950 uppercase bg-emerald-50 px-2 py-0.5 border-l-4 border-emerald-900 mb-1.5">
            {isBn ? 'ব্যক্তিগত পরিচিতি' : 'Personal Particulars'}
          </h2>
          <table className="w-full text-[10.5px]">
            <tbody>
              <tr>
                <td className="w-1/3 py-0.5 font-semibold">{isBn ? 'পিতার নাম' : "Father's Name"}</td>
                <td className="py-0.5">: {c.fatherName || 'মো: রফিকুল ইসলাম'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'মাতার নাম' : "Mother's Name"}</td>
                <td className="py-0.5">: {c.motherName || 'মোছা: নাসিমা বেগম'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'জন্ম তারিখ' : 'Date of Birth'}</td>
                <td className="py-0.5">: {c.dob || '15/10/1995'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'জাতীয়তা' : 'Nationality'}</td>
                <td className="py-0.5">: {c.nationality || 'বাংলাদেশী (জন্মসূত্রে)'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'ধর্ম' : 'Religion'}</td>
                <td className="py-0.5">: {c.religion || 'ইসলাম'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'বৈবাহিক অবস্থা' : 'Marital Status'}</td>
                <td className="py-0.5">: {c.maritalStatus || 'অবিবাহিত'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'জাতীয় পরিচয়পত্র (NID)' : 'NID No.'}</td>
                <td className="py-0.5">: {c.nid || '19952692518000123'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold">{isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address'}</td>
                <td className="py-0.5">: {c.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature and Date */}
      <div className="flex justify-between items-end pt-3 border-t border-emerald-900">
        <div className="text-[10px] text-slate-700">
          <p>{isBn ? 'তারিখ:' : 'Date:'}</p>
          <p className="mt-1">{isBn ? 'স্থান: ঢাকা' : 'Place: Dhaka'}</p>
        </div>
        <div className="text-center">
          {c.signatureUrl && (
            <img src={c.signatureUrl} alt="Signature" className="h-8 max-w-[120px] object-contain mx-auto" />
          )}
          <div className="border-t border-emerald-900 pt-0.5 text-[10px] font-bold text-emerald-950">
            {isBn ? '(প্রার্থীর স্বাক্ষর)' : '(Signature)'}
          </div>
        </div>
      </div>
    </div>
  );
};

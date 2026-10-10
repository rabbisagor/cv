import React from 'react';
import { CVData, Language } from '../../types/cv';
import { getCandidateBasic, getLocalizedText } from './templateHelpers';

export const GovernmentBankStyle: React.FC<{ data: CVData; lang: Language }> = ({ data, lang }) => {
  const c = getCandidateBasic(data, lang);
  const isBn = lang === 'bn';

  return (
    <div className="bg-white text-slate-900 p-8 min-h-[1122px] flex flex-col justify-between text-xs leading-normal font-sans border border-slate-300">
      <div>
        {/* Top Title & Photo Bar */}
        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
          <div className="flex-1 text-center pr-4">
            <h1 className="text-xl font-bold uppercase tracking-wide text-slate-950 underline decoration-1 underline-offset-4">
              {isBn ? 'জীবনবৃত্তান্ত (Curriculum Vitae)' : 'CURRICULUM VITAE'}
            </h1>
            <p className="text-sm font-bold text-slate-900 mt-1">
              {c.name || 'Candidate Name'}
            </p>
            <p className="text-xs text-slate-700 mt-0.5">
              {c.address}
            </p>
            <p className="text-xs text-slate-700 mt-0.5">
              {c.phone && <span>Mobile: {c.phone}</span>}
              {c.email && <span className="ml-3">E-mail: {c.email}</span>}
            </p>
          </div>

          {c.photoUrl ? (
            <div className="w-24 h-28 border-2 border-slate-800 p-0.5 shrink-0">
              <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-28 border border-dashed border-slate-400 flex items-center justify-center text-[10px] text-slate-400 shrink-0 text-center p-2">
              Passport Size Photo
            </div>
          )}
        </div>

        {/* 1. Career Objective */}
        {c.summary && (
          <div className="mb-3.5">
            <h2 className="text-xs font-bold text-slate-900 uppercase bg-slate-100 px-2 py-0.5 border-l-4 border-slate-800 mb-1.5">
              {isBn ? '১. উদ্দেশ্য (Career Objective)' : '1. Career Objective'}
            </h2>
            <p className="text-slate-800 text-[11px] leading-relaxed text-justify px-1">
              {c.summary}
            </p>
          </div>
        )}

        {/* 2. Educational Qualification (Structured Table) */}
        {data.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase bg-slate-100 px-2 py-0.5 border-l-4 border-slate-800 mb-1.5">
              {isBn ? '২. শিক্ষাগত যোগ্যতা (Educational Qualifications)' : '2. Educational Qualifications'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-400 text-[10.5px]">
                <thead>
                  <tr className="bg-slate-200/80 font-bold text-slate-900 text-center">
                    <th className="border border-slate-400 p-1.5">
                      {isBn ? 'ডিগ্রি / পরীক্ষার নাম' : 'Name of Exam'}
                    </th>
                    <th className="border border-slate-400 p-1.5">
                      {isBn ? 'শিক্ষা প্রতিষ্ঠান' : 'Institute'}
                    </th>
                    <th className="border border-slate-400 p-1.5">
                      {isBn ? 'বোর্ড / বিশ্ববিদ্যালয়' : 'Board / Univ.'}
                    </th>
                    <th className="border border-slate-400 p-1.5">
                      {isBn ? 'পাসের সন' : 'Passing Year'}
                    </th>
                    <th className="border border-slate-400 p-1.5">
                      {isBn ? 'ফলাফল / বিভাগ' : 'GPA / Division'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.education.map((edu) => (
                    <tr key={edu.id} className="text-center">
                      <td className="border border-slate-400 p-1 font-semibold text-left pl-2">
                        {getLocalizedText(edu.degreeBn, edu.degreeEn, lang)}
                      </td>
                      <td className="border border-slate-400 p-1 text-left pl-2">
                        {getLocalizedText(edu.institutionBn, edu.institutionEn, lang)}
                      </td>
                      <td className="border border-slate-400 p-1">
                        {edu.boardUniversity || '-'}
                      </td>
                      <td className="border border-slate-400 p-1">
                        {edu.year}
                      </td>
                      <td className="border border-slate-400 p-1 font-semibold">
                        {edu.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Employment Record */}
        {data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase bg-slate-100 px-2 py-0.5 border-l-4 border-slate-800 mb-1.5">
              {isBn ? '৩. চাকরির অভিজ্ঞতা (Employment Record)' : '3. Professional Experience'}
            </h2>
            <div className="space-y-2 px-1">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="text-[11px]">
                  <div className="font-bold text-slate-900">
                    ({idx + 1}) {getLocalizedText(exp.positionBn, exp.positionEn, lang)} — {getLocalizedText(exp.companyBn, exp.companyEn, lang)}
                  </div>
                  <div className="text-slate-600 text-[10px]">
                    সময়কাল: {exp.duration} {exp.location && `| স্থান: ${exp.location}`}
                  </div>
                  <ul className="list-disc list-inside text-slate-700 text-[10px] mt-0.5 pl-2">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Personal Information (Government & Bank Format) */}
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase bg-slate-100 px-2 py-0.5 border-l-4 border-slate-800 mb-1.5">
            {isBn ? '৪. ব্যক্তিগত জীবনবৃত্তান্ত (Personal Details)' : '4. Personal Particulars'}
          </h2>
          <table className="w-full text-[10.5px] border-collapse">
            <tbody>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800 w-1/3">{isBn ? 'পিতার নাম' : "Father's Name"}</td>
                <td className="py-0.5 text-slate-900">: {c.fatherName || 'মো: রফিকুল ইসলাম'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'মাতার নাম' : "Mother's Name"}</td>
                <td className="py-0.5 text-slate-900">: {c.motherName || 'মোছা: নাসিমা বেগম'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'জন্ম তারিখ' : 'Date of Birth'}</td>
                <td className="py-0.5 text-slate-900">: {c.dob || '15/10/1995'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'লিঙ্গ' : 'Gender'}</td>
                <td className="py-0.5 text-slate-900">: {c.gender || 'পুরুষ / Male'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'বৈবাহিক অবস্থা' : 'Marital Status'}</td>
                <td className="py-0.5 text-slate-900">: {c.maritalStatus || 'অবিবাহিত / Single'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'ধর্ম' : 'Religion'}</td>
                <td className="py-0.5 text-slate-900">: {c.religion || 'ইসলাম / Islam'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'জাতীয়তা' : 'Nationality'}</td>
                <td className="py-0.5 text-slate-900">: {c.nationality || 'বাংলাদেশী / Bangladeshi (by birth)'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'জাতীয় পরিচয়পত্র (NID)' : 'National ID No.'}</td>
                <td className="py-0.5 text-slate-900">: {c.nid || '19952692518000123'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'রক্তের গ্রুপ' : 'Blood Group'}</td>
                <td className="py-0.5 text-slate-900">: {c.bloodGroup || 'B (+ve)'}</td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-800">{isBn ? 'বর্তমান ও স্থায়ী ঠিকানা' : 'Permanent Address'}</td>
                <td className="py-0.5 text-slate-900">: {c.address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 5. Declaration */}
        <div className="mb-4 text-[10.5px] italic text-slate-700 bg-slate-50 p-2 border border-slate-200">
          <p className="font-semibold not-italic mb-0.5 text-slate-900">
            {isBn ? 'ঘোষণা (Declaration):' : 'Declaration:'}
          </p>
          {isBn
            ? 'আমি এই মর্মে ঘোষণা করিতেছি যে, উপরে বর্ণিত যাবতীয় তথ্য সঠিক ও সত্য।'
            : 'I hereby declare that the information stated above is true and correct to the best of my knowledge.'}
        </div>
      </div>

      {/* Date & Signature Section */}
      <div className="flex justify-between items-end pt-3 border-t border-slate-300">
        <div className="text-[10px] text-slate-700">
          <p>{isBn ? 'তারিখ: .............................' : 'Date: .............................'}</p>
          <p className="mt-1">{isBn ? 'স্থান: ঢাকা, বাংলাদেশ' : 'Place: Dhaka, Bangladesh'}</p>
        </div>

        <div className="text-center">
          {c.signatureUrl ? (
            <img src={c.signatureUrl} alt="Signature" className="h-8 max-w-[120px] object-contain mx-auto" />
          ) : (
            <div className="h-8 w-28" />
          )}
          <div className="border-t border-slate-800 pt-0.5 text-[10px] font-bold text-slate-900">
            {isBn ? '(প্রার্থীর স্বাক্ষর)' : '(Signature of Applicant)'}
          </div>
        </div>
      </div>
    </div>
  );
};

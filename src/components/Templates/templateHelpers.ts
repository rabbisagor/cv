import { CVData, Language } from '../../types/cv';

export function getLocalizedText(
  bnText: string | undefined,
  enText: string | undefined,
  lang: Language
): string {
  if (lang === 'bn') {
    return bnText || enText || '';
  }
  return enText || bnText || '';
}

export function getCandidateBasic(data: CVData, lang: Language) {
  const p = data.personal;
  return {
    name: getLocalizedText(p.nameBn, p.nameEn, lang),
    title: getLocalizedText(p.titleBn, p.titleEn, lang),
    address: getLocalizedText(p.addressBn, p.addressEn, lang),
    email: p.email,
    phone: p.phone,
    linkedin: p.linkedin,
    github: p.github,
    website: p.website,
    photoUrl: p.photoUrl,
    signatureUrl: p.signatureUrl,
    fatherName: getLocalizedText(p.fatherNameBn, p.fatherNameEn, lang),
    motherName: getLocalizedText(p.motherNameBn, p.motherNameEn, lang),
    dob: p.dateOfBirth,
    gender: p.gender,
    maritalStatus: p.maritalStatus,
    religion: p.religion,
    nationality: p.nationality,
    bloodGroup: p.bloodGroup,
    nid: p.nid,
    summary: getLocalizedText(data.summaryBn, data.summaryEn, lang),
  };
}

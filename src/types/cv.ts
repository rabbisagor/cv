export type Language = 'bn' | 'en';

export interface PersonalInfo {
  nameBn: string;
  nameEn: string;
  titleBn: string;
  titleEn: string;
  email: string;
  phone: string;
  addressBn: string;
  addressEn: string;
  linkedin: string;
  github: string;
  website: string;
  photoUrl: string;
  signatureUrl: string;
  
  // Bangladeshi Government / Bank / Biodata specific fields
  fatherNameBn?: string;
  fatherNameEn?: string;
  motherNameBn?: string;
  motherNameEn?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  religion?: string;
  nationality?: string;
  bloodGroup?: string;
  nid?: string;
}

export interface EducationItem {
  id: string;
  degreeBn: string;
  degreeEn: string;
  institutionBn: string;
  institutionEn: string;
  boardUniversity?: string;
  year: string;
  result: string;
  details?: string;
}

export interface ExperienceItem {
  id: string;
  positionBn: string;
  positionEn: string;
  companyBn: string;
  companyEn: string;
  duration: string;
  location?: string;
  responsibilities: string[];
}

export interface LanguageItem {
  id: string;
  nameBn: string;
  nameEn: string;
  proficiencyBn: string;
  proficiencyEn: string;
}

export interface ProjectItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface CertificationItem {
  id: string;
  titleBn: string;
  titleEn: string;
  issuerBn: string;
  issuerEn: string;
  year: string;
  credentialUrl?: string;
}

export interface AwardItem {
  id: string;
  titleBn: string;
  titleEn: string;
  organizationBn: string;
  organizationEn: string;
  year: string;
  summaryBn?: string;
  summaryEn?: string;
}

export interface ReferenceItem {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  organizationBn: string;
  organizationEn: string;
  phone: string;
  email: string;
  relationBn?: string;
  relationEn?: string;
}

export interface CVData {
  personal: PersonalInfo;
  summaryBn: string;
  summaryEn: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  technicalSkills: string[];
  softSkills: string[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  references: ReferenceItem[];
}

export type TemplateCategory = 'all' | 'corporate' | 'minimal' | 'creative' | 'govt_bank' | 'tech' | 'compact';

export interface CVTemplateConfig {
  id: string;
  nameBn: string;
  nameEn: string;
  category: TemplateCategory;
  descriptionBn: string;
  descriptionEn: string;
  accentColor: string;
  secondaryColor: string;
  tagBn: string;
  tagEn: string;
}

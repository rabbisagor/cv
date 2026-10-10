import React from 'react';
import { CVData, Language } from '../../types/cv';
import { ClassicCorporate } from './ClassicCorporate';
import { ModernMinimal } from './ModernMinimal';
import { CreativeSidebar } from './CreativeSidebar';
import { TimelineStyle } from './TimelineStyle';
import { TwoColumnProfessional } from './TwoColumnProfessional';
import { ElegantSerif } from './ElegantSerif';
import { TechFocused } from './TechFocused';
import { AcademicTemplate } from './AcademicTemplate';
import { GovernmentBankStyle } from './GovernmentBankStyle';
import { FreshGradient } from './FreshGradient';
import { CompactOnePage } from './CompactOnePage';
import { BoldHeader } from './BoldHeader';
import { SoftPastel } from './SoftPastel';
import { IconBased } from './IconBased';
import { MagazineStyle } from './MagazineStyle';
import { CleanSwiss } from './CleanSwiss';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { StartupCreative } from './StartupCreative';
import { FormalTraditional } from './FormalTraditional';
import { ModernSplit } from './ModernSplit';

interface TemplateRendererProps {
  templateId: string;
  data: CVData;
  lang: Language;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateId,
  data,
  lang,
}) => {
  switch (templateId) {
    case 'classic-corporate':
      return <ClassicCorporate data={data} lang={lang} />;
    case 'modern-minimal':
      return <ModernMinimal data={data} lang={lang} />;
    case 'creative-sidebar':
      return <CreativeSidebar data={data} lang={lang} />;
    case 'timeline-style':
      return <TimelineStyle data={data} lang={lang} />;
    case 'two-column-pro':
      return <TwoColumnProfessional data={data} lang={lang} />;
    case 'elegant-serif':
      return <ElegantSerif data={data} lang={lang} />;
    case 'tech-focused':
      return <TechFocused data={data} lang={lang} />;
    case 'academic':
      return <AcademicTemplate data={data} lang={lang} />;
    case 'govt-bank-style':
      return <GovernmentBankStyle data={data} lang={lang} />;
    case 'fresh-gradient':
      return <FreshGradient data={data} lang={lang} />;
    case 'compact-one-page':
      return <CompactOnePage data={data} lang={lang} />;
    case 'bold-header':
      return <BoldHeader data={data} lang={lang} />;
    case 'soft-pastel':
      return <SoftPastel data={data} lang={lang} />;
    case 'icon-based':
      return <IconBased data={data} lang={lang} />;
    case 'magazine-style':
      return <MagazineStyle data={data} lang={lang} />;
    case 'clean-swiss':
      return <CleanSwiss data={data} lang={lang} />;
    case 'executive':
      return <ExecutiveTemplate data={data} lang={lang} />;
    case 'startup-creative':
      return <StartupCreative data={data} lang={lang} />;
    case 'formal-traditional':
      return <FormalTraditional data={data} lang={lang} />;
    case 'modern-split':
      return <ModernSplit data={data} lang={lang} />;
    default:
      return <ClassicCorporate data={data} lang={lang} />;
  }
};

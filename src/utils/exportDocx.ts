import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx';
import { CVData, Language } from '../types/cv';

export async function exportToDocx(data: CVData, lang: Language, filename: string): Promise<void> {
  const isBn = lang === 'bn';
  const name = isBn ? (data.personal.nameBn || data.personal.nameEn) : (data.personal.nameEn || data.personal.nameBn);
  const title = isBn ? (data.personal.titleBn || data.personal.titleEn) : (data.personal.titleEn || data.personal.titleBn);
  const address = isBn ? (data.personal.addressBn || data.personal.addressEn) : (data.personal.addressEn || data.personal.addressBn);
  const summary = isBn ? (data.summaryBn || data.summaryEn) : (data.summaryEn || data.summaryBn);

  const sections: (Paragraph | Table)[] = [];

  // Header - Name
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: name || 'Curriculum Vitae',
          bold: true,
          size: 36, // 18pt
          color: '1E3A8A',
        }),
      ],
    })
  );

  // Job Title
  if (title) {
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: title,
            size: 24,
            italics: true,
            color: '475569',
          }),
        ],
      })
    );
  }

  // Contact info line
  const contactParts: string[] = [];
  if (data.personal.email) contactParts.push(data.personal.email);
  if (data.personal.phone) contactParts.push(data.personal.phone);
  if (address) contactParts.push(address);
  if (data.personal.linkedin) contactParts.push(data.personal.linkedin);
  if (data.personal.github) contactParts.push(data.personal.github);

  if (contactParts.length > 0) {
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 280 },
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: 18,
            color: '64748B',
          }),
        ],
      })
    );
  }

  const createSectionHeader = (titleText: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: '1E3A8A',
          space: 4,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      children: [
        new TextRun({
          text: titleText,
          bold: true,
          size: 24,
          color: '1E3A8A',
        }),
      ],
    });
  };

  // Career Summary
  if (summary) {
    sections.push(createSectionHeader(isBn ? 'ক্যারিয়ার উদ্দেশ্য ও সারসংক্ষেপ' : 'Professional Summary'));
    sections.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: summary,
            size: 20,
          }),
        ],
      })
    );
  }

  // Experience
  if (data.experience.length > 0) {
    sections.push(createSectionHeader(isBn ? 'কাজের অভিজ্ঞতা' : 'Work Experience'));
    data.experience.forEach((exp) => {
      const pos = isBn ? (exp.positionBn || exp.positionEn) : (exp.positionEn || exp.positionBn);
      const comp = isBn ? (exp.companyBn || exp.companyEn) : (exp.companyEn || exp.companyBn);

      sections.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: `${pos} - ${comp}`,
              bold: true,
              size: 22,
              color: '0F172A',
            }),
            new TextRun({
              text: ` (${exp.duration})`,
              italics: true,
              size: 18,
              color: '64748B',
            }),
          ],
        })
      );

      exp.responsibilities.forEach((bullet) => {
        if (bullet.trim()) {
          sections.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: bullet.trim(),
                  size: 20,
                }),
              ],
            })
          );
        }
      });
    });
  }

  // Education
  if (data.education.length > 0) {
    sections.push(createSectionHeader(isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'));
    data.education.forEach((edu) => {
      const deg = isBn ? (edu.degreeBn || edu.degreeEn) : (edu.degreeEn || edu.degreeBn);
      const inst = isBn ? (edu.institutionBn || edu.institutionEn) : (edu.institutionEn || edu.institutionBn);

      sections.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: `${deg} - ${inst}`,
              bold: true,
              size: 22,
              color: '0F172A',
            }),
            new TextRun({
              text: ` | ${edu.year} | ${edu.result}`,
              size: 18,
              color: '475569',
            }),
          ],
        })
      );

      if (edu.details) {
        sections.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: edu.details,
                italics: true,
                size: 18,
                color: '64748B',
              }),
            ],
          })
        );
      }
    });
  }

  // Skills
  if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
    sections.push(createSectionHeader(isBn ? 'দক্ষতা ও পারদর্শিতা' : 'Skills'));
    if (data.technicalSkills.length > 0) {
      sections.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: (isBn ? 'কারিগরি দক্ষতা: ' : 'Technical Skills: '),
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: data.technicalSkills.join(', '),
              size: 20,
            }),
          ],
        })
      );
    }
    if (data.softSkills.length > 0) {
      sections.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: (isBn ? 'সফট স্কিলস: ' : 'Soft Skills: '),
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: data.softSkills.join(', '),
              size: 20,
            }),
          ],
        })
      );
    }
  }

  // Languages
  if (data.languages.length > 0) {
    sections.push(createSectionHeader(isBn ? 'ভাষাগত দক্ষতা' : 'Languages'));
    const langStr = data.languages
      .map((l) => `${isBn ? l.nameBn : l.nameEn} (${isBn ? l.proficiencyBn : l.proficiencyEn})`)
      .join(' | ');
    sections.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: langStr, size: 20 })],
      })
    );
  }

  // Projects
  if (data.projects.length > 0) {
    sections.push(createSectionHeader(isBn ? 'প্রজেক্ট ও পোর্টফোলিও' : 'Key Projects'));
    data.projects.forEach((proj) => {
      const titleP = isBn ? (proj.titleBn || proj.titleEn) : (proj.titleEn || proj.titleBn);
      const desc = isBn ? (proj.descriptionBn || proj.descriptionEn) : (proj.descriptionEn || proj.descriptionBn);

      sections.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: titleP,
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: proj.technologies.length > 0 ? ` [${proj.technologies.join(', ')}]` : '',
              size: 18,
              color: '4338CA',
            }),
          ],
        })
      );
      if (desc) {
        sections.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: desc, size: 20 })],
          })
        );
      }
    });
  }

  // Personal Biodata (Govt / BD specifics)
  if (data.personal.fatherNameBn || data.personal.dateOfBirth || data.personal.nid) {
    sections.push(createSectionHeader(isBn ? 'ব্যক্তিগত জীবনবৃত্তান্ত' : 'Personal Details'));
    const rows = [
      ...(data.personal.fatherNameBn ? [{ label: isBn ? 'পিতার নাম' : "Father's Name", value: isBn ? data.personal.fatherNameBn : data.personal.fatherNameEn }] : []),
      ...(data.personal.motherNameBn ? [{ label: isBn ? 'মাতার নাম' : "Mother's Name", value: isBn ? data.personal.motherNameBn : data.personal.motherNameEn }] : []),
      ...(data.personal.dateOfBirth ? [{ label: isBn ? 'জন্ম তারিখ' : 'Date of Birth', value: data.personal.dateOfBirth }] : []),
      ...(data.personal.bloodGroup ? [{ label: isBn ? 'রক্তের গ্রুপ' : 'Blood Group', value: data.personal.bloodGroup }] : []),
      ...(data.personal.religion ? [{ label: isBn ? 'ধর্ম' : 'Religion', value: data.personal.religion }] : []),
      ...(data.personal.nationality ? [{ label: isBn ? 'জাতীয়তা' : 'Nationality', value: data.personal.nationality }] : []),
      ...(data.personal.nid ? [{ label: isBn ? 'জাতীয় পরিচয়পত্র' : 'NID No', value: data.personal.nid }] : []),
    ];

    rows.forEach((r) => {
      sections.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${r.label}: `, bold: true, size: 19 }),
            new TextRun({ text: r.value || '', size: 19 }),
          ],
        })
      );
    });
  }

  // References
  if (data.references.length > 0) {
    sections.push(createSectionHeader(isBn ? 'রেফারেন্স' : 'References'));
    data.references.forEach((ref) => {
      const rName = isBn ? (ref.nameBn || ref.nameEn) : (ref.nameEn || ref.nameBn);
      const rDesig = isBn ? (ref.designationBn || ref.designationEn) : (ref.designationEn || ref.designationBn);
      const rOrg = isBn ? (ref.organizationBn || ref.organizationEn) : (ref.organizationEn || ref.organizationBn);

      sections.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: rName, bold: true, size: 20 }),
            new TextRun({ text: ` | ${rDesig}, ${rOrg}`, size: 18, color: '475569' }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `Phone: ${ref.phone}  |  Email: ${ref.email}`, size: 18, color: '64748B' }),
          ],
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.docx`;
  link.click();
}

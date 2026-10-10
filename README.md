# বাংলা সিভি বিল্ডার (Bangla CV & Resume Maker) 🇧🇩

একটি আধুনিক, রেসপন্সিভ এবং সম্পূর্ণ ক্লায়েন্ট-সাইড সিঙ্গেল-পেজ ওয়েব অ্যাপ্লিকেশন, যেখানে ব্যবহারকারীরা একবার তথ্য ইনপুট দিয়েই **২০টি প্রিমিয়াম ও আধুনিক সিভি টেমপ্লেট** থেকে যেকোনোটি বেছে নিয়ে হাই-কোয়ালিটি **PDF**, **Word (DOCX)**, **PNG**, **JPG** অথবা সরাসরি **প্রিন্ট** করতে পারবেন।

---

## 🌟 প্রধান বৈশিষ্ট্যসমূহ (Features)

1. **২০টি আধুনিক ও প্রফেশনাল টেমপ্লেট:**
   - ক্লাসিক কর্পোরেট (Classic Corporate)
   - মডার্ন মিনিমাল (Modern Minimal)
   - ক্রিয়েটিভ সাইডবার (Creative Sidebar)
   - টাইমলাইন স্টাইল (Timeline Style)
   - টু-কলাম প্রফেশনাল (Two-Column Pro)
   - এলিগেন্ট সেরিফ (Elegant Serif)
   - টেক ফোকাসড (Tech Focused)
   - একাডেমিক ও রিসার্চ (Academic)
   - সরকারি ও ব্যাংক স্টাইল (Government & Bank Style - BCS/Bank ছকযুক্ত টেবিল ও বায়োডাটা)
   - ফ্রেশ গ্রেডিয়েন্ট (Fresh Gradient)
   - কম্প্যাক্ট ওয়ান-পেজ (Compact One-Page)
   - বোল্ড হেডার (Bold Header)
   - সফট প্যাস্টেল (Soft Pastel)
   - আইকন-বেসড (Icon-Based)
   - ম্যাগাজিন স্টাইল (Magazine Style)
   - ক্লিন সুইস (Clean Swiss)
   - এক্সিকিউটিভ প্রিমিয়াম (Executive)
   - স্টার্টআপ অ্যান্ড ক্রিয়েটিভ (Startup)
   - ঐতিহ্যবাহী বায়োডাটা (Traditional Biodata)
   - মডার্ন স্প্লিট (Modern Split)

2. **সম্পূর্ণ বাইলিঙ্গুয়াল (বাংলা + ইংরেজি):**
   - ডিফল্ট ভাষা বাংলা, হেডারে এক ক্লিকে বাংলা ↔ ইংরেজি টগল।
   - বাংলা ফন্ট হিসেবে **SolaimanLipi** ও **Hind Siliguri** ইন্টিগ্রেটেড।
   - ইংরেজির জন্য **Plus Jakarta Sans / Inter**।

3. **ইনপুট ও ডিজিটাল স্বাক্ষর:**
   - ব্যক্তিগত তথ্য, ছবি আপলোড ও ক্রপ প্রিভিউ।
   - **ডিজিটাল স্বাক্ষর ড্রয়িং ক্যানভাস:** মাউস বা টাচ স্ক্রিন দিয়ে সরাসরি ক্যানভাসে স্বাক্ষর আঁকার ও সংরক্ষণ করার সুবিধা অথবা ইমেজ ফাইল আপলোড।
   - ক্যারিয়ার অবজেক্টিভ, শিক্ষা, অভিজ্ঞতা, টেক ও সফট স্কিলস, ভাষা, প্রজেক্ট, সার্টিফিকেশন, অ্যাওয়ার্ড ও রেফারেন্স।
   - বাংলাদেশী সরকারি চাকরির জন্য পিতা-মাতা, রক্তের গ্রুপ, ধর্ম, বৈবাহিক অবস্থা ও NID ফিল্ড।

4. **হাই-কোয়ালিটি এক্সপোর্ট অপশন:**
   - **PDF:** `jsPDF` + `html2canvas` দিয়ে ক্রিস্প হাই-রেজোলিউশন A4 সাইজ (210mm × 297mm)।
   - **Word (DOCX):** `docx` লাইব্রেরি দিয়ে জেনুইন এডিটেবল মাইক্রোসফট ওয়ার্ড ফাইল ডাউনলোড।
   - **PNG / JPG:** ক্রিস্প 2.5x স্কেলে ইমেজ ডাউনলোড।
   - **সরাসরি ব্রাউজার প্রিন্ট:** কাস্টম `@media print` CSS দিয়ে এক ক্লিকে পারফেক্ট A4 প্রিন্ট।

5. **ডেটা পারসিস্টেন্স:**
   - ব্রাউজারের `localStorage`-এ স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে, রিলোড দিলেও তথ্য হারায় না।
   - "নমুনা তথ্য লোড করুন (Load Sample Data)" ও "সব মুছুন (Reset)" অপশন।

---

## 🚀 লোকাল মেশিনে রান করার নিয়ম (How to Run Locally)

### ১. ডিপেন্ডেন্সি ইন্সটল করুন:
```bash
npm install
```

### ২. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে `http://localhost:3000` অথবা কনসোলে দেখানো লিংকে প্রবেশ করুন।

### ৩. প্রোডাকশন বিল্ড তৈরি করুন:
```bash
npm run build
```

---

## 🌐 GitHub Pages-এ ডিপ্লয়মেন্ট গাইডলাইন (GitHub Pages Deployment)

### পদ্ধতি ১: GitHub Actions (স্বয়ংক্রিয় ডিপ্লয় - সেরা উপায়)

১. আপনার `vite.config.ts` ফাইলে রিপোজিটরি নাম অনুযায়ী `base` সেট করুন:
```typescript
// vite.config.ts
export default defineConfig({
  base: './', // অথবা '/your-repo-name/'
  // ... বাকি কনফিগ
});
```

২. প্রোজেক্টের রুট ডিরেক্টরিতে `.github/workflows/deploy.yml` ফাইল তৈরি করুন:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

৩. GitHub রিপোজিটরির **Settings > Pages**-এ গিয়ে **Build and deployment > Source** থেকে **GitHub Actions** সিলেক্ট করুন। কোড পুশ করলেই স্বয়ংক্রিয়ভাবে লাইভ হয়ে যাবে!

---

## 🔤 SolaimanLipi ফন্ট ইন্টিগ্রেশন নির্দেশিকা

এই প্রজেক্টে **SolaimanLipi** ফন্ট সরাসরি CDN থেকে `index.html`-এ লোড করা হয়েছে:
```html
<!-- SolaimanLipi Font CDN -->
<link rel="stylesheet" href="https://fonts.maateen.me/solaiman-lipi/font.css" />
```

এবং `src/index.css`-এ গ্লোবাল ফন্ট হিসেবে যুক্ত করা হয়েছে:
```css
:root {
  --font-solaiman: 'SolaimanLipi', 'Hind Siliguri', sans-serif;
}

body {
  font-family: var(--font-solaiman);
}
```

অফলাইনে বা নিজস্ব হোস্টিংয়ে ব্যবহার করতে চাইলে:
১. `solaimanlipi.woff2` ফন্ট ফাইলটি `public/fonts/` ফোল্ডারে রাখুন।
২. `@font-face` দিয়ে `src/index.css`-এ ডিক্লেয়ার করুন।

---

## 📁 প্রজেক্ট ফাইল স্ট্রাকচার

```
src/
├── types/
│   └── cv.ts                     # CV ও টেমপ্লেট টাইপ ডেফিনেশন
├── data/
│   ├── defaultData.ts            # সমৃদ্ধ ডেমো ডেটা ও ফাঁকা ইনিশিয়াল স্টেট
│   └── templates.ts              # ২০টি টেমপ্লেটের মেটাডাটা ও ক্যাটাগরি
├── utils/
│   ├── translations.ts           # বাংলা ও ইংরেজি সম্পূর্ণ ডিকশনারি
│   ├── exportPdf.ts              # html2canvas + jsPDF এক্সপোর্ট
│   └── exportDocx.ts             # docx লাইব্রেরি দিয়ে Word জেনারেশন
├── components/
│   ├── Header.tsx                # টপ বার, ল্যাঙ্গুয়েজ ও ডার্ক মোড টগল
│   ├── TemplateGalleryModal.tsx  # ২০টি টেমপ্লেট ভিজ্যুয়াল নির্বাচক
│   ├── Form/
│   │   ├── FormContainer.tsx     # অ্যাকর্ডিয়ন ফর্ম কন্টেইনার
│   │   ├── PersonalInfoForm.tsx  # ছবি, স্বাক্ষর ও বায়োডাটা ইনপুট
│   │   ├── SignatureCanvasModal.tsx # মাউস/টাচ স্বাক্ষর ক্যানভাস
│   │   ├── SummaryForm.tsx       # ক্যারিয়ার সামারি
│   │   ├── EducationForm.tsx     # শিক্ষা তালিকা
│   │   ├── ExperienceForm.tsx    # অভিজ্ঞতা তালিকা
│   │   ├── SkillsForm.tsx        # টেক ও সফট স্কিল চিপস এবং ভাষা
│   │   ├── ProjectsForm.tsx      # প্রজেক্টস
│   │   └── ExtraSectionsForm.tsx # সার্টিফিকেশন, অ্যাওয়ার্ড, রেফারেন্স
│   ├── Templates/                # ২০টি স্বতন্ত্র সিভি টেমপ্লেট কম্পোনেন্ট
│   │   ├── templateHelpers.ts    # লোকালাইজড ডেটা হেল্পার
│   │   ├── ClassicCorporate.tsx
│   │   ├── ModernMinimal.tsx
│   │   ├── CreativeSidebar.tsx
│   │   ├── TimelineStyle.tsx
│   │   ├── TwoColumnProfessional.tsx
│   │   ├── ElegantSerif.tsx
│   │   ├── TechFocused.tsx
│   │   ├── AcademicTemplate.tsx
│   │   ├── GovernmentBankStyle.tsx
│   │   ├── FreshGradient.tsx
│   │   ├── CompactOnePage.tsx
│   │   ├── BoldHeader.tsx
│   │   ├── SoftPastel.tsx
│   │   ├── IconBased.tsx
│   │   ├── MagazineStyle.tsx
│   │   ├── CleanSwiss.tsx
│   │   ├── ExecutiveTemplate.tsx
│   │   ├── StartupCreative.tsx
│   │   ├── FormalTraditional.tsx
│   │   ├── ModernSplit.tsx
│   │   └── TemplateRenderer.tsx  # ডাইনামিক রেন্ডারার
│   ├── Preview/
│   │   └── PreviewPane.tsx       # A4 লাইভ জুম ও প্রিন্ট ক্যানভাস
│   └── Download/
│       └── DownloadModal.tsx     # ফরম্যাট (PDF, DOCX, PNG, JPG) ডাউনলোড মোডাল
├── App.tsx                       # মূল অ্যাপ্লিকেশন
├── main.tsx
└── index.css                     # Tailwind CSS ও প্রিন্ট স্টাইল
```

---

## 📄 লাইসেন্স
MIT License — শিক্ষামূলক, ব্যক্তিগত ও বাণিজ্যিক ব্যবহারের জন্য উন্মুক্ত।

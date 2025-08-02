src/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                  # 首頁
|  ├─ lang.tsx 
│  ├─ about/
│  │  ├─ page.tsx               # 關於我們頁面
|  |  └─ lang.tsx
│  ├─ contact/
│  │  ├─ page.tsx               # 聯絡我們頁面
|  |  └─ lang.tsx
│  └─ dashboard/
│     ├─ layout.tsx             # 儀表板專屬排版
│     ├─ page.tsx               # 儀表板首頁
|     ├─ lang.tsx
│     ├─ settings/
│     │  ├─ page.tsx            # 使用者設定
|     |  └─ lang.tsx
│     └─ analytics/
│        ├─ page.tsx            # 數據分析
|        └─ lang.tsx
│
├─ components/
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Modal.tsx
│  │  └─ Card.tsx
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ Sidebar.tsx
│  ├─ forms/
│  |  ├─ ContactForm.tsx
│  |  └─ SettingsForm.tsx
│  └─ lang.tsx
├─ lib/
│  ├─ api.ts
│  ├─ auth.ts
│  └─ utils.ts
│
├─ assets/
│  ├─ images/
│  │  ├─ logo.png
│  │  └─ banner.jpg
│  └─ icons/
│     ├─ home.svg
│     └─ settings.svg
│
├─ styles/
│  ├─ variables.css
│  └─ themes.css
│
└─ i18n/
   ├─ config.ts
   ├─ useTranslation.ts
   └─ translations/
      ├─ en.ts
      ├─ zh.ts
      └─ index.ts


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

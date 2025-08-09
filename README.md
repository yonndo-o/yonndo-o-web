```
src/
│      
├─app
│  │  layout.tsx
│  │  page.tsx
│  │
│  └─(pages)
│      ├─about
│      │      about.module.css
│      │      page.tsx
│      │
│      ├─articles
│      │  ├─new
│      │  │      CreateArticle.module.css
│      │  │      page.tsx
│      │  │
│      │  ├─remove
│      │  └─[id]
│      │          article.module.css
│      │          page.tsx
│      │
│      ├─links
│      │      page.tsx
│      │
│      ├─login
│      │      login.module.css
│      │      page.tsx
│      │
│      ├─not-found
│      │      page.tsx
│      │
│      ├─profile
│      │      page.tsx
│      │      profile.module.css
│      │
│      ├─stats
│      │      page.tsx
│      │
│      └─tags
│              page.tsx
│
├─assets
│  ├─icons
│  └─images
│          default-cover.jpg
│
├─components
│  ├─ArticleList
│  │      ArticleList.module.css
│  │      ArticleList.tsx
│  │
│  ├─forms
│  │      LoginForm.tsx
│  │      SettingsForm.tsx
│  │
│  ├─layout
│  │      footer.tsx
│  │      header.tsx
│  │
│  └─ui
│      │  Button.tsx
│      │  LanguageToggleButton.tsx
│      │  ThemeToggleButton.tsx
│      │
│      ├─Card
│      │      card.module.css
│      │      Card.tsx
│      │
│      ├─FontSizeButton
│      │      FontSizeButton.module.css
│      │      FontSizeButton.tsx
│      │
│      ├─Modal
│      │      Modal.module.css
│      │      Modal.tsx
│      │
│      ├─Navbar
│      │      NavBar.module.css
│      │      NavBar.tsx
│      │
│      └─NavItem
│              NavItem.module.css
│              NavItem.tsx
│
├─i18n
│  │  config.tsx
│  │  LanguageProvider.tsx
│  │
│  └─translations
│          en.tsx
│          index.tsx
│          zh.tsx
│
├─lib
│  │  api.tsx
│  │  auth.tsx
│  │  firebase.tsx
│  │  getInitialLang.tsx
│  │
│  └─utils
│          articleHelpers.tsx
│
└─styles
    │  accessibility.css
    │  base.css
    │  globals.css
    │  layout.css
    │  responsive.css
    │  variables.css
    │
    └─components
            buttons.css
```

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

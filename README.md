```
src/
│
├─app
│  │  layout.tsx
│  │  not-found.tsx
│  │  page.tsx
│  │
│  ├─(pages)
│  │  ├─articles
│  │  │  ├─new
│  │  │  │      CreateArticle.module.css
│  │  │  │      page.tsx
│  │  │  │
│  │  │  ├─remove
│  │  │  └─[id]
│  │  │          article.module.css
│  │  │          page.tsx
│  │  │
│  │  ├─login
│  │  │      page.tsx
│  │  │
│  │  └─profile
│  │          page.tsx
│  │          profile.module.css
│  │
│  └─[...missing]
│          page.tsx
│
├─assets
│  ├─icons
│  └─images
│          default-cover.jpg
│
├─components
│  │  ArticleList.tsx
│  │
│  ├─layout
│  │      Footer.tsx
│  │      header.tsx
│  │
│  ├─profile
│  │      ProfileEditModal.tsx
│  │
│  └─ui
│      │  FontSizeButton.tsx
│      │  LanguageToggleButton.tsx
│      │  Modal.tsx
│      │  NavBar.tsx
│      │  NavItem.tsx
│      │  ThemeToggleButton.tsx
│      │
│      └─Card
│              card.module.css
│              Card.tsx
│
├─i18n
│  │  config.tsx
│  │  LanguageProvider.tsx
│  │
│  └─translations
│          en.tsx
│          index.tsx
│          ja.tsx
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
    │  animations.css
    │  global.css
    │  layout.css
    │  themes.css
    │  typography.css
    │  variables.css
    │
    ├─base
    │      accessibility.focus.css
    │      accessibility.fontscale.css
    │      accessibility.motion.css
    │      accessibility.skiplink.css
    │
    ├─components
    │  │  form.css
    │  │  links.css
    │  │  pagination.css
    │  │
    │  ├─articlelist
    │  │      articlelist.css
    │  │
    │  ├─buttons
    │  │      buttons.css
    │  │      buttons.responsive.css
    │  │      buttons.theme.css
    │  │
    │  ├─card
    │  │      card.css
    │  │      card.responsive.css
    │  │      card.theme.css
    │  │
    │  ├─modal
    │  │      modal.animation.css
    │  │      modal.css
    │  │      modal.responsive.css
    │  │      modal.theme.css
    │  │
    │  ├─nav
    │  │      footer.css
    │  │      header.css
    │  │      navbar.css
    │  │      navbar.responsive.css
    │  │      navbar.theme.css
    │  │      navitem.css
    │  │      navitem.theme.css
    │  │
    │  └─profile
    │          edit-modal.css
    │          edit-modal.responsive.css
    │          edit-modal.theme.css
    │
    ├─pages
    │      login.css
    │      not-found.css
    │      profile.css
    │
    └─responsive
            responsive-components.css
            responsive-layout.css
            responsive-typography.css
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

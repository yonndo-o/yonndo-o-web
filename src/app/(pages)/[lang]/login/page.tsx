// app/[lang]/login/page.tsx
'use client';

import React from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import { useGoogleLogin } from '@/lib/hooks/useGoogleLogin';

export default function LoginPage() {
  const { t } = useLang();
  const handleGoogleLogin = useGoogleLogin();

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const onLoginClick = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      await handleGoogleLogin();
    } catch (error) {
      setErrorMsg(t('common.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="loginSection">
        <figure aria-hidden="true">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google Icon"
            className="loginIcon"
          />
        </figure>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button onClick={onLoginClick} className="glassbutton" disabled={loading}>
          {loading ? t('common.loading') : t('common.login')}
        </button>
      </section>
    </main>
  );
}

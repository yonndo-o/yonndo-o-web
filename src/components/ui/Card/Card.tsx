'use client';

import React from 'react';

const GlassCard = () => {

  return (
    <div
      className="
        bg-white/10
        backdrop-blur-md
        rounded-xl
        p-6
        shadow-lg
        border border-white/20
        transition-all
        duration-300

        w-full
        sm:w-[80%]
        md:w-[60%]
        lg:w-[50%]
        xl:w-[40%]
        mx-auto
      "
      style={{
        color: 'var(--foreground)', // 動態主題字色
        backgroundColor: 'var(--background)', // 可選擇是否加上
      }}
    >
      <h2 className="text-2xl font-semibold mb-2">{"t('title')"}</h2>
      <p className="text-base">{"context"}</p>
    </div>
  );
};

export default GlassCard;
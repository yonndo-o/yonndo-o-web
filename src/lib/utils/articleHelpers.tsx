import { NextResponse } from "next/server";

const LIBRE_TRANSLATE_ENDPOINT = "https://libretranslate.com/translate";

type TranslationResult = {
  [lang: string]: {
    title: string;
    content: string;
  };
};

type TranslateArticleOptions = {
  title: string;
  content: string;
  languages: string[]; // 例如 ['zh', 'ja', 'en']
  retryCount?: number;
};

  async function autoTranslate({
    text,
    target,
  }: {
    text: string;
    target: string;
  }): Promise<string> {
    // 這裡是你原本的翻譯邏輯，例如呼叫 Google Translate API 或 Firebase function
    throw new Error("autoTranslate 未實作");
  }

export async function translateArticle({
  title,
  content,
  languages,
  retryCount = 2,
}: TranslateArticleOptions): Promise<TranslationResult> {
  const result: TranslationResult = {};

  for (const lang of languages) {
    let translatedTitle = "";
    let translatedContent = "";

    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        [translatedTitle, translatedContent] = await Promise.all([
          autoTranslate({ text: title, target: lang }),
          autoTranslate({ text: content, target: lang }),
        ]);
        break; // 成功就跳出 retry loop
      } catch (err) {
        if (attempt === retryCount) {
          console.error(`翻譯失敗：${lang}`, err);
          translatedTitle = title;
          translatedContent = content;
        }
      }
    }

    result[lang] = {
      title: translatedTitle,
      content: translatedContent,
    };
  }

  return result;
}

export async function POST(req: Request) {
  try {
    const { text, target }: { text: string; target: string } = await req.json();

    if (!text || !target) {
      return NextResponse.json({ error: "Missing text or target language" }, { status: 400 });
    }

    const translated = await autoTranslate({ text, target });

    return NextResponse.json({ translated });
  } catch (error: any) {
    console.error("Translation error:", error.message || error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .slice(0, 50);
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

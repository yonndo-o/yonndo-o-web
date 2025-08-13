class CookieService {
    /**
     * 設定 Cookie
     * @param name Cookie 名稱
     * @param value Cookie 值
     * @param days 有效天數（預設 7 天）
     */
    static set(name: string, value: string, days: number = 7): void {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; secure; samesite=strict`;
    }

    /**
     * 取得 Cookie 值
     * @param name Cookie 名稱
     * @returns Cookie 值或 null
     */
    static get(name: string): string | null {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [key, val] = cookie.split('=');
            if (key === name) return decodeURIComponent(val);
        }
        return null;
    }

    /**
     * 刪除 Cookie
     * @param name Cookie 名稱
     */
    static delete(name: string): void {
        document.cookie = `${name}=; Max-Age=0; path=/`;
    }
}
export default CookieService;
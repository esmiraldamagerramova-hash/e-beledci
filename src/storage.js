/**
 * İstifadəçiyə aid kiçik məlumatların brauzerdə saxlanması (demo rejim).
 * Backend qoşulduqda bu funksiyalar API sorğuları ilə əvəz olunur.
 */
const key = (user, name) => `unec_${name}_${user?.username || 'guest'}`;

export function readUserData(user, name, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key(user, name)));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeUserData(user, name, value) {
  try { localStorage.setItem(key(user, name), JSON.stringify(value)); } catch { /* ignore */ }
}

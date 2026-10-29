/**
 * API QATI — backend qoşulması yalnız bu fayldan idarə olunur.
 *
 *  VITE_API_URL boşdursa → demo (mock) rejim.
 *  VITE_API_URL doludursa → real backend-ə sorğu göndərilir.
 *
 * Endpoint-lər (README-də ətraflı):
 *   POST {API}/auth/login                 { username, password } → { token, user }
 *   GET  {API}/auth/me                    → user
 *   PUT  {API}/auth/me                    { fullName, email, faculty, lang } → user
 *   GET  {API}/guide/categories?lang=az   → Category[]
 *   GET  {API}/guide/services/:id?lang=az → Service
 */
import { localizedCategories } from '../data/index.js';

export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const IS_MOCK = !API_URL;

const TOKEN_KEY = 'unec_token';

export const tokenStore = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (t) => { try { localStorage.setItem(TOKEN_KEY, t); } catch { /* ignore */ } },
  clear: () => { try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ } },
};

async function request(path, { method = 'GET', body, lang } = {}) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (lang) headers['Accept-Language'] = lang;
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try { const d = await res.json(); message = d.message || d.error || message; } catch { /* ignore */ }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------- DEMO HESABLAR ------------------------- */
const DEMO_USERS = {
  teacher1: {
    fullName: 'Aygün Məmmədova',
    role: 'teacher',
    email: 'aygun.mammadova@unec.edu.az',
    faculty: 'Maliyyə və mühasibat fakültəsi',
  },
  student1: {
    fullName: 'Murad Əliyev',
    role: 'student',
    email: 'murad.aliyev@student.unec.edu.az',
    faculty: 'Rəqəmsal iqtisadiyyat fakültəsi',
  },
};
const MOCK_PROFILE_KEY = (u) => `unec_mock_profile_${u}`;

function mockUser(username) {
  const key = username.trim().toLowerCase();
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(MOCK_PROFILE_KEY(key))); } catch { /* ignore */ }
  const demo = DEMO_USERS[key];
  const pretty = key.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim().replace(/\b\p{L}/gu, (c) => c.toUpperCase()) || 'İstifadəçi';
  return {
    id: key,
    username: key,
    fullName: pretty,
    role: /teach|muell|müəll/i.test(key) ? 'teacher' : 'student',
    email: `${key}@unec.edu.az`,
    faculty: '',
    memberSince: '2024-09-01',
    ...demo,
    ...saved,
  };
}

/* ------------------------- AUTH ------------------------- */
export async function login(username, password) {
  if (IS_MOCK) {
    await delay(450);
    if (!username.trim() || !password.trim()) {
      const e = new Error('EMPTY_CREDENTIALS');
      e.code = 'EMPTY_CREDENTIALS';
      throw e;
    }
    return { token: `demo-${username.trim().toLowerCase()}`, user: mockUser(username) };
  }
  return request('/auth/login', { method: 'POST', body: { username, password } });
}

export async function updateProfile(user, patch) {
  if (IS_MOCK) {
    await delay(300);
    const next = { ...user, ...patch };
    try {
      localStorage.setItem(
        MOCK_PROFILE_KEY(user.username),
        JSON.stringify({ fullName: next.fullName, email: next.email, faculty: next.faculty })
      );
    } catch { /* ignore */ }
    return next;
  }
  return request('/auth/me', { method: 'PUT', body: patch });
}

/* ------------------------- GUIDE ------------------------ */
export async function getCategories(lang = 'az') {
  if (IS_MOCK) {
    await delay(120);
    return localizedCategories(lang);
  }
  return request(`/guide/categories?lang=${lang}`, { lang });
}

export async function getService(id, lang = 'az') {
  if (IS_MOCK) {
    await delay(80);
    for (const c of localizedCategories(lang)) {
      const svc = c.services.find((s) => s.id === id);
      if (svc) return { ...svc, categoryId: c.id };
    }
    const err = new Error('NOT_FOUND');
    err.status = 404;
    throw err;
  }
  return request(`/guide/services/${encodeURIComponent(id)}?lang=${lang}`, { lang });
}

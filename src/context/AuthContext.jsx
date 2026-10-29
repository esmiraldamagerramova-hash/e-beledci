import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { login as apiLogin, updateProfile as apiUpdate, tokenStore } from '../api/client.js';

const AuthContext = createContext(null);
const USER_KEY = 'unec_user';
const recentKey = (u) => `unec_recent_${u}`;

function read(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (tokenStore.get() ? read(USER_KEY, null) : null));
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(user ? read(recentKey(user.username), []) : []);
  }, [user?.username]);

  const login = useCallback(async (username, password) => {
    const { token, user: u } = await apiLogin(username, password);
    tokenStore.set(token);
    write(USER_KEY, u);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    try { localStorage.removeItem(USER_KEY); } catch { /* ignore */ }
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (patch) => {
    const next = await apiUpdate(user, patch);
    write(USER_KEY, next);
    setUser(next);
    return next;
  }, [user]);

  /** Son baxılan xidmətlər (istifadəçiyə görə, ən çox 8) */
  const pushRecent = useCallback((categoryId, serviceId) => {
    if (!user) return;
    setRecent((prev) => {
      const next = [{ categoryId, serviceId, at: Date.now() }, ...prev.filter((r) => r.serviceId !== serviceId)].slice(0, 8);
      write(recentKey(user.username), next);
      return next;
    });
  }, [user]);

  const clearRecent = useCallback(() => {
    if (!user) return;
    write(recentKey(user.username), []);
    setRecent([]);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, recent, pushRecent, clearRecent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export const firstName = (u) => (u?.fullName || u?.username || '').trim().split(/\s+/)[0];
export const initials = (u) =>
  (u?.fullName || u?.username || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

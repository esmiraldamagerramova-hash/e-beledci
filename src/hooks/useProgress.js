import { createContext, createElement, useContext } from 'react';
import useLocalStorage from './useLocalStorage.js';

const Ctx = createContext(null);

export function ProgressProvider({ children }) {
  const [done, setDone] = useLocalStorage('eb_progress', {});
  const [results, setResults] = useLocalStorage('eb_quiz_results', []);
  const value = {
    done,
    isDone: (id) => !!done[id],
    toggle: (id) => setDone((d) => { const n = { ...d }; if (n[id]) delete n[id]; else n[id] = new Date().toISOString(); return n; }),
    results,
    addResult: (r) => setResults((list) => [{ ...r, date: new Date().toISOString() }, ...list].slice(0, 30)),
    reset: () => { setDone({}); setResults([]); },
  };
  return createElement(Ctx.Provider, { value }, children);
}

export const useProgress = () => useContext(Ctx);

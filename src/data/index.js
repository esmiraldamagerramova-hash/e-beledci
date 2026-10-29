/**
 * Demo məlumatlarının seçilmiş dilə uyğunlaşdırılması (yalnız mock rejimdə).
 * Real backend eyni strukturu ?lang=az|en|ru parametrinə uyğun qaytarmalıdır.
 */
import { categories as base } from './guide.js';
import * as en from './guide.en.js';
import * as ru from './guide.ru.js';

const DICTS = { en, ru };

export function localizedCategories(lang) {
  const d = DICTS[lang];
  if (!d) return base;
  return base.map((c) => {
    const [title, description] = d.categories[c.id] || [c.title, c.description];
    return {
      ...c,
      title,
      description,
      subtitle: lang === 'en' ? null : c.subtitle,
      services: c.services.map((s) => {
        const [name, brief, about] = d.services[s.id] || [s.name, s.brief, s.about];
        const out = { ...s, name, brief, about };
        if (s.video) out.video = { ...s.video, title: d.videoTitle };
        if (s.slides && d.slides[s.id]) {
          const [stitle, items] = d.slides[s.id];
          out.slides = { ...s.slides, title: stitle, items: items.map(([t, x]) => ({ title: t, text: x })) };
        }
        return out;
      }),
    };
  });
}

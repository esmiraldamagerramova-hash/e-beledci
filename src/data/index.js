/**
 * Demo məlumatlarının seçilmiş dilə uyğunlaşdırılması (yalnız mock rejimdə).
 * Real backend eyni strukturu ?lang=az|en|ru parametrinə uyğun qaytarmalıdır.
 */
import { categories as base, PLATFORM_DOMAIN } from './guide.js';
import * as en from './guide.en.js';
import * as ru from './guide.ru.js';
import {
  HIDDEN_CATEGORIES, HIDDEN_SERVICES, CATEGORY_OVERRIDES, SERVICE_OVERRIDES, NEW_SERVICES,
} from './guide.user.js';

const DICTS = { en, ru };

// "(plugin)" kimi texniki qeydləri adlardan çıxarır
const clean = (name) => name.replace(/\s*\((plugin|плагин)\)/i, '');

function translate(lang) {
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

export function localizedCategories(lang) {
  const L = ['az', 'en', 'ru'].includes(lang) ? lang : 'az';
  return translate(lang)
    .filter((c) => !HIDDEN_CATEGORIES.includes(c.id))
    .map((c, i) => {
      const co = CATEGORY_OVERRIDES[c.id]?.[L];
      let services = c.services
        .filter((s) => !HIDDEN_SERVICES.includes(s.id))
        .map((s) => {
          const so = SERVICE_OVERRIDES[s.id]?.[L];
          return so ? { ...s, name: so[0], brief: so[1], about: so[2] } : { ...s, name: clean(s.name) };
        });
      const extra = NEW_SERVICES.filter((n) => n.categoryId === c.id).map((n) => {
        const [name, brief, about] = n[L];
        const svc = { id: n.id, name, brief, about, domain: `${PLATFORM_DOMAIN}${n.path}` };
        if (n.slideItems) {
          svc.slides = {
            title: n.slideTitle[L], type: 'inline',
            items: n.slideItems[L].map(([t, x]) => ({ title: t, text: x })),
          };
        }
        return svc;
      });
      services = [...services, ...extra];
      return {
        ...c,
        number: i + 1,
        ...(co ? { title: co[0], description: co[1], subtitle: co[2] } : {}),
        services,
      };
    });
}

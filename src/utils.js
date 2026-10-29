/** Azərbaycan hərflərini nəzərə alaraq axtarış üçün normallaşdırma. */
export function normalize(str = '') {
  return str
    .toLocaleLowerCase('az')
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export function allServices(categories) {
  return categories.flatMap((c) => c.services.map((s) => ({ ...s, category: c })));
}

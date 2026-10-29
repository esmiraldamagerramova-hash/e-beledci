/**
 * DEMO: tələbənin kursları və universitetin açıq proqramları.
 * Backend qoşulduqda bu məlumatlar API-dən gələcək:
 *   GET  /me/courses            → tələbəyə avtomatik bağlanan kurslar
 *   GET  /programs/open         → açıq proqramlar
 *   POST /programs/:id/join     → proqrama qoşulmaq
 *   DELETE /programs/:id/join   → proqramdan çıxmaq
 */
export const MY_COURSES = [
  { id: 'c1', code: 'MİK-201', teacher: 'Aygün Məmmədova',
    title: { az: 'Mikroiqtisadiyyat', en: 'Microeconomics', ru: 'Микроэкономика' } },
  { id: 'c2', code: 'MAL-214', teacher: 'Rəşad Hüseynov',
    title: { az: 'Maliyyə hesabatları', en: 'Financial reporting', ru: 'Финансовая отчётность' } },
  { id: 'c3', code: 'STA-110', teacher: 'Leyla Qasımova',
    title: { az: 'Statistika', en: 'Statistics', ru: 'Статистика' } },
  { id: 'c4', code: 'İNG-105', teacher: 'Nərmin Əliyeva',
    title: { az: 'Biznes ingilis dili', en: 'Business English', ru: 'Деловой английский' } },
];

export const OPEN_PROGRAMS = [
  { id: 'p1', weeks: 6, hours: 24,
    title: { az: 'Rəqəmsal marketinqin əsasları', en: 'Digital marketing basics', ru: 'Основы цифрового маркетинга' },
    text: { az: 'SMM, kontent strategiyası və reklam analitikası.', en: 'SMM, content strategy and ad analytics.', ru: 'SMM, контент-стратегия и аналитика рекламы.' } },
  { id: 'p2', weeks: 4, hours: 16,
    title: { az: 'Excel ilə maliyyə təhlili', en: 'Financial analysis in Excel', ru: 'Финансовый анализ в Excel' },
    text: { az: 'Formullar, cədvəllər və maliyyə modelləri.', en: 'Formulas, pivot tables and financial models.', ru: 'Формулы, сводные таблицы и финансовые модели.' } },
  { id: 'p3', weeks: 5, hours: 20,
    title: { az: 'Akademik yazı və tədqiqat', en: 'Academic writing and research', ru: 'Академическое письмо и исследование' },
    text: { az: 'Məqalə strukturu, istinad qaydaları, plagiatdan qaçınma.', en: 'Paper structure, citation rules, avoiding plagiarism.', ru: 'Структура статьи, правила цитирования, как избежать плагиата.' } },
  { id: 'p4', weeks: 8, hours: 32,
    title: { az: 'Data analitikaya giriş', en: 'Introduction to data analytics', ru: 'Введение в анализ данных' },
    text: { az: 'Məlumatların toplanması, vizuallaşdırma və nəticə çıxarma.', en: 'Collecting, visualising and interpreting data.', ru: 'Сбор, визуализация и интерпретация данных.' } },
  { id: 'p5', weeks: 3, hours: 12,
    title: { az: 'Təhsildə süni intellekt', en: 'AI in education', ru: 'Искусственный интеллект в образовании' },
    text: { az: 'Aİ alətlərindən məsuliyyətli və effektiv istifadə.', en: 'Using AI tools responsibly and effectively.', ru: 'Ответственное и эффективное использование ИИ-инструментов.' } },
  { id: 'p6', weeks: 6, hours: 24,
    title: { az: 'Sahibkarlıq və startap', en: 'Entrepreneurship and start-ups', ru: 'Предпринимательство и стартапы' },
    text: { az: 'İdeyadan biznes modelinə qədər.', en: 'From idea to business model.', ru: 'От идеи до бизнес-модели.' } },
];

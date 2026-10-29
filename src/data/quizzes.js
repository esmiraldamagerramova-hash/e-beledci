export const quizzes = [
  {
    id: 'platforma',
    title: 'Tədris platforması',
    description: 'Moodle platformasına giriş, kurslar və tapşırıqlar.',
    questions: [
      { q: 'Platformaya daxil olmaq üçün nədən istifadə olunur?', options: ['Universitetin verdiyi istifadəçi adı və parol', 'Sosial şəbəkə hesabı', 'Telefon nömrəsi', 'Heç nə tələb olunmur'], answer: 0 },
      { q: 'Kursa qoşulduqdan sonra o harada görünür?', options: ['Qiymət jurnalında', '«Mənim kurslarım» siyahısında', 'E-poçtda', 'Heç yerdə'], answer: 1 },
      { q: 'Tapşırığı təhvil verdikdən sonra hansı düymə basılmalıdır?', options: ['Ləğv et', 'Çıxış', 'Yadda saxla', 'Yenilə'], answer: 2 },
      { q: 'Qiymətlər və müəllim şərhləri harada göstərilir?', options: ['Forumda', 'Qiymət jurnalında', 'Kurs təsvirində', 'Profil şəklində'], answer: 1 },
      { q: 'Moodle nədir?', options: ['Video redaktoru', 'Tədris idarəetmə sistemi', 'E-poçt xidməti', 'Antivirus'], answer: 1 },
    ],
  },
  {
    id: 'onlayn-ders',
    title: 'Onlayn dərslər',
    description: 'Zoom və Teams ilə onlayn dərslərə qoşulma.',
    questions: [
      { q: 'Onlayn dərsə necə qoşulmaq olar?', options: ['Müəllimin paylaşdığı keçidlə', 'Universitetə zəng edərək', 'E-poçt yazaraq', 'Qoşulmaq mümkün deyil'], answer: 0 },
      { q: 'Dərs zamanı mikrofon necə saxlanmalıdır?', options: ['Həmişə açıq', 'Söndürülmüş', 'Maksimum səslə', 'Fərqi yoxdur'], answer: 1 },
      { q: 'Qoşularkən ad necə yazılmalıdır?', options: ['Ləqəblə', 'Yalnız adla', 'Ad və soyad tam', 'Boş saxlanmalı'], answer: 2 },
      { q: 'Dərsdən əvvəl nə yoxlanmalıdır?', options: ['İnternet, mikrofon və kamera', 'Yalnız ekran parlaqlığı', 'Printer', 'Heç nə'], answer: 0 },
    ],
  },
  {
    id: 'tehlukesizlik',
    title: 'Hesab təhlükəsizliyi',
    description: 'Parol, giriş və hesabın qorunması.',
    questions: [
      { q: 'Parolu unutduqda nə etmək lazımdır?', options: ['Yeni hesab yaratmaq', '«Parolu unutmusunuz?» keçidindən istifadə etmək', 'Dostun hesabından istifadə etmək', 'Gözləmək'], answer: 1 },
      { q: 'Parolu kiminlə paylaşmaq olar?', options: ['Qrup yoldaşları ilə', 'Heç kimlə', 'Müəllimlə', 'Sosial şəbəkədə'], answer: 1 },
      { q: 'Rəsmi elanları ilk növbədə harada izləmək tövsiyə olunur?', options: ['unec.edu.az saytında', 'Naməlum saytlarda', 'Reklamlarda', 'Heç yerdə'], answer: 0 },
    ],
  },
];

export const getQuiz = (id) => quizzes.find((q) => q.id === id);

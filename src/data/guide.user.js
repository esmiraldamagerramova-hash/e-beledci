/**
 * İstifadəçiyə (tələbə və müəllim) yönəlmiş bələdçi.
 * Proqramçılar və administratorlar üçün olan texniki bölmə və xidmətlər
 * (API, inteqrasiyalar, təhlükəsizlik, plaginlər və s.) burada gizlədilir.
 * Lazım olsa, siyahılardan id-ni silərək geri qaytara bilərsiniz.
 */

/** Göstərilməyən bölmələr */
export const HIDDEN_CATEGORIES = ['inteqrasiyalar', 'administrator', 'tehlukesizlik', 'plugin-marketplace'];

/** Göstərilməyən texniki xidmətlər */
export const HIDDEN_SERVICES = [
  'rollar', 'csv-idxal', 'cohortlar', 'kateqoriyalar', 'sablonlar',
  'ims', 'scorm-paket', 'ims-mezmun', 'lti', 'scorm', 'html-editor', 'tinymce', 'atto', 'loqlar',
];

/** Bölmə adlarının dəyişdirilməsi: [ad, təsvir, alt başlıq] */
export const CATEGORY_OVERRIDES = {
  'tedris-materiallari': {
    az: ['Tədris materialları', 'Mühazirə faylları, kitablar, səhifələr, interaktiv məzmun və tam ekran baxış.', 'Resources'],
    en: ['Learning resources', 'Lecture files, books, pages, interactive content and full-screen viewing.', null],
    ru: ['Учебные материалы', 'Файлы лекций, книги, страницы, интерактивный контент и просмотр на весь экран.', 'Resources'],
  },
  'istifadeci-idareetmesi': {
    az: ['Hesab və qeydiyyat', 'Qeydiyyat, profil, açıq proqramlara qoşulma, görünüş və rəng ayarları.', 'Account'],
    en: ['Account and registration', 'Registration, profile, joining open programmes, display and colour settings.', null],
    ru: ['Аккаунт и регистрация', 'Регистрация, профиль, запись на открытые программы, настройки вида и цвета.', 'Account'],
  },
};

/** Mövcud xidmətlərin mətninin dəyişdirilməsi: [ad, qısa, ətraflı] */
export const SERVICE_OVERRIDES = {
  qeydiyyat: {
    az: ['Tələbə qeydiyyatı', 'Tələbə öz kurslarına avtomatik bağlanır, açıq proqramlara isə özü qoşula bilər.',
      'Qeydiyyatdan sonra tələbə öz qrupunun və ixtisasının kurslarına birbaşa bağlanır — bu kurslar kabinetdə «Mənim kurslarım» bölməsində görünür.\n\nBununla paralel olaraq tələbə universitetin açıq proqramlarına (seçmə kurslar, sertifikat proqramları, təlimlər) özü qoşula bilər: «Hesabım → Açıq proqramlar» bölməsində proqramı seçib «Qoşul» düyməsini basmaq kifayətdir.'],
    en: ['Student registration', 'Students are enrolled in their courses automatically and can join open programmes themselves.',
      'After registration a student is enrolled directly in the courses of their group and programme — they appear under “My courses” in the account.\n\nIn parallel, students can join the university’s open programmes (electives, certificate programmes, trainings) on their own: open “My account → Open programmes”, choose a programme and press “Join”.'],
    ru: ['Регистрация студента', 'Студент автоматически привязывается к своим курсам и может сам записываться на открытые программы.',
      'После регистрации студент сразу привязывается к курсам своей группы и специальности — они видны в кабинете в разделе «Мои курсы».\n\nПараллельно студент может сам записаться на открытые программы университета (курсы по выбору, сертификатные программы, тренинги): «Мой аккаунт → Открытые программы», выбрать программу и нажать «Записаться».'],
  },
  'self-enrolment': {
    az: ['Açıq proqramlara qoşulma', 'Tələbənin açıq proqram və kurslara özünün yazılması.',
      'Açıq proqramlar bütün tələbələr üçün əlçatandır. Kabinetdə «Açıq proqramlar» siyahısından istədiyiniz proqramı seçib «Qoşul» düyməsini basın — proqram dərhal «Mənim kurslarım» siyahısına əlavə olunur. Bəzi proqramlar üçün müəllim tərəfindən verilən açar söz tələb oluna bilər.'],
    en: ['Joining open programmes', 'Students enrol themselves in open programmes and courses.',
      'Open programmes are available to all students. In your account, choose a programme in “Open programmes” and press “Join” — it is added to “My courses” immediately. Some programmes may require an enrolment key from the teacher.'],
    ru: ['Запись на открытые программы', 'Самостоятельная запись студента на открытые программы и курсы.',
      'Открытые программы доступны всем студентам. В кабинете выберите программу в списке «Открытые программы» и нажмите «Записаться» — она сразу появится в «Моих курсах». Для некоторых программ может понадобиться кодовое слово от преподавателя.'],
  },
};

/** Yeni, istifadəçi üçün xidmətlər */
export const NEW_SERVICES = [
  {
    categoryId: 'istifadeci-idareetmesi', id: 'gorunus', path: '/user/preferences.php',
    az: ['Görünüş və rəng ayarları (inkluzivlik)', 'Görmə imkanlarına uyğun rəng rejimi və mətn ölçüsü.',
      'Yuxarı paneldəki «Görünüş» düyməsi ilə saytın rənglərini özünüzə uyğunlaşdırın: standart, tünd, yüksək kontrastlı, rəng qavrayışı fərqli olanlar üçün və ağ-qara rejim.\n\nMətn ölçüsünü böyütmək, keçidləri vurğulamaq və animasiyaları azaltmaq da mümkündür. Seçimləriniz yadda saxlanılır.'],
    en: ['Display and colour settings (accessibility)', 'Colour mode and text size to suit your vision.',
      'Use the “Display” button in the top bar to adapt the colours: standard, dark, high contrast, colour-blind friendly and greyscale.\n\nYou can also enlarge the text, highlight links and reduce animations. Your choices are remembered.'],
    ru: ['Настройки вида и цвета (инклюзивность)', 'Цветовой режим и размер текста под ваше зрение.',
      'Кнопка «Вид» в верхней панели позволяет настроить цвета: стандартный, тёмный, высококонтрастный, для людей с нарушением цветовосприятия и чёрно-белый режим.\n\nТакже можно увеличить текст, выделить ссылки и уменьшить анимацию. Выбор сохраняется.'],
  },
  {
    categoryId: 'istifadeci-idareetmesi', id: 'dizayn', path: '/user/preferences.php',
    az: ['Kabinetin dizaynı', 'Kabinetə daxil olduqdan sonra saytın ümumi görünüşünü dəyişin.',
      '«Hesabım → Dizayn» bölməsində əsas rəngi (UNEC mavisi, yaşıl, bənövşəyi, bordo) və səhifə sıxlığını (standart və ya kompakt) seçə bilərsiniz. Dəyişiklik dərhal bütün səhifələrə tətbiq olunur.'],
    en: ['Account design', 'Change the overall look of the site after you sign in.',
      'In “My account → Design” choose the main colour (UNEC blue, green, purple, burgundy) and the page density (standard or compact). Changes apply to all pages immediately.'],
    ru: ['Дизайн кабинета', 'Изменение общего вида сайта после входа.',
      'В разделе «Мой аккаунт → Дизайн» можно выбрать основной цвет (синий UNEC, зелёный, фиолетовый, бордовый) и плотность страниц (стандартная или компактная). Изменения сразу применяются ко всем страницам.'],
  },
  {
    categoryId: 'tedris-materiallari', id: 'tam-ekran', path: '/mod/page',
    slides: { title: '', type: 'inline' },
    az: ['Tam ekran və mövzuları gizlətmək', 'Dərsə baxarkən soldakı mövzu panelini gizlədin və ya tam ekrana keçin.',
      'Material və ya proqramla tanış olarkən sol tərəfdəki mövzular siyahısı diqqəti yayındıra bilər. Səhifənin yuxarısındakı «Mövzuları gizlət» düyməsi paneli bağlayır, «Tam ekran» isə materialı PowerPoint təqdimatı kimi bütün ekrana açır.\n\nTam ekrandan çıxmaq üçün Esc düyməsini basın.'],
    en: ['Full screen and hiding topics', 'Hide the topics panel on the left or switch to full screen while studying.',
      'The list of topics on the left can be distracting while you study. “Hide topics” at the top of the page closes the panel, and “Full screen” opens the material across the whole screen, like a PowerPoint presentation.\n\nPress Esc to leave full screen.'],
    ru: ['Полный экран и скрытие тем', 'Скройте панель тем слева или откройте материал на весь экран.',
      'Список тем слева может отвлекать во время занятия. Кнопка «Скрыть темы» вверху страницы закрывает панель, а «Полный экран» открывает материал на весь экран, как презентацию PowerPoint.\n\nЧтобы выйти из полного экрана, нажмите Esc.'],
    slideItems: {
      az: [['Mövzuları gizlət', 'Səhifənin yuxarısındakı düyməni basın — sol panel bağlanır.'], ['Tam ekran', '«Tam ekran» düyməsi materialı bütün ekrana açır.'], ['Çıxış', 'Esc düyməsi ilə adi rejimə qayıdın.']],
      en: [['Hide topics', 'Press the button at the top of the page — the left panel closes.'], ['Full screen', '“Full screen” opens the material across the screen.'], ['Exit', 'Press Esc to return to the normal view.']],
      ru: [['Скрыть темы', 'Нажмите кнопку вверху страницы — левая панель закроется.'], ['Полный экран', 'Кнопка «Полный экран» открывает материал на весь экран.'], ['Выход', 'Нажмите Esc, чтобы вернуться в обычный режим.']],
    },
    slideTitle: { az: 'Tam ekran rejimi', en: 'Full-screen mode', ru: 'Полноэкранный режим' },
  },
  {
    categoryId: 'imtahan-modulu', id: 'ozunu-yoxla', path: '/mod/quiz',
    az: ['Özünü yoxlama (mövzu üzrə sınaq)', 'İstədiyiniz mövzuları seçib qiymətə təsir etməyən sınaq keçin.',
      'Tələbə istədiyi vaxt konkret mövzular üzrə özünü yoxlaya bilər. «Özünü yoxla» səhifəsində mövzuları seçin, sualların sayını təyin edin və sınağa başlayın.\n\nSınaq qiymətə təsir etmir. Sonda düzgün və səhv cavablar göstərilir, nəticələr isə kabinetdə saxlanılır.'],
    en: ['Self-assessment (topic quiz)', 'Pick any topics and take a practice quiz that does not affect your grade.',
      'Students can test themselves on specific topics at any time. On the “Self-test” page choose the topics, set the number of questions and start.\n\nThe quiz does not affect grades. At the end correct and incorrect answers are shown, and results are saved in your account.'],
    ru: ['Самопроверка (тест по темам)', 'Выберите темы и пройдите пробный тест, не влияющий на оценку.',
      'Студент может в любой момент проверить себя по конкретным темам. На странице «Проверь себя» выберите темы, количество вопросов и начните.\n\nТест не влияет на оценку. В конце показываются правильные и неправильные ответы, а результаты сохраняются в кабинете.'],
  },
];

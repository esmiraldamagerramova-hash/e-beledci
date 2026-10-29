/**
 * DEMO MƏLUMATLARI (mock)
 * ------------------------------------------------------------------
 * Mənbə: "Moodle modulları — Aİ-inteqrasiya — tələbələr üçün.docx"
 * Backend qoşulana qədər sayt bu məlumatlarla işləyir.
 * Backend-in qaytaracağı JSON strukturu da eynidir (README-yə baxın).
 *
 * Xidmət (service) obyektinin sahələri:
 *   id       – unikal açar (URL-də istifadə olunur)
 *   name     – Adı
 *   domain   – Xidmətin ünvanı / domeni
 *   brief    – Qısa təsvir (1 cümlə)
 *   about    – Haqqında (ətraflı)
 *   video    – (istəyə bağlı) { title, url, type: 'youtube' | 'file' }
 *   slides   – (istəyə bağlı) { title, type: 'inline' | 'pdf' | 'images', items | url }
 */

export const PLATFORM_DOMAIN = 'moodle.unec.edu.az';

// Kiçik köməkçi: [id, ad, yol, brief, haqqında]
const s = (id, name, path, brief, about) => ({
  id,
  name,
  domain: `${PLATFORM_DOMAIN}${path}`,
  brief,
  about,
});

const DEMO_VIDEO = {
  title: 'Nümunə video (backend-dən real təlim videosu ilə əvəz olunacaq)',
  type: 'file',
  url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
};

export const categories = [
  {
    id: 'istifadeci-idareetmesi',
    number: 1,
    title: 'İstifadəçi idarəetməsi',
    subtitle: 'User Management',
    icon: 'Users',
    description:
      'Platformaya giriş, rollar, qruplar və istifadəçi profillərinin idarə olunması ilə bağlı xidmətlər.',
    services: [
      s('qeydiyyat', 'İstifadəçilərin qeydiyyatı', '/admin/user.php', 'Yeni tələbə və müəllimlərin sistemə əlavə edilməsi.', 'Qeydiyyat modulu vasitəsilə hər bir istifadəçi üçün unikal hesab yaradılır. UNEC-də hesablar adətən mərkəzləşdirilmiş qaydada yaradılır və istifadəçiyə giriş məlumatları təqdim olunur.'),
      s('rollar', 'Rol və səlahiyyətlərin idarə edilməsi', '/admin/roles/manage.php', 'Tələbə, müəllim, menecer kimi rolların və icazələrin təyini.', 'Hər rol müəyyən səlahiyyətlər toplusudur: məsələn, müəllim tapşırıq yarada və qiymət verə bilir, tələbə isə yalnız iştirak edir. Rollar kurs, kateqoriya və ya bütün sistem səviyyəsində təyin oluna bilər.'),
      s('autentifikasiya', 'Autentifikasiya', '/login/index.php', 'Təhlükəsiz giriş: istifadəçi adı, parol, LDAP və ya SSO.', 'Sistemə giriş müxtəlif üsullarla təmin edilir — daxili hesablar, universitetin LDAP/Active Directory kataloqu və ya OAuth2/SAML vasitəsilə vahid giriş (SSO).'),
      s('qruplar', 'Qruplar və alt qruplar', '/group/index.php', 'Kurs daxilində tələbələrin qruplara bölünməsi.', 'Müəllim bir kurs daxilində akademik qrupları ayırd edə, tapşırıq və forumları qruplar üzrə ayrıca təşkil edə bilər. Bu, böyük axınlarda işi xeyli asanlaşdırır.'),
      s('profil', 'Profil idarəetməsi', '/user/profile.php', 'Şəxsi məlumatların, foto və bildiriş ayarlarının redaktəsi.', 'İstifadəçi öz profilində əlaqə məlumatlarını, dil seçimini, profil şəklini və bildiriş tərcihlərini idarə edir.'),
      s('csv-idxal', 'Toplu istifadəçi idxalı (CSV)', '/admin/tool/uploaduser/index.php', 'Yüzlərlə istifadəçinin bir faylla sistemə yüklənməsi.', 'CSV faylı vasitəsilə semestr əvvəlində bütün tələbələr bir dəfəyə qeydiyyatdan keçirilə və kurslara yazıla bilər. Bu, əl ilə əlavə etməyə sərf olunan vaxtı minimuma endirir.'),
      s('cohortlar', 'Cohort-lar (istifadəçi qrupları)', '/cohort/index.php', 'Fakültə, ixtisas və ya kurs səviyyəsində qlobal qruplar.', 'Cohort — sistem səviyyəsində istifadəçi qrupudur. Məsələn, "Maliyyə fakültəsi, 2-ci kurs" cohort-u bir kliklə bir neçə kursa yazdırıla bilər.'),
    ],
  },
  {
    id: 'kurslarin-idare-edilmesi',
    number: 2,
    title: 'Kursların idarə edilməsi',
    subtitle: 'Course Management',
    icon: 'BookOpen',
    description: 'Kursların yaradılması, təşkili, ehtiyat nüsxəsi və tələbələrin kurslara yazılması.',
    services: [
      s('kurs-yaratma', 'Kurs yaratma', '/course/edit.php', 'Yeni elektron kursun yaradılması və əsas parametrləri.', 'Kurs adı, qısa adı, kateqoriyası, başlama və bitmə tarixləri, format (həftəlik, mövzular üzrə) bu mərhələdə təyin edilir.'),
      s('kateqoriyalar', 'Kateqoriyalar', '/course/management.php', 'Kursların fakültə və kafedralar üzrə qruplaşdırılması.', 'Kateqoriyalar kursları iyerarxik şəkildə təşkil edir: fakültə → kafedra → ixtisas. Bu, axtarışı və idarəetməni asanlaşdırır.'),
      s('sablonlar', 'Kurs şablonları', '/course/index.php', 'Vahid strukturlu kursların hazır şablondan yaradılması.', 'Universitet səviyyəsində hazırlanmış şablon bütün kurslarda eyni bölmələrin (sillabus, mühazirələr, qiymətləndirmə) olmasını təmin edir.'),
      s('backup', 'Kurs ehtiyat nüsxəsi (Backup)', '/backup/backup.php', 'Kursun bütün məzmununun fayl şəklində saxlanması.', 'Ehtiyat nüsxə kursun materiallarını, fəaliyyətlərini və istəyə görə tələbə məlumatlarını .mbz faylında saxlayır.'),
      s('restore', 'Kursun bərpası (Restore)', '/backup/restore.php', 'Ehtiyat nüsxədən kursun yenidən qurulması.', 'Restore funksiyası ilə əvvəlki semestrin kursu yeni semestr üçün bir neçə dəqiqəyə bərpa oluna bilər.'),
      s('import', 'Kursun importu', '/backup/import.php', 'Başqa kursdan materialların köçürülməsi.', 'Müəllim digər kursundakı seçilmiş materialları və fəaliyyətləri cari kursa idxal edə bilər — sıfırdan başlamağa ehtiyac qalmır.'),
      s('self-enrolment', 'Self-enrolment', '/enrol/index.php', 'Tələbənin kursa özünün yazılması (açar sözlə).', 'Müəllim kursa yazılma açarı təyin edir; tələbə bu açarı daxil edərək kursa özü qoşulur.'),
      s('manual-enrolment', 'Manual enrolment', '/enrol/users.php', 'Tələbələrin müəllim və ya admin tərəfindən yazılması.', 'Əl ilə yazılma metodunda istifadəçilər siyahıdan seçilərək kursa əlavə olunur və onlara rol təyin edilir.'),
      s('guest-access', 'Guest access', '/enrol/guest', 'Kursa qonaq kimi baxış imkanı.', 'Qonaq girişi açıq olan kursların materiallarına qeydiyyatsız baxmaq mümkündür, lakin fəaliyyətlərdə iştirak etmək olmur.'),
    ],
  },
  {
    id: 'tedris-materiallari',
    number: 3,
    title: 'Tədris materialları',
    subtitle: 'Resources',
    icon: 'FolderOpen',
    description: 'Mühazirə faylları, kitablar, səhifələr, interaktiv və SCORM məzmun.',
    services: [
      s('file', 'File', '/mod/resource', 'PDF, Word, PowerPoint və digər faylların yerləşdirilməsi.', 'Ən çox istifadə olunan resursdur: müəllim mühazirə slaydlarını və ya oxu materiallarını yükləyir, tələbə onları yükləyir və ya brauzerdə açır.'),
      s('folder', 'Folder', '/mod/folder', 'Bir neçə faylın bir qovluqda təqdim edilməsi.', 'Qovluq resursu eyni mövzuya aid faylları bir yerdə toplayır və kurs səhifəsini səliqəli saxlayır.'),
      s('book', 'Book', '/mod/book', 'Fəsillərə bölünmüş çoxsəhifəli elektron kitab.', 'Book modulu uzun mətnləri fəsil və bölmələrə ayırır, mündəricat ilə rahat naviqasiya imkanı verir.'),
      s('page', 'Page', '/mod/page', 'Kurs daxilində HTML veb-səhifə.', 'Mətn, şəkil, video və keçidlərdən ibarət səhifə birbaşa Moodle redaktorunda yaradılır.'),
      s('url', 'URL', '/mod/url', 'Xarici veb-resursa keçid.', 'Elektron kitabxana, məqalə və ya video platformaya keçidlər URL resursu ilə əlavə edilir.'),
      s('label', 'Label', '/mod/label', 'Kurs səhifəsində başlıq, izah və ya vizual ayırıcı.', 'Label (Text and media area) kurs səhifəsində bölmələri izah etmək, elan və ya şəkil yerləşdirmək üçün istifadə olunur.'),
      s('ims', 'IMS Content Package', '/mod/imscp', 'Standart IMS paketlərinin kursa yüklənməsi.', 'Başqa sistemlərdə hazırlanmış IMS standartlı məzmun paketləri dəyişiklik edilmədən kursa əlavə olunur.'),
      s('scorm-paket', 'SCORM paketləri', '/mod/scorm', 'İnteraktiv təlim modulları, nəticələrin izlənməsi ilə.', 'SCORM paketləri tələbənin irəliləyişini və test nəticələrini Moodle jurnalına ötürür.'),
      s('h5p-resurs', 'H5P interaktiv məzmun', '/mod/h5pactivity', 'İnteraktiv video, kartlar, viktorinalar.', 'H5P ilə proqramlaşdırma bilmədən interaktiv video, sürüklə-burax tapşırıqları və təqdimatlar yaradılır.'),
    ],
  },
  {
    id: 'telim-fealiyyetleri',
    number: 4,
    title: 'Təlim fəaliyyətləri',
    subtitle: 'Activities',
    icon: 'ClipboardList',
    description: 'Tapşırıqlar, imtahanlar, forumlar, sorğular və onlayn dərs alətləri.',
    services: [
      s('tapsiriq', 'Tapşırıq', '/mod/assign', 'Tələbələrin iş təhvil verməsi və müəllim rəyi.', 'Tələbə faylı və ya mətni son tarixə qədər təhvil verir, müəllim qiymət və rəy yazır. Rubrika və plagiat yoxlaması qoşula bilər.'),
      s('imtahan', 'İmtahan', '/mod/quiz', 'Onlayn test və imtahanların keçirilməsi.', 'Müxtəlif sual tiplərini (test, qısa cavab, uyğunlaşdırma və s.) dəstəkləyir, avtomatik qiymətləndirir.'),
      s('forum', 'Forum', '/mod/forum', 'Asinxron müzakirə və sual-cavab məkanı.', 'Forumlar elanlar, mövzu müzakirələri və tələbələrin bir-birinə kömək etməsi üçün istifadə olunur.'),
      s('cat', 'Çat', '/mod/chat', 'Real vaxtda yazılı ünsiyyət.', 'Çat modulu müəyyən vaxtda tələbə və müəllimlərin canlı yazışmasına imkan verir; söhbət tarixçəsi saxlanılır.'),
      s('geri-bildirim', 'Geri bildirim', '/mod/feedback', 'Kurs və müəllim haqqında anonim rəy anketi.', 'Feedback modulu ilə müəllim fərdi sual anketləri hazırlayır və nəticələri qrafiklərlə təhlil edir.'),
      s('sorgu', 'Sorğu', '/mod/choice', 'Tez bir sual üzrə səsvermə.', 'Choice modulu tələbələrin bir sual üzrə seçim etməsini təmin edir — məsələn, mövzu və ya tarix seçimi.'),
      s('workshop', 'Workshop', '/mod/workshop', 'Tələbələrin bir-birinin işini qiymətləndirməsi.', 'Peer-assessment fəaliyyətidir: tələbə həm öz işini təqdim edir, həm də yoldaşlarının işlərini meyarlar əsasında qiymətləndirir.'),
      s('wiki', 'Wiki (birgə idarə oluna bilən tapşırıq)', '/mod/wiki', 'Birgə redaktə olunan səhifələr toplusu.', 'Wiki ilə tələbələr qrup halında bir sənəd üzərində işləyir; hər dəyişikliyin tarixçəsi görünür.'),
      s('davamiyyet', 'Davamiyyət (plugin)', '/mod/attendance', 'Dərsə davamiyyətin elektron qeydiyyatı.', 'Attendance plagini ilə müəllim hər dərsdə iştirakı qeyd edir, QR-kod ilə özünü qeyd etmə imkanı da mövcuddur.'),
      s('scheduler', 'Scheduler (plugin)', '/mod/scheduler', 'Müəllimlə fərdi görüş vaxtının təyini.', 'Müəllim məsləhət saatlarını təyin edir, tələbə uyğun vaxtı seçib qeydiyyatdan keçir.'),
      s('bbb', 'BigBlueButton', '/mod/bigbluebuttonbn', 'Moodle daxilində canlı virtual sinif.', 'Video, ekran paylaşımı, ağ lövhə və qeydə alma ilə onlayn dərslər birbaşa kursdan keçirilir.'),
      s('zoom', 'Zoom', '/mod/zoom', 'Zoom görüşlərinin kursdan planlaşdırılması.', 'Zoom inteqrasiyası ilə dərs linki avtomatik yaradılır və təqvimə əlavə olunur.'),
      s('teams', 'Microsoft Teams', '/mod/msteams', 'Teams görüşləri və komandaları ilə inteqrasiya.', 'Kurs Microsoft Teams komandası ilə əlaqələndirilir, görüşlərə Moodle-dan qoşulmaq mümkündür.'),
      s('panopto', 'Panopto', '/blocks/panopto', 'Video mühazirələrin yazılması və yayımı.', 'Panopto mühazirələrin videoya yazılmasını, axtarışını və tələbələrin baxış statistikasını təmin edir.'),
    ],
  },
  {
    id: 'qiymetlendirme',
    number: 5,
    title: 'Qiymətləndirmə',
    subtitle: 'Assessment',
    icon: 'BarChart3',
    description: 'Jurnal, rubrikalar, bacarıqların və öyrənmə nəticələrinin qiymətləndirilməsi.',
    services: [
      s('jurnal', 'Jurnal (Gradebook)', '/grade/report/grader/index.php', 'Bütün qiymətlərin bir cədvəldə toplanması.', 'Gradebook kurs üzrə bütün fəaliyyətlərin qiymətlərini toplayır, çəki və formullarla yekun balı hesablayır.'),
      s('rubrics', 'Rubrics', '/grade/grading', 'Meyar və səviyyələr əsasında şəffaf qiymətləndirmə.', 'Rubrika hər meyar üçün səviyyələri əvvəlcədən müəyyən edir; tələbə nə üçün hansı balı aldığını aydın görür.'),
      s('marking-guide', 'Qiymətləndirmə meyarları (Marking Guide)', '/grade/grading', 'Meyarlar üzrə maksimum bal və şərhlər.', 'Marking Guide hər meyar üçün maksimal balı və müəllim şərhini birləşdirir — yazılı işlər üçün idealdır.'),
      s('competency', 'Bacarıqların qiymətləndirilməsi (Competency Assessment)', '/admin/tool/lp', 'Kompetensiyaların ölçülməsi.', 'Kurs fəaliyyətləri konkret bacarıqlarla əlaqələndirilir və tələbənin hansı bacarıqlara yiyələndiyi izlənir.'),
      s('oyrenme-plani', 'Öyrənmə planı', '/admin/tool/lp/plans.php', 'Tələbə üçün fərdi inkişaf planı.', 'Öyrənmə planı bir və ya bir neçə kompetensiya çərçivəsini əhatə edir və tələbənin irəliləyişini göstərir.'),
      s('outcomes', 'Outcomes', '/grade/edit/outcome', 'Öyrənmə nəticələrinin qiymətləndirilməsi.', 'Outcomes fəaliyyətlərə əlavə edilərək sillabusdakı öyrənmə nəticələrinə nail olunmasını ölçür.'),
      s('quiz-bank', 'Quiz Bank', '/mod/quiz', 'Hazır imtahanların təkrar istifadəsi.', 'Əvvəl hazırlanmış imtahanlar müxtəlif kurs və qruplarda yenidən istifadə oluna bilər.'),
      s('question-bank', 'Question Bank', '/question/edit.php', 'Sualların kateqoriyalar üzrə mərkəzləşdirilmiş bazası.', 'Sual bankında suallar mövzu və çətinlik dərəcəsinə görə saxlanır və imtahanlara təsadüfi seçilə bilər.'),
    ],
  },
  {
    id: 'imtahan-modulu',
    number: 6,
    title: 'İmtahan modulu',
    subtitle: 'Exams',
    icon: 'ShieldCheck',
    description: 'Onlayn test, vaxt limiti, təhlükəsiz brauzer və proktorinq.',
    services: [
      s('onlayn-testler', 'Onlayn testlər', '/mod/quiz/view.php', 'İnternet üzərindən test imtahanı.', 'Tələbə imtahana kompüter və ya planşetdən qoşulur, cavablar avtomatik yoxlanılır və nəticə dərhal görünə bilər.'),
      s('random-suallar', 'Random suallar', '/mod/quiz/edit.php', 'Hər tələbəyə fərqli sual dəsti.', 'Suallar sual bankından təsadüfi seçilir və variantların ardıcıllığı qarışdırılır — köçürmə ehtimalı azalır.'),
      s('vaxt-limiti', 'Vaxt limiti', '/mod/quiz/edit.php', 'İmtahan müddətinin məhdudlaşdırılması.', 'Vaxt bitdikdə cəhd avtomatik təhvil verilir. Xüsusi ehtiyacı olan tələbələrə əlavə vaxt verilə bilər.'),
      s('seb', 'Safe Exam Browser', '/mod/quiz/accessrule/seb', 'Kompüteri imtahan rejiminə keçirən təhlükəsiz brauzer.', 'SEB imtahan zamanı digər proqramlara və saytlara keçidi bloklayır.'),
      s('proctoring', 'Proctoring inteqrasiyaları', '/mod/quiz', 'Kamera ilə uzaqdan imtahan nəzarəti.', 'Proktorinq xidmətləri tələbənin kamera və ekranını izləyərək şübhəli davranışları qeyd edir.'),
      s('imtahan-statistikasi', 'İmtahan statistikası', '/mod/quiz/report.php', 'Sualların çətinlik və ayırdetmə göstəriciləri.', 'Statistika hesabatı hansı sualların çox çətin və ya çox asan olduğunu göstərir və sual bankının keyfiyyətini artırmağa kömək edir.'),
    ],
  },
  {
    id: 'mezmun-yaradilmasi',
    number: 7,
    title: 'Məzmun yaradılması',
    subtitle: 'Content Authoring',
    icon: 'PenTool',
    description: 'İnteraktiv məzmun, video, audio və redaktor alətləri.',
    services: [
      s('h5p', 'H5P', '/contentbank', 'İnteraktiv məzmun yaratma aləti.', '50-dən çox məzmun tipi: interaktiv video, kəsişən sözlər, yaddaş kartları, təqdimatlar və s.'),
      s('scorm', 'SCORM', '/mod/scorm', 'Standart e-təlim paketləri.', 'Articulate, iSpring kimi alətlərlə hazırlanan kurslar SCORM formatında Moodle-a yüklənir.'),
      s('ims-mezmun', 'IMS', '/mod/imscp', 'IMS standartında məzmun.', 'IMS Common Cartridge və Content Package formatları sistemlər arasında məzmun mübadiləsini təmin edir.'),
      s('lti', 'LTI', '/mod/lti', 'Xarici təlim alətlərinin qoşulması.', 'LTI standartı ilə xarici laboratoriyalar, simulyatorlar və nəşriyyat platformaları kursa inteqrasiya olunur.'),
      s('video-yerlesdirme', 'Video yerləşdirmə', '/lib/editor', 'YouTube, Vimeo və ya fayl videolarının kursa əlavəsi.', 'Video birbaşa redaktordan yerləşdirilir və tələbə onu kursdan çıxmadan izləyir.'),
      s('audio', 'Audio', '/lib/editor', 'Audio faylların və səs yazılarının əlavəsi.', 'Müəllim redaktordan birbaşa səs yaza və ya podkast faylları yerləşdirə bilər — dil kursları üçün xüsusilə faydalıdır.'),
      s('pdf', 'PDF', '/mod/resource', 'PDF sənədlərinin brauzerdə göstərilməsi.', 'PDF faylları yüklənmədən birbaşa kurs səhifəsində açıla bilər; tapşırıqlarda PDF üzərində annotasiya mümkündür.'),
      s('html-editor', 'HTML Editor', '/lib/editor', 'Məzmunun HTML kodu ilə redaktəsi.', 'Təcrübəli istifadəçilər üçün HTML rejimi məzmunun görünüşünü tam idarə etməyə imkan verir.'),
      s('tinymce', 'TinyMCE', '/lib/editor/tiny', 'Müasir vizual mətn redaktoru.', 'TinyMCE Moodle-un standart redaktorudur: cədvəl, düstur, şəkil və media əlavə etmək asandır.'),
      s('atto', 'Atto Editor', '/lib/editor/atto', 'Klassik Moodle redaktoru.', 'Atto əvvəlki versiyalarda standart redaktor olub; sadə interfeysi ilə hələ də istifadə oluna bilər.'),
    ],
  },
  {
    id: 'kommunikasiya',
    number: 8,
    title: 'Kommunikasiya',
    subtitle: 'Communication',
    icon: 'MessagesSquare',
    description: 'Mesajlaşma, bildirişlər, elanlar və təqvim.',
    services: [
      s('forumlar', 'Forumlar', '/mod/forum', 'Kurs üzrə müzakirə lövhələri.', 'Forumlar mövzular üzrə müzakirəni təşkil edir; yeni yazılar e-poçt və bildirişlə istifadəçilərə çatdırılır.'),
      s('sexsi-mesajlar', 'Şəxsi mesajlar', '/message/index.php', 'Tələbə və müəllim arasında birbaşa yazışma.', 'Daxili mesajlaşma sistemi ilə kursdaşlar və müəllimlərlə fərdi və ya qrup yazışması aparılır.'),
      s('bildirisler', 'Bildirişlər', '/message/output/popup/notifications.php', 'Son tarixlər və qiymətlər haqqında xəbərdarlıqlar.', 'Yeni qiymət, yaxınlaşan son tarix və ya forum cavabı haqqında sistem avtomatik bildiriş göndərir.'),
      s('e-mail', 'E-mail', '/admin/settings.php?section=outgoingmailconfig', 'Bildirişlərin e-poçta göndərilməsi.', 'Vacib bildirişlər universitet e-poçt ünvanına da göndərilir.'),
      s('push', 'Push Notification', '/admin/message.php', 'Mobil cihaza ani bildiriş.', 'Moodle Mobile tətbiqi quraşdırılıbsa, bildirişlər telefona push şəklində gəlir.'),
      s('kalendar', 'Kalendar', '/calendar/view.php', 'Dərslər, son tarixlər və tədbirlər təqvimi.', 'Təqvim bütün kurslardakı son tarixləri bir yerdə göstərir və şəxsi tədbirlər əlavə etməyə imkan verir.'),
      s('elanlar', 'Elanlar', '/mod/forum', 'Müəllimdən bütün kursa rəsmi elanlar.', 'Elanlar forumunda yalnız müəllim yazır və hər yazı bütün tələbələrə avtomatik göndərilir.'),
    ],
  },
  {
    id: 'analitika',
    number: 9,
    title: 'Analitika və hesabatlar',
    subtitle: 'Analytics & Reports',
    icon: 'LineChart',
    description: 'Öyrənmə analitikası, aktivlik və nəticə hesabatları.',
    services: [
      s('oyrenme-analizi', 'Öyrənmə analizi', '/analytics', 'Riskli tələbələrin proqnozlaşdırılması.', 'Learning Analytics modelləri aktivliyə əsasən kursu tamamlamaq riski olan tələbələri müəyyən edir və müəllimə xəbərdarlıq edir.'),
      s('kursun-izlenmesi', 'Kursun izlənməsi', '/report/completion', 'Tələbələrin fəaliyyətləri tamamlama vəziyyəti.', 'Completion tracking hər tələbənin hansı materialları açdığını və hansı tapşırıqları bitirdiyini göstərir.'),
      s('aktivlik-hesabati', 'Aktivlik hesabatı', '/report/outline', 'Hər resursa baxış sayı.', 'Aktivlik hesabatı hansı materialların daha çox istifadə edildiyini göstərir.'),
      s('loqlar', 'Loqlar', '/report/log', 'Sistemdə bütün əməliyyatların qeydi.', 'Loqlar kimin, nə vaxt, hansı əməliyyatı etdiyini qeyd edir — mübahisəli hallarda sübut kimi istifadə olunur.'),
      s('neticeler-hesabati', 'Nəticələr haqqında hesabat', '/grade/report/overview', 'Qiymətlərin ümumi icmalı.', 'Tələbə bütün kurslar üzrə qiymətlərini, müəllim isə qrupun nəticələrini bir hesabatda görür.'),
      s('fealliq-hesabati', 'Fəallıq hesabatı', '/report/participation', 'Tələbələrin fəaliyyətlərdə iştirakı.', 'Participation report müəyyən dövrdə hər tələbənin hansı fəaliyyətlərdə iştirak etdiyini göstərir.'),
    ],
  },
  {
    id: 'sertifikatlasdirma',
    number: 10,
    title: 'Sertifikatlaşdırma',
    subtitle: 'Certification',
    icon: 'Award',
    description: 'Sertifikatlar, nişanlar və kursun tamamlanması.',
    services: [
      s('custom-certificate', 'Fərdi (Custom Certificate)', '/mod/customcert', 'UNEC dizaynında PDF sertifikat.', 'Kursu bitirən tələbəyə ad, tarix, bal və QR-kod daxil olmaqla fərdi sertifikat avtomatik verilir.'),
      s('open-badges', 'İzahlı (Open Badges)', '/badges/index.php', 'Rəqəmsal nişanlar.', 'Open Badges standartında nişanlar nailiyyəti izah edir və LinkedIn kimi platformalarda paylaşıla bilər.'),
      s('competencies-cert', 'Bacarıqlar (Competencies)', '/admin/tool/lp', 'Əldə olunmuş bacarıqların təsdiqi.', 'Tələbənin yiyələndiyi kompetensiyalar sertifikat və ya nişanla rəsmi olaraq təsdiq edilir.'),
      s('course-completion', 'Kursun tamamlanması haqqında (Course Completion)', '/course/completion.php', 'Kursun bitmə şərtlərinin təyini.', 'Müəllim kursun tamamlanma şərtlərini (bütün tapşırıqlar, minimum bal və s.) müəyyən edir.'),
      s('learning-plans', 'Öyrənmə planı ilə (Learning Plans)', '/admin/tool/lp/plans.php', 'Plan üzrə nailiyyətin sertifikatlaşdırılması.', 'Öyrənmə planı tamamlandıqda tələbəyə müvafiq sertifikat və ya nişan verilir.'),
    ],
  },
  {
    id: 'mobil-destek',
    number: 11,
    title: 'Mobil dəstək',
    subtitle: 'Mobile',
    icon: 'Smartphone',
    description: 'Moodle Mobile tətbiqi və oflayn öyrənmə.',
    services: [
      s('moodle-mobile', 'Moodle Mobile', '/admin/tool/mobile', 'Android və iOS üçün rəsmi tətbiq.', 'Tətbiqdə sayt ünvanı olaraq universitetin Moodle domenini daxil edin və eyni istifadəçi adı ilə daxil olun.'),
      s('mobile-push', 'Bildiriş (Push Notification)', '/admin/tool/mobile', 'Telefona ani bildirişlər.', 'Yeni qiymət, mesaj və son tarix xatırlatmaları telefonunuza dərhal çatır.'),
      s('offline', 'Offline Learning', '/admin/tool/mobile', 'İnternetsiz öyrənmə imkanı.', 'Materialları əvvəlcədən yükləyib internet olmadan oxumaq mümkündür; nəticələr bağlantı bərpa olunanda sinxronlaşır.'),
    ],
  },
  {
    id: 'inteqrasiyalar',
    number: 12,
    title: 'İnteqrasiyalar',
    subtitle: 'Integrations',
    icon: 'Plug',
    description: 'API, kimlik sistemləri, ofis paketləri və xarici xidmətlər.',
    services: [
      s('rest-api', 'REST API', '/webservice/rest/server.php', 'Xarici sistemlərlə məlumat mübadiləsi.', 'REST API vasitəsilə universitetin digər informasiya sistemləri Moodle ilə avtomatik məlumat mübadiləsi aparır.'),
      s('web-services', 'Web Services', '/admin/settings.php?section=webservicesoverview', 'Veb-xidmətlərin idarə olunması.', 'Web Services tokenlər və icazələr əsasında xarici tətbiqlərə təhlükəsiz giriş verir.'),
      s('lti-provider', 'LTI Provider/Consumer', '/enrol/lti', 'Kursları başqa platformalarla paylaşmaq.', 'Moodle həm xarici alətləri qəbul edir (consumer), həm də öz kurslarını başqa sistemlərə təqdim edir (provider).'),
      s('scorm-int', 'SCORM', '/mod/scorm', 'SCORM standartı ilə uyğunluq.', 'Müxtəlif məzmun hazırlama alətlərindən gələn SCORM paketləri problemsiz işləyir.'),
      s('ldap', 'LDAP', '/auth/ldap', 'Universitet kataloqu ilə giriş.', 'LDAP istifadəçilərin universitetin mərkəzi hesabları ilə daxil olmasını təmin edir.'),
      s('active-directory', 'Active Directory', '/auth/ldap', 'Microsoft AD ilə inteqrasiya.', 'Active Directory hesabları Moodle ilə sinxronlaşdırılır — bir parol, bütün sistemlər.'),
      s('saml', 'SAML', '/auth/saml2', 'Vahid giriş (SSO).', 'SAML ilə istifadəçi universitetin portalında bir dəfə daxil olur və Moodle-a təkrar parol yazmadan keçir.'),
      s('oauth2', 'OAuth2', '/admin/tool/oauth2', 'Google və Microsoft hesabı ilə giriş.', 'OAuth2 xidmətləri vasitəsilə korporativ Google və ya Microsoft hesabı ilə daxil olmaq mümkündür.'),
      s('google-workspace', 'Google Workspace', '/repository/googledocs', 'Google Drive və Docs ilə iş.', 'Faylları birbaşa Google Drive-dan seçmək və Google Docs sənədlərini tapşırıq kimi təhvil vermək olar.'),
      s('m365', 'Microsoft 365', '/local/o365', 'OneDrive, Teams və Outlook inteqrasiyası.', 'Microsoft 365 inteqrasiyası təqvim, fayllar və Teams görüşlərini Moodle ilə birləşdirir.'),
      s('zoom-int', 'Zoom', '/mod/zoom', 'Onlayn görüş platforması.', 'Zoom görüşləri kurs təqvimi ilə sinxronlaşır, qeydlər kursda paylaşılır.'),
      s('bbb-int', 'BigBlueButton', '/mod/bigbluebuttonbn', 'Açıq mənbəli virtual sinif.', 'BigBlueButton Moodle-a daxili inteqrasiya olunub, əlavə hesab tələb etmir.'),
      s('panopto-int', 'Panopto', '/blocks/panopto', 'Video idarəetmə sistemi.', 'Panopto mühazirə videolarını kurslarla avtomatik əlaqələndirir.'),
      s('turnitin', 'Turnitin', '/plagiarism/turnitin', 'Plagiat yoxlaması.', 'Tələbə işləri təhvil verilərkən avtomatik orijinallıq yoxlamasından keçir və müəllim oxşarlıq hesabatını görür.'),
      s('seb-int', 'Safe Exam Browser', '/mod/quiz/accessrule/seb', 'İmtahan təhlükəsizliyi.', 'SEB konfiqurasiyası birbaşa imtahan ayarlarından idarə olunur.'),
    ],
  },
  {
    id: 'administrator',
    number: 13,
    title: 'Administrator modulları',
    subtitle: 'Administration',
    icon: 'Settings',
    description: 'Plaginlər, temalar, dil paketləri, təhlükəsizlik və performans.',
    services: [
      s('plugin-management', 'Plugin Management', '/admin/plugins.php', 'Plaginlərin quraşdırılması və yenilənməsi.', 'Admin paneldən plaginlər quraşdırılır, yenilənir və ya deaktiv edilir.'),
      s('theme-management', 'Theme Management', '/admin/themeselector.php', 'Platformanın görünüşü.', 'UNEC korporativ rəngləri və loqosu ilə uyğunlaşdırılmış tema seçilir və tənzimlənir.'),
      s('language-packs', 'Language Packs', '/admin/tool/langimport', 'Azərbaycan, ingilis, rus dilləri.', 'Dil paketləri interfeysin müxtəlif dillərdə göstərilməsini təmin edir.'),
      s('cron', 'Cron', '/admin/cron.php', 'Arxa plan prosesləri.', 'Cron bildirişlərin göndərilməsi, hesabatların yaradılması kimi işləri müntəzəm icra edir.'),
      s('cache', 'Cache', '/cache/admin.php', 'Sürətin artırılması üçün keşləmə.', 'Keş sistemi tez-tez istifadə olunan məlumatları yaddaşda saxlayaraq səhifələrin sürətlə açılmasını təmin edir.'),
      s('scheduled-tasks', 'Scheduled Tasks', '/admin/tool/task/scheduledtasks.php', 'Planlaşdırılmış tapşırıqlar.', 'Hər bir arxa plan tapşırığının nə vaxt işə düşəcəyi buradan idarə olunur.'),
      s('security', 'Security', '/admin/category.php?category=security', 'Təhlükəsizlik parametrləri.', 'Parol siyasəti, sessiya müddəti, HTTP təhlükəsizlik başlıqları buradan tənzimlənir.'),
      s('gdpr', 'GDPR', '/admin/tool/dataprivacy', 'Şəxsi məlumatların qorunması.', 'Data Privacy aləti istifadəçilərin məlumat sorğularını və silinmə tələblərini idarə edir.'),
      s('backup-admin', 'Backup', '/admin/settings.php?section=automated', 'Avtomatik ehtiyat nüsxələr.', 'Bütün kursların avtomatik ehtiyat nüsxəsi müəyyən cədvəl üzrə yaradılır.'),
      s('restore-admin', 'Restore', '/backup/restorefile.php', 'Sistem səviyyəsində bərpa.', 'Admin istənilən kursu və ya kateqoriyanı ehtiyat nüsxədən bərpa edə bilər.'),
      s('monitoring', 'Monitoring', '/admin/tool/monitor', 'Hadisələrin izlənməsi.', 'Event monitoring müəyyən hadisələr baş verdikdə məsul şəxslərə xəbərdarlıq göndərir.'),
      s('performance', 'Performance', '/admin/category.php?category=server', 'Server performansının optimallaşdırılması.', 'Server və verilənlər bazası parametrləri yüksək yüklənmədə sabit işi təmin etmək üçün tənzimlənir.'),
    ],
  },
  {
    id: 'tehlukesizlik',
    number: 14,
    title: 'Təhlükəsizlik',
    subtitle: 'Security',
    icon: 'Lock',
    description: 'İki faktorlu autentifikasiya, giriş siyasətləri və audit.',
    services: [
      s('2fa', 'İki faktorlu autentifikasiya (plugin)', '/admin/tool/mfa', 'Parol + telefon kodu ilə giriş.', 'MFA aktiv olduqda girişdə parolla yanaşı autentifikator tətbiqindən və ya SMS-dən kod tələb olunur.'),
      s('captcha', 'CAPTCHA', '/admin/settings.php?section=manageauths', 'Bot hücumlarından qorunma.', 'CAPTCHA avtomatlaşdırılmış qeydiyyat və giriş cəhdlərinin qarşısını alır.'),
      s('login-siyaseti', 'Login siyasətləri', '/admin/settings.php?section=sitepolicies', 'Parol tələbləri və hesab bloklanması.', 'Uğursuz cəhdlərdən sonra hesabın müvəqqəti bloklanması və güclü parol tələbləri müəyyən edilir.'),
      s('audit', 'Audit logları', '/report/log', 'Təhlükəsizlik hadisələrinin qeydi.', 'Bütün kritik əməliyyatlar audit loglarında saxlanılır və yoxlama üçün ixrac oluna bilər.'),
      s('ip', 'IP məhdudiyyətləri', '/admin/settings.php?section=ipblocker', 'Girişin IP ünvana görə məhdudlaşdırılması.', 'Məsələn, imtahanlara yalnız universitet kompüter siniflərindən giriş icazəsi verilə bilər.'),
      s('sifreleme', 'Məlumatların şifrələnməsi', '/admin/settings.php?section=http', 'HTTPS və şifrələnmiş saxlanma.', 'Bütün trafik HTTPS ilə şifrələnir, parollar isə müasir heş alqoritmləri ilə saxlanılır.'),
    ],
  },
  {
    id: 'plugin-marketplace',
    number: 15,
    title: 'Plugin Marketplace',
    subtitle: '2 000+ plagin',
    icon: 'Puzzle',
    description:
      "Moodle-un rəsmi kataloqunda 2 000-dən çox plagin mövcuddur. Ən məşhur əlavələr aşağıda göstərilib.",
    services: [
      s('mp-bbb', 'BigBlueButton', '/mod/bigbluebuttonbn', 'Virtual sinif.', 'Canlı onlayn dərslər üçün ən populyar açıq mənbəli həll.'),
      s('mp-zoom', 'Zoom', '/mod/zoom', 'Video konfrans.', 'Zoom görüşlərinin Moodle kurslarından idarə olunması.'),
      s('mp-panopto', 'Panopto', '/blocks/panopto', 'Video mühazirələr.', 'Mühazirələrin yazılması, redaktəsi və yayımı.'),
      s('mp-attendance', 'Attendance', '/mod/attendance', 'Davamiyyət.', 'Dərslərdə iştirakın elektron qeydiyyatı və hesabatları.'),
      s('mp-scheduler', 'Scheduler', '/mod/scheduler', 'Görüş planlaması.', 'Müəllim–tələbə fərdi görüşlərinin təşkili.'),
      s('mp-customcert', 'Custom Certificate', '/mod/customcert', 'Sertifikatlar.', 'Fərdi dizaynlı PDF sertifikatların avtomatik verilməsi.'),
      s('mp-reports', 'Configurable Reports', '/blocks/configurable_reports', 'Fərdi hesabatlar.', 'SQL və vizual qurucu ilə istənilən hesabatın hazırlanması.'),
      s('mp-turnitin', 'Turnitin', '/plagiarism/turnitin', 'Plagiat yoxlaması.', 'Yazılı işlərin orijinallığının yoxlanılması.'),
      s('mp-seb', 'Safe Exam Browser', '/mod/quiz/accessrule/seb', 'Təhlükəsiz imtahan.', 'İmtahan zamanı kompüterin kilidlənməsi.'),
      s('mp-m365', 'Microsoft 365 Integration', '/local/o365', 'Microsoft 365.', 'Teams, OneDrive və Outlook ilə tam inteqrasiya.'),
      s('mp-gdrive', 'Google Drive Repository', '/repository/googledocs', 'Google Drive.', 'Faylların birbaşa Google Drive-dan əlavə edilməsi.'),
      s('mp-nextcloud', 'Nextcloud Repository', '/repository/nextcloud', 'Nextcloud.', 'Universitetin öz bulud yaddaşından faylların istifadəsi.'),
      s('mp-jitsi', 'Jitsi Meet', '/mod/jitsi', 'Açıq video görüş.', 'Quraşdırma tələb etməyən sürətli video görüşlər.'),
      s('mp-openai', 'OpenAI Integration', '/ai', 'Süni intellekt köməkçisi.', 'Aİ əsaslı mətn yaratma, xülasə və sual hazırlama imkanları — müəllim və tələbələr üçün köməkçi.'),
    ],
  },
];

/* ---------- Video və slayd nümunələri (demo) ---------- */
const slideDeck = (title, items) => ({ title, type: 'inline', items });

const extras = {
  autentifikasiya: {
    video: DEMO_VIDEO,
    slides: slideDeck('Sistemə necə daxil olmalı?', [
      { title: '1. Sayta keçin', text: `Brauzerdə ${PLATFORM_DOMAIN} ünvanını açın.` },
      { title: '2. Məlumatları daxil edin', text: 'Universitet tərəfindən verilmiş istifadəçi adı və parolu yazın.' },
      { title: '3. "Hesaba giriş"', text: 'Düyməni basın. Parolu unutmusunuzsa, "Parolu unutmusunuz?" keçidindən istifadə edin.' },
      { title: '4. Profil', text: 'İlk girişdən sonra profil şəklinizi və əlaqə məlumatlarınızı yeniləyin.' },
    ]),
  },
  tapsiriq: {
    video: DEMO_VIDEO,
    slides: slideDeck('Tapşırığın təhvil verilməsi', [
      { title: 'Kursa daxil olun', text: 'Kurs səhifəsində "Tapşırıq" ikonunu tapın.' },
      { title: 'Faylı əlavə edin', text: '"Təhvil ver" düyməsini basıb faylı sürükləyin və ya seçin.' },
      { title: 'Yadda saxlayın', text: '"Yadda saxla" basın. Status "Qiymətləndirmə üçün təhvil verilib" olmalıdır.' },
      { title: 'Rəyi izləyin', text: 'Müəllim qiymət verdikdən sonra bildiriş alacaqsınız.' },
    ]),
  },
  imtahan: {
    slides: slideDeck('Onlayn imtahan qaydaları', [
      { title: 'Hazırlıq', text: 'Sabit internet bağlantısı və tam şarjlı cihaz təmin edin.' },
      { title: 'Başlama', text: '"İmtahana başla" düyməsini basdıqdan sonra vaxt sayğacı işə düşür.' },
      { title: 'Naviqasiya', text: 'Sağ paneldən suallar arasında keçid edə bilərsiniz.' },
      { title: 'Bitirmə', text: '"Bitir və təhvil ver" düyməsini basmağı unutmayın.' },
    ]),
  },
  bbb: { video: DEMO_VIDEO },
  'moodle-mobile': {
    video: DEMO_VIDEO,
    slides: slideDeck('Mobil tətbiqin quraşdırılması', [
      { title: 'Yükləyin', text: 'Google Play və ya App Store-dan "Moodle" tətbiqini yükləyin.' },
      { title: 'Saytı göstərin', text: `Sayt ünvanı sahəsinə ${PLATFORM_DOMAIN} yazın.` },
      { title: 'Daxil olun', text: 'Saytdakı eyni istifadəçi adı və parolla daxil olun.' },
    ]),
  },
  jurnal: {
    slides: slideDeck('Jurnalda qiymətlərə baxış', [
      { title: 'Kurs menyusu', text: 'Kurs daxilində "Qiymətlər" bölməsini açın.' },
      { title: 'İstifadəçi hesabatı', text: 'Hər fəaliyyət üzrə balınızı və müəllim rəyini görəcəksiniz.' },
      { title: 'Yekun bal', text: 'Cədvəlin sonunda kurs üzrə ümumi nəticə göstərilir.' },
    ]),
  },
  h5p: { video: DEMO_VIDEO },
  'mp-openai': {
    slides: slideDeck('Aİ köməkçisi ilə iş', [
      { title: 'Nə edir?', text: 'Mətnin xülasəsi, sual nümunələri və izahların hazırlanması.' },
      { title: 'Akademik dürüstlük', text: 'Aİ cavablarını mənbə kimi deyil, köməkçi vasitə kimi istifadə edin.' },
      { title: 'Məxfilik', text: 'Şəxsi və həssas məlumatları Aİ alətinə daxil etməyin.' },
    ]),
  },
};

categories.forEach((c) =>
  c.services.forEach((svc) => {
    if (extras[svc.id]) Object.assign(svc, extras[svc.id]);
  })
);

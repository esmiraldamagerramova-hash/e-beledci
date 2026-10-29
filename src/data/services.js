// Nümunə məlumatlar. Domen yalnız rəsmi və təsdiqlənmiş olduqda göstərilir, əks halda null.
// Video və fayllar /public/media qovluğundakı NÜMUNƏ fayllardır — real materiallarla əvəz olunmalıdır.

const DEMO_VIDEO = { src: '/media/numune-video.mp4', type: 'mp4', title: 'Nümunə video' };
const DEMO_PDF = { name: 'Nümunə təlimat', type: 'pdf', url: '/media/numune-telimat.pdf', size: '23 KB' };
const DEMO_PPTX = { name: 'Nümunə təqdimat', type: 'pptx', url: '/media/numune-slaydlar.pptx', size: '29 KB' };
const DEMO_DOCX = { name: 'Nümunə sənəd', type: 'docx', url: '/media/numune-sened.docx', size: '36 KB' };

export const categories = [
  { id: 'tedris', name: 'Tədris platforması', icon: 'GraduationCap', description: 'Moodle əsaslı tədris, kurslar və tapşırıqlar' },
  { id: 'qiymetlendirme', name: 'Qiymətləndirmə', icon: 'ClipboardCheck', description: 'Testlər, imtahanlar və qiymət jurnalı' },
  { id: 'unsiyyet', name: 'Onlayn dərs və ünsiyyət', icon: 'Video', description: 'Video dərslər və onlayn görüşlər' },
  { id: 'hesab', name: 'Hesab və təhlükəsizlik', icon: 'UserCog', description: 'Giriş, parol və hesab ayarları' },
  { id: 'resurslar', name: 'Məlumat resursları', icon: 'Library', description: 'Rəsmi saytlar və sənədlər' },
  { id: 'dovlet', name: 'Dövlət xidmətləri', icon: 'Landmark', description: 'Təhsillə bağlı dövlət portalları' },
];

export const services = [
  {
    id: 'unec-sayt',
    name: 'UNEC rəsmi saytı',
    categoryId: 'resurslar',
    domain: { url: 'https://unec.edu.az', label: 'unec.edu.az' },
    brief: 'Universitet haqqında rəsmi xəbərlər, elanlar, fakültələr və əlaqə məlumatları.',
    about: [
      'Azərbaycan Dövlət İqtisad Universitetinin rəsmi saytında universitetin strukturu, fakültə və kafedralar, qəbul, elanlar və xəbərlər dərc olunur.',
      'Elektron xidmətlərlə bağlı rəsmi elanları və yenilikləri ilk növbədə bu saytda izləmək tövsiyə olunur.',
    ],
    steps: ['Brauzerdə unec.edu.az ünvanını açın.', 'Yuxarı menyudan lazım olan bölməni seçin.', 'Elanlar bölməsində son yenilikləri izləyin.'],
    featured: true,
  },
  {
    id: 'moodle-platforma',
    name: 'Moodle tədris platforması',
    categoryId: 'tedris',
    domain: null,
    brief: 'Kurslar, mühazirə materialları, tapşırıqlar və testlər üçün əsas elektron tədris mühiti.',
    about: [
      'Moodle — dünyada geniş istifadə olunan açıq mənbəli tədris idarəetmə sistemidir. Platformada müəllim kurs materiallarını yerləşdirir, tapşırıq və testlər təşkil edir, tələbə isə materiallarla tanış olur və işlərini təhvil verir.',
      'Platformaya daxil olmaq üçün universitet tərəfindən verilmiş istifadəçi adı və paroldan istifadə olunur.',
    ],
    steps: ['Universitetin tədris platformasının ünvanını açın.', 'İstifadəçi adı və parolunuzu daxil edin.', '«Mənim kurslarım» bölməsindən kursu seçin.'],
    video: DEMO_VIDEO,
    slides: [DEMO_PPTX, DEMO_PDF],
    materials: [DEMO_DOCX],
    featured: true,
  },
  {
    id: 'kurslara-qosulma',
    name: 'Kurslara qoşulma',
    categoryId: 'tedris',
    domain: null,
    brief: 'Tələbənin kurslara avtomatik yazılması və açıq kurslara özünün qoşulması.',
    about: [
      'Tədris planına uyğun kurslara tələbələr avtomatik yazılır. Bundan əlavə, açıq elan edilmiş kurslara tələbə özü qoşula bilər.',
      'Kursa qoşulduqdan sonra o, «Mənim kurslarım» siyahısında görünür.',
    ],
    steps: ['Platformada «Bütün kurslar» bölməsini açın.', 'Lazım olan kursu tapın.', '«Məni bu kursa yaz» düyməsini basın.'],
    slides: [DEMO_PDF],
  },
  {
    id: 'tapsiriqlar',
    name: 'Tapşırıqların təhvil verilməsi',
    categoryId: 'tedris',
    domain: null,
    brief: 'Ev tapşırıqlarının, referat və layihələrin fayl şəklində yüklənməsi.',
    about: [
      'Tapşırıq modulu vasitəsilə tələbə işini müəyyən olunmuş son tarixədək fayl və ya mətn şəklində təhvil verir.',
      'Müəllim işi yoxlayır, qiymət və şərh yazır; nəticə tələbənin qiymət jurnalında görünür.',
    ],
    steps: ['Kursda tapşırığı açın.', '«Təhvil ver» düyməsini basın və faylı yükləyin.', '«Yadda saxla» düyməsi ilə təsdiqləyin.'],
    video: DEMO_VIDEO,
    materials: [DEMO_DOCX, DEMO_PDF],
    featured: true,
  },
  {
    id: 'onlayn-test',
    name: 'Onlayn testlər və imtahanlar',
    categoryId: 'qiymetlendirme',
    domain: null,
    brief: 'Vaxt limiti olan onlayn test və imtahanların keçirilməsi.',
    about: [
      'Test modulu müxtəlif sual növlərini (çoxseçimli, doğru/yanlış, qısa cavab) dəstəkləyir. Testin başlama və bitmə vaxtı müəllim tərəfindən təyin olunur.',
      'Test başladıqdan sonra səhifəni bağlamamaq və internet bağlantısının sabit olmasına diqqət etmək lazımdır.',
    ],
    steps: ['Kursda testi açın.', '«Testə başla» düyməsini basın.', 'Sualları cavablandırın və «Bitir» düyməsi ilə təsdiqləyin.'],
    slides: [DEMO_PPTX],
    featured: true,
  },
  {
    id: 'qiymet-jurnali',
    name: 'Qiymət jurnalı',
    categoryId: 'qiymetlendirme',
    domain: null,
    brief: 'Bütün tapşırıq və testlər üzrə qiymətlərin bir yerdə izlənməsi.',
    about: [
      'Qiymət jurnalında hər kurs üzrə tapşırıq, test və digər fəaliyyətlərin nəticələri, eləcə də müəllimin şərhləri göstərilir.',
    ],
    steps: ['Kursu açın.', 'Sol menyudan «Qiymətlər» bölməsini seçin.'],
  },
  {
    id: 'zoom',
    name: 'Zoom',
    categoryId: 'unsiyyet',
    domain: { url: 'https://zoom.us', label: 'zoom.us' },
    brief: 'Onlayn dərslər və görüşlər üçün video konfrans xidməti.',
    about: [
      'Zoom video konfrans xidmətidir. Onlayn dərsə qoşulmaq üçün müəllimin paylaşdığı keçiddən istifadə olunur.',
      'Qoşulmazdan əvvəl mikrofon və kameranın işlək olduğunu yoxlayın.',
    ],
    steps: ['Müəllimin paylaşdığı keçidi açın.', 'Adınızı və soyadınızı tam yazın.', 'Mikrofonu dərs zamanı söndürülmüş saxlayın.'],
    video: DEMO_VIDEO,
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    categoryId: 'unsiyyet',
    domain: { url: 'https://teams.microsoft.com', label: 'teams.microsoft.com' },
    brief: 'Onlayn görüşlər, çat və komanda işi üçün platforma.',
    about: [
      'Microsoft Teams vasitəsilə onlayn görüşlər keçirmək, qrup çatında yazışmaq və faylları paylaşmaq mümkündür.',
    ],
    steps: ['teams.microsoft.com ünvanını açın və ya tətbiqi quraşdırın.', 'Hesabınızla daxil olun.', 'Təqvimdən görüşü seçib «Qoşul» düyməsini basın.'],
  },
  {
    id: 'outlook',
    name: 'Outlook veb e-poçt',
    categoryId: 'hesab',
    domain: { url: 'https://outlook.office.com', label: 'outlook.office.com' },
    brief: 'Microsoft 365 hesabı ilə e-poçt və təqvimdən istifadə.',
    about: [
      'Outlook-un veb versiyası Microsoft 365 hesabı ilə e-poçt, təqvim və kontaktlardan brauzer vasitəsilə istifadə etməyə imkan verir.',
    ],
    steps: ['outlook.office.com ünvanını açın.', 'Hesab məlumatlarınızı daxil edin.'],
  },
  {
    id: 'parol-berpa',
    name: 'Parolun bərpası',
    categoryId: 'hesab',
    domain: null,
    brief: 'Unudulmuş parolun bərpası və təhlükəsiz parol seçimi.',
    about: [
      'Parolu unutduqda giriş səhifəsindəki «Parolu unutmusunuz?» keçidindən istifadə edin və ya fakültənin İT dəstək xidmətinə müraciət edin.',
      'Parolunuzu heç kimlə paylaşmayın və müntəzəm olaraq dəyişin.',
    ],
    steps: ['Giriş səhifəsində «Parolu unutmusunuz?» keçidini basın.', 'İstifadəçi adınızı və ya e-poçtunuzu daxil edin.', 'E-poçta gələn təlimata əməl edin.'],
    materials: [DEMO_PDF],
  },
  {
    id: 'moodle-mobil',
    name: 'Moodle mobil tətbiqi',
    categoryId: 'tedris',
    domain: { url: 'https://download.moodle.org/mobile/', label: 'download.moodle.org/mobile' },
    brief: 'Kurs materiallarına telefondan giriş və bildirişlər.',
    about: [
      'Rəsmi Moodle mobil tətbiqi ilə kurs materiallarını telefonda açmaq, tapşırıqları izləmək və bildirişlər almaq mümkündür.',
    ],
    steps: ['Tətbiqi rəsmi səhifədən və ya tətbiq mağazasından yükləyin.', 'Platformanın ünvanını daxil edin.', 'İstifadəçi adı və parolla daxil olun.'],
  },
  {
    id: 'moodle-docs',
    name: 'Moodle sənədləri',
    categoryId: 'resurslar',
    domain: { url: 'https://docs.moodle.org', label: 'docs.moodle.org' },
    brief: 'Moodle funksiyaları üzrə rəsmi istifadəçi sənədləri.',
    about: [
      'Moodle-un rəsmi sənədləri platformanın modulları və funksiyaları haqqında ətraflı izahatları ehtiva edir.',
    ],
    steps: ['docs.moodle.org ünvanını açın.', 'Axtarış sahəsinə maraqlandığınız modulun adını yazın.'],
  },
  {
    id: 'e-gov',
    name: 'Elektron hökumət portalı',
    categoryId: 'dovlet',
    domain: { url: 'https://www.e-gov.az', label: 'e-gov.az' },
    brief: 'Dövlət qurumlarının elektron xidmətlərinə vahid giriş.',
    about: [
      'Elektron hökumət portalı vasitəsilə müxtəlif dövlət qurumlarının elektron xidmətlərindən istifadə etmək mümkündür.',
    ],
    steps: ['e-gov.az ünvanını açın.', 'Lazım olan qurumu və xidməti seçin.', 'Təlimata uyğun olaraq daxil olun.'],
    featured: true,
  },
  {
    id: 'edu-gov',
    name: 'Elm və Təhsil Nazirliyi',
    categoryId: 'dovlet',
    domain: { url: 'https://edu.gov.az', label: 'edu.gov.az' },
    brief: 'Təhsil sahəsində rəsmi məlumatlar, normativ sənədlər və elanlar.',
    about: [
      'Nazirliyin rəsmi saytında təhsil sahəsinə dair normativ sənədlər, elanlar və xəbərlər dərc olunur.',
    ],
    steps: ['edu.gov.az ünvanını açın.', 'Lazım olan bölməni seçin.'],
  },
];

export const getService = (id) => services.find((s) => s.id === id);
export const getCategory = (id) => categories.find((c) => c.id === id);

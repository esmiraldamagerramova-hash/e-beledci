// Nümunə təlim modulları. Mətnlər bələdçinin öz izahlarıdır; video və fayllar nümunədir.
const VIDEO = '/media/numune-video.mp4';
const PDF = { name: 'Nümunə təlimat', type: 'pdf', url: '/media/numune-telimat.pdf', size: '23 KB' };
const PPTX = { name: 'Nümunə təqdimat', type: 'pptx', url: '/media/numune-slaydlar.pptx', size: '29 KB' };

export const courses = [
  {
    id: 'moodle-giris',
    title: 'Moodle platformasına giriş',
    level: 'Başlanğıc',
    icon: 'GraduationCap',
    description: 'Platformaya daxil olmaq, kurs səhifəsi ilə tanışlıq və əsas naviqasiya.',
    sections: [
      {
        title: 'Mövzu 1. Platformaya daxil olma',
        lessons: [
          { id: 'mg-1', title: 'Giriş səhifəsi və hesab məlumatları', type: 'oxu', duration: '5 dəq', content: 'Platformaya daxil olmaq üçün universitet tərəfindən verilmiş istifadəçi adı və paroldan istifadə olunur. İlk girişdən sonra parolu dəyişmək və profil məlumatlarını yoxlamaq tövsiyə olunur.' },
          { id: 'mg-2', title: 'Video: ilk giriş', type: 'video', duration: '8 san', video: VIDEO },
        ],
      },
      {
        title: 'Mövzu 2. Kurs səhifəsi',
        lessons: [
          { id: 'mg-3', title: 'Kurs bölmələri və fəaliyyətlər', type: 'oxu', duration: '7 dəq', content: 'Kurs səhifəsi mövzular üzrə bölmələrə ayrılır. Hər bölmədə mühazirə materialları, tapşırıqlar, testlər və forumlar yerləşə bilər. Tamamlanmış fəaliyyətlər yanında işarə görünür.' },
          { id: 'mg-4', title: 'Təqdimat: kurs strukturu', type: 'fayl', duration: '2 slayd', file: PPTX },
        ],
      },
    ],
  },
  {
    id: 'onlayn-dersler',
    title: 'Onlayn dərslər: Zoom və Teams',
    level: 'Başlanğıc',
    icon: 'Video',
    description: 'Onlayn dərsə qoşulma, mikrofon və kamera ayarları, davranış qaydaları.',
    sections: [
      {
        title: 'Mövzu 1. Dərsə hazırlıq',
        lessons: [
          { id: 'od-1', title: 'Texniki yoxlama', type: 'oxu', duration: '4 dəq', content: 'Dərsdən əvvəl internet bağlantısını, mikrofon və kameranın işlək olduğunu yoxlayın. Qulaqcıqdan istifadə səs keyfiyyətini yaxşılaşdırır.' },
          { id: 'od-2', title: 'Dərsə qoşulma', type: 'oxu', duration: '4 dəq', content: 'Müəllimin paylaşdığı keçidi açın, adınızı və soyadınızı tam yazın. Dərs zamanı mikrofonu söndürülmüş saxlayın və sualları çatda yazın.' },
        ],
      },
      {
        title: 'Mövzu 2. Dərs zamanı',
        lessons: [
          { id: 'od-3', title: 'Video: ekran paylaşımı', type: 'video', duration: '8 san', video: VIDEO },
        ],
      },
    ],
  },
  {
    id: 'tapsiriq-test',
    title: 'Tapşırıq və testlərlə iş',
    level: 'Orta',
    icon: 'ClipboardCheck',
    description: 'Tapşırıqların təhvil verilməsi, onlayn testlər və qiymət jurnalı.',
    sections: [
      {
        title: 'Mövzu 1. Tapşırıqlar',
        lessons: [
          { id: 'tt-1', title: 'Faylın təhvil verilməsi', type: 'oxu', duration: '6 dəq', content: 'Tapşırığı açın, «Təhvil ver» düyməsini basın, faylı yükləyin və «Yadda saxla» ilə təsdiqləyin. Son tarixə diqqət edin — gecikmiş işlər qəbul olunmaya bilər.' },
          { id: 'tt-2', title: 'Təlimat sənədi', type: 'fayl', duration: '1 səhifə', file: PDF },
        ],
      },
      {
        title: 'Mövzu 2. Onlayn testlər',
        lessons: [
          { id: 'tt-3', title: 'Testə başlamadan əvvəl', type: 'oxu', duration: '5 dəq', content: 'Testin vaxt limitini və cəhd sayını oxuyun. Test zamanı səhifəni bağlamayın və sabit internet bağlantısından istifadə edin.' },
          { id: 'tt-4', title: 'Qiymət jurnalı', type: 'oxu', duration: '3 dəq', content: 'Kursun «Qiymətlər» bölməsində bütün fəaliyyətlər üzrə nəticələr və müəllim şərhləri göstərilir.' },
        ],
      },
    ],
  },
  {
    id: 'dovlet-xidmetleri',
    title: 'Elektron dövlət xidmətləri',
    level: 'Başlanğıc',
    icon: 'Landmark',
    description: 'Təhsillə bağlı dövlət portallarından istifadə.',
    sections: [
      {
        title: 'Mövzu 1. Portallar',
        lessons: [
          { id: 'dx-1', title: 'Elektron hökumət portalı', type: 'oxu', duration: '5 dəq', content: 'e-gov.az portalı müxtəlif dövlət qurumlarının elektron xidmətlərinə vahid giriş nöqtəsidir.' },
          { id: 'dx-2', title: 'Elm və Təhsil Nazirliyi', type: 'oxu', duration: '4 dəq', content: 'edu.gov.az saytında təhsil sahəsinə dair normativ sənədlər və elanlar dərc olunur.' },
        ],
      },
    ],
  },
];

export const allLessons = (course) => course.sections.flatMap((s) => s.lessons);
export const getCourse = (id) => courses.find((c) => c.id === id);

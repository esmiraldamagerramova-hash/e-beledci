// Bələdçidəki sistemlər. Yeni sistem əlavə etmək üçün bu siyahıya yeni obyekt yazın.
// docs   — src/content qovluğundakı .md fayllar (?raw ilə mətn kimi oxunur)
// video  — /public/media qovluğundakı .mp4 və ya YouTube/Vimeo embed linki; yoxdursa boş yer göstərilir
// slides — .pptx / .pdf fayllar; yoxdursa boş yer göstərilir
import edumanMd from '../content/eduman.md?raw';
import kabinetMd from '../content/kabinet.md?raw';
import moodleMd from '../content/moodle.md?raw';

const DEMO_VIDEO = { src: '/media/numune-video.mp4', title: 'Nümunə video' };
const DEMO_PPTX = { name: 'Nümunə təqdimat', type: 'pptx', url: '/media/numune-slaydlar.pptx', size: '29 KB' };

export const systems = [
  {
    id: 'eduman',
    name: 'Eduman',
    domain: 'eduman.unec.edu.az',
    description: 'Tələbələrin idarəetmə sistemi',
    docs: [{ title: 'Eduman haqqında', md: edumanMd }],
    video: DEMO_VIDEO,
    slides: [],
  },
  {
    id: 'kabinet',
    name: 'Kabinet',
    domain: 'kabinet.unec.edu.az',
    description: 'Şəxsi kabinet',
    docs: [{ title: 'Kabinet haqqında', md: kabinetMd }],
    video: null,
    slides: [DEMO_PPTX],
  },
  {
    id: 'moodle',
    name: 'Moodle',
    domain: null,
    description: 'Tədrisin idarəedilməsi sistemi (LMS)',
    docs: [{ title: 'Moodle platformasının funksional modulları', md: moodleMd }],
    video: null,
    slides: [],
  },
];

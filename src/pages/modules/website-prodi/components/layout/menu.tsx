import { MdBook, MdBusiness, MdDashboard, MdInfo, MdQuestionAnswer } from 'react-icons/md'
import { FaGraduationCap, FaImage } from 'react-icons/fa'
import { PiCertificateFill } from 'react-icons/pi'

const baseDomain = '/modules/website-prodi'

export const MENULISTPRODI = [
  {
    id: 1,
    name: 'Beranda',
    path: `${baseDomain}/dashboard`,
    icon: <MdDashboard className={'size-5'} />,
  },
  {
    id: 2,
    name: 'Data Prodi',
    path: `${baseDomain}/data-prodi`,
    icon: <MdBusiness className={'size-5'} />,
  },
  {
    id: 3,
    name: 'Profil',
    path: `${baseDomain}/profile`,
    icon: <FaGraduationCap className={'size-5'} />,
  },
  {
    id: 4,
    name: 'Konten Publik',
    path: `${baseDomain}/public-content`,
    icon: <MdInfo className={'size-5'} />,
    child: [
      {
        id: 41,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
      {
        id: 42,
        name: 'Pengumuman',
        path: `${baseDomain}/public-content/announcement`,
      },
      {
        id: 43,
        name: 'Agenda',
        path: `${baseDomain}/public-content/agenda`,
      },
      {
        id: 44,
        name: 'Promosi',
        path: `${baseDomain}/public-content/promotion`,
      },
      {
        id: 45,
        name: 'Download',
        path: `${baseDomain}/public-content/download`,
      },
    ],
  },
  {
    id: 5,
    name: 'Akreditasi',
    path: `${baseDomain}/accreditation`,
    icon: <PiCertificateFill className={'size-5'} />,
  },
  {
    id: 6,
    name: 'Kurikulum',
    path: `${baseDomain}/curriculum`,
    icon: <MdBook className={'size-5'} />,
  },
  {
    id: 7,
    name: 'Galeri',
    path: `${baseDomain}/gallery`,
    icon: <FaImage className={'size-5'} />,
    child: [
      {
        id: 71,
        name: 'Foto',
        path: `${baseDomain}/gallery/photo`,
      },
      {
        id: 72,
        name: 'Video',
        path: `${baseDomain}/gallery/video`,
      },
    ],
  },
  {
    id: 8,
    name: 'Pertayaan',
    icon: <MdQuestionAnswer className={'size-5'} />,
    path: `${baseDomain}/question`,
    child: [
      {
        id: 81,
        name: 'Kontak Masuk',
        path: `${baseDomain}/question/inbox`,
      },
      {
        id: 82,
        name: 'F.A.Q',
        path: `${baseDomain}/question/faq`,
      },
      {
        id: 83,
        name: 'Pendaftaran',
        path: `${baseDomain}/question/registration`,
      },
    ],
  },
]

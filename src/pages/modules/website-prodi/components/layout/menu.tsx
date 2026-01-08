import { MdDashboard, MdInfo, MdQuestionAnswer } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'

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
    name: 'Profil',
    path: `${baseDomain}/profile`,
    icon: <FaGraduationCap className={'size-5'} />,
  },
  {
    id: 3,
    name: 'Konten Publik',
    path: `${baseDomain}/public-content`,
    icon: <MdInfo className={'size-5'} />,
    child: [
      {
        id: 21,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
      {
        id: 22,
        name: 'Pengumuman',
        path: `${baseDomain}/public-content/announcement`,
      },
      {
        id: 23,
        name: 'Agenda',
        path: `${baseDomain}/public-content/agenda`,
      },
      {
        id: 24,
        name: 'Promosi',
        path: `${baseDomain}/public-content/promotion`,
      },
      {
        id: 25,
        name: 'Download',
        path: `${baseDomain}/public-content/download`,
      },
    ],
  },
  {
    id: 7,
    name: 'Pertayaan',
    icon: <MdQuestionAnswer className={'size-5'} />,
    path: `${baseDomain}/question`,
    child: [
      {
        id: 71,
        name: 'Kontak Masuk',
        path: `${baseDomain}/question/inbox`,
      },
      {
        id: 72,
        name: 'F.A.Q',
        path: `${baseDomain}/question/faq`,
      },
      {
        id: 73,
        name: 'Pendaftaran',
        path: `${baseDomain}/question/registration`,
      },
    ],
  },
]

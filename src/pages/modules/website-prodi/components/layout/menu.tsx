import {
  MdBook,
  MdBusiness,
  MdDashboard,
  MdInfo,
  MdMiscellaneousServices,
  MdQuestionAnswer,
} from 'react-icons/md'
import { FaGraduationCap, FaImage } from 'react-icons/fa'
import { PiCertificateFill } from 'react-icons/pi'
import { FaGear } from 'react-icons/fa6'

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
    name: 'Layanan',
    path: `${baseDomain}/service`,
    icon: <MdMiscellaneousServices className={'size-5'} />,
  },
  {
    id: 5,
    name: 'Konten Publik',
    path: `${baseDomain}/public-content`,
    icon: <MdInfo className={'size-5'} />,
    child: [
      {
        id: 51,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
      {
        id: 52,
        name: 'Pengumuman',
        path: `${baseDomain}/public-content/announcement`,
      },
      {
        id: 53,
        name: 'Agenda',
        path: `${baseDomain}/public-content/agenda`,
      },
      {
        id: 54,
        name: 'Promosi',
        path: `${baseDomain}/public-content/promotion`,
      },
      {
        id: 55,
        name: 'Download',
        path: `${baseDomain}/public-content/download`,
      },
    ],
  },
  {
    id: 6,
    name: 'Akreditasi',
    path: `${baseDomain}/accreditation`,
    icon: <PiCertificateFill className={'size-5'} />,
  },
  {
    id: 7,
    name: 'Kurikulum',
    path: `${baseDomain}/curriculum`,
    icon: <MdBook className={'size-5'} />,
  },
  {
    id: 8,
    name: 'Galeri',
    path: `${baseDomain}/gallery`,
    icon: <FaImage className={'size-5'} />,
    child: [
      {
        id: 81,
        name: 'Foto',
        path: `${baseDomain}/gallery/photo`,
      },
      {
        id: 82,
        name: 'Video',
        path: `${baseDomain}/gallery/video`,
      },
    ],
  },
  {
    id: 9,
    name: 'Pertayaan',
    icon: <MdQuestionAnswer className={'size-5'} />,
    path: `${baseDomain}/question`,
    child: [
      {
        id: 91,
        name: 'Kontak Masuk',
        path: `${baseDomain}/question/inbox`,
      },
      {
        id: 92,
        name: 'F.A.Q',
        path: `${baseDomain}/question/faq`,
      },
      {
        id: 93,
        name: 'Pendaftaran',
        path: `${baseDomain}/question/registration`,
      },
    ],
  },
  {
    id: 10,
    name: 'Pengaturan Website',
    path: `${baseDomain}/settings`,
    icon: <FaGear className={'size-5'} />,
    child: [
      {
        id: 101,
        name: 'Landing Page',
        path: `${baseDomain}/settings/landing-page`,
      },
      {
        id: 102,
        name: 'Landing Page Promosi',
        path: `${baseDomain}/settings/landing-promosi`,
      },
      {
        id: 103,
        name: 'Gambar Background',
        path: `${baseDomain}/settings/background`,
      },
      {
        id: 104,
        name: 'Pengaturan Warna Prodi',
        path: `${baseDomain}/settings/primary-color`,
      },
    ],
  },
]

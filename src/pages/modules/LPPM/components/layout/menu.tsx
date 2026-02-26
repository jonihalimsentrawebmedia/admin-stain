import {
  MdBusiness,
  MdDashboard,
  MdDataset,
  MdHomeRepairService,
  MdInfo,
  MdScience,
} from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { GiWorld } from 'react-icons/gi'

const baseDomain = '/modules/lppm'

export const MenuListLPPM = [
  {
    id: 1,
    name: 'Beranda',
    path: `${baseDomain}/dashboard`,
    icon: <MdDashboard className={'size-5'} />,
  },
  {
    id: 2,
    name: 'Data Lembaga',
    path: `${baseDomain}/data-lppm`,
    icon: <MdBusiness className={'size-5'} />,
  },
  {
    id: 3,
    name: 'Tentang LPPM',
    path: `${baseDomain}/about`,
    icon: <FaGraduationCap className={'size-5'} />,
    child: [
      {
        id: 31,
        name: 'Profile Lembaga',
        path: `${baseDomain}/about/profile`,
      },
      {
        id: 32,
        name: 'Visi & Misi',
        path: `${baseDomain}/about/vision-mission`,
      },
      {
        id: 33,
        name: 'Struktur Organisasi',
        path: `${baseDomain}/about/structure`,
      },
      {
        id: 34,
        name: 'Profil Ketua LPPM',
        path: `${baseDomain}/about/leader`,
      },
      {
        id: 35,
        name: 'Profil Sekretaris LPPM',
        path: `${baseDomain}/about/secretary`,
      },
      {
        id: 36,
        name: 'Staff LPPM',
        path: `${baseDomain}/about/staff`,
      },
    ],
  },
  {
    id: 4,
    name: 'Penelitian',
    path: `${baseDomain}/research`,
    icon: <MdScience className={'size-5'} />,
    child: [
      {
        id: 41,
        name: 'Pusat Penelitan',
        path: `${baseDomain}/research/main`,
      },
      {
        id: 42,
        name: 'Skema Penelitian',
        path: `${baseDomain}/research/schema`,
        child: [
          {
            id: 421,
            name: 'Program Post Doctoral',
            path: `${baseDomain}/research/schema/doctoral`,
          },
          {
            id: 422,
            name: 'Penelitian Pendanaan Internal',
            path: `${baseDomain}/research/schema/internal`,
          },
        ],
      },
      {
        id: 43,
        name: 'Rencana Induk Penelitian',
        path: `${baseDomain}/research/plan`,
      },
      {
        id: 44,
        name: 'Buku Panduan',
        path: `${baseDomain}/research/guide`,
      },
      {
        id: 45,
        name: 'Pusat Studi',
        path: `${baseDomain}/research/study-center`,
        child: [
          {
            id: 451,
            name: 'Daftar Studi',
            path: `${baseDomain}/research/study-center/study-list`,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Pengabdian',
    path: `${baseDomain}/devotion`,
    icon: <MdHomeRepairService className={'size-5'} />,
  },
  {
    id: 6,
    name: 'Publikasi & HKI',
    icon: <GiWorld className={'size-5'} />,
    path: `${baseDomain}/publication-hki`,
  },
  {
    id: 7,
    name: 'Data',
    icon: <MdDataset />,
    path: `${baseDomain}/data`,
  },
  {
    id: 8,
    name: 'Konten Publik',
    icon: <MdInfo className={'size-5'} />,
    path: `${baseDomain}/public-content`,
    child: [
      {
        id: 81,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
    ],
  },
  {
    id: 9,
    name: 'Pengaturan Website',
    icon: <IoMdSettings className={'size-5'} />,
    path: `${baseDomain}/settings`,
    child: [
      {
        id: 91,
        name: 'Landing Page',
        path: `${baseDomain}/settings/landing-page`,
      },
      {
        id: 92,
        name: 'Gambar Background',
        path: `${baseDomain}/settings/background`,
      },
      {
        id: 93,
        name: 'Pengaturan Warna Unit',
        path: `${baseDomain}/settings/primary-color`,
      },
      {
        id: 94,
        name: 'Template Website',
        path: `${baseDomain}/settings/template`,
      },
    ],
  },
]

import {
  MdBusiness,
  MdDashboard,
  MdInfo,
  MdLibraryBooks,
  MdMapsHomeWork,
  MdMiscellaneousServices,
} from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { IoMdImage, IoMdSettings } from 'react-icons/io'

const baseDomain = '/modules/website-unit'

export const MenuListUnit = [
  {
    id: 1,
    name: 'Beranda',
    path: `${baseDomain}/dashboard`,
    icon: <MdDashboard className={'size-5'} />,
  },
  {
    id: 2,
    name: 'Data Unit',
    path: `${baseDomain}/data-unit`,
    icon: <MdBusiness className={'size-5'} />,
  },
  {
    id: 3,
    name: 'Profil',
    path: `${baseDomain}/profile`,
    icon: <FaGraduationCap className={'size-5'} />,
    child: [
      {
        id: 31,
        name: 'tentang Unit',
        path: `${baseDomain}/profile/about`,
      },
      {
        id: 32,
        name: 'Sejarah',
        path: `${baseDomain}/profile/history`,
      },
      {
        id: 33,
        name: 'Tim Unit',
        path: `${baseDomain}/profile/our-team`,
      },
      {
        id: 34,
        name: 'Visi, Misi, & Sasaran',
        path: `${baseDomain}/profile/vision`,
      },
      {
        id: 35,
        name: 'Tugas, Fungsi, & Tujuan',
        path: `${baseDomain}/profile/goals-task`,
      },
      {
        id: 36,
        name: 'Penghargaan',
        path: `${baseDomain}/profile/achievement`,
      },
      {
        id: 37,
        name: 'Kerjasama',
        path: `${baseDomain}/profile/collaboration`,
      },
      {
        id: 38,
        name: 'Struktur Organisasi',
        path: `${baseDomain}/profile/organization-structure`,
      },
    ],
  },
  {
    id: 4,
    name: 'Layanan',
    path: `${baseDomain}/services`,
    icon: <MdMiscellaneousServices className={'size-5'} />,
    child: [
      {
        id: 41,
        name: 'Daftar Layanan',
        path: `${baseDomain}/services/list`,
      },
      {
        id: 42,
        name: 'Layanan Utama',
        path: `${baseDomain}/services/main`,
      },
      {
        id: 43,
        name: 'Layanan Header & Footer',
        path: `${baseDomain}/services/header-footer`,
      },
      {
        id: 44,
        name: 'Jam Operasional',
        path: `${baseDomain}/services/operational-hours`,
      },
    ],
  },
  {
    id: 5,
    name: 'Koleksi',
    path: `${baseDomain}/collection`,
    icon: <MdLibraryBooks className={'size-5'} />,
  },
  {
    id: 6,
    name: 'Denah Lantai',
    icon: <MdMapsHomeWork className={'size-5'} />,
    path: `${baseDomain}/floor-plan`,
  },
  {
    id: 7,
    name: 'Konten Publik',
    icon: <MdInfo className={'size-5'} />,
    path: `${baseDomain}/public-content`,
    child: [
      {
        id: 71,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
      {
        id: 72,
        name: 'Pengumuman',
        path: `${baseDomain}/public-content/announcement`,
      },
      {
        id: 73,
        name: 'Agenda',
        path: `${baseDomain}/public-content/agenda`,
      },
      {
        id: 74,
        name: 'Download',
        path: `${baseDomain}/public-content/download`,
      },
      {
        id: 75,
        name: 'Fasilitas Unit',
        path: `${baseDomain}/public-content/facilities-unit`,
      },
    ],
  },
  {
    id: 8,
    name: 'Pertanyaan',
    icon: <RiQuestionAnswerFill className={'size-5'} />,
    path: `${baseDomain}/question`,
    child: [
      {
        id: 81,
        name: 'Kotak Masuk',
        path: `${baseDomain}/question/inbox`,
      },
      {
        id: 82,
        name: 'F.A.Q',
        path: `${baseDomain}/question/faq`,
      },
    ],
  },
  {
    id: 9,
    name: 'Galeri',
    icon: <IoMdImage className={'size-5'} />,
    path: `${baseDomain}/gallery`,
    child: [
      {
        id: 91,
        name: 'Galeri Foto',
        path: `${baseDomain}/gallery/photo`,
      },
      {
        id: 92,
        name: 'Galeri Video',
        path: `${baseDomain}/gallery/video`,
      },
    ],
  },
  {
    id: 10,
    name: 'Pengaturan Website',
    icon: <IoMdSettings className={'size-5'} />,
    path: `${baseDomain}/settings`,
    child: [
      {
        id: 101,
        name: 'Landing Page',
        path: `${baseDomain}/settings/landing-page`,
      },
      {
        id: 102,
        name: 'Gambar Background',
        path: `${baseDomain}/settings/background`,
      },
    ],
  },
]

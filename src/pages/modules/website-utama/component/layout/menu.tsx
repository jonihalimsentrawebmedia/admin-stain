import { MdDashboard } from 'react-icons/md'
import { IoSchool } from 'react-icons/io5'
import { TbWorld } from 'react-icons/tb'
import { FaGear, FaGears } from 'react-icons/fa6'
import { Calendar } from 'lucide-react'

const baseDomain = '/modules/website-utama'

export const MENULIST = [
  {
    id: 1,
    name: 'Dashboard',
    path: `${baseDomain}/dashboard`,
    icon: <MdDashboard className={'size-5'} />,
  },
  {
    id: 2,
    name: 'Profil',
    path: `${baseDomain}/profile`,
    icon: <IoSchool className={'size-5'} />,
  },
  {
    id: 3,
    name: 'Konten Publik',
    icon: <TbWorld className={'size-5'} />,
    child: [
      {
        id: 1,
        name: 'Slider',
        child: [
          {
            id: 1,
            name: 'Slider Atas',
            path: `${baseDomain}/public-content/slider/top-slider`,
          },
          {
            id: 2,
            name: 'Slider Bawah',
            path: `${baseDomain}/public-content/slider/bottom-slider`,
          },
        ],
      },
      {
        id: 2,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
      {
        id: 3,
        name: 'Inovasi Berdampak',
        path: `${baseDomain}/public-content/impact-innovation`,
      },
      {
        id: 4,
        name: 'Pengumuman',
        path: `${baseDomain}/public-content/announcement`,
      },
      {
        id: 5,
        name: 'Agenda',
        path: `${baseDomain}/public-content/agenda`,
      },
      {
        id: 6,
        name: 'Struktur Organisasi',
        path: `${baseDomain}/public-content/structure-organization`,
      },
      {
        id: 7,
        name: 'Fasilitas',
        path: `${baseDomain}/public-content/facilities`,
      },
    ],
  },
  {
    id: 4,
    name: 'Pengaturan Menu',
    icon: <FaGear className={'size-5'} />,
    child: [
      {
        id: 1,
        name: 'Header',
        path: `${baseDomain}/pengaturan-menu/header`,
      },
      {
        id: 2,
        name: 'Footer',
        path: `${baseDomain}/pengaturan-menu/footer`,
      },
    ],
  },
  {
    id: 4,
    name: 'Layanan',
    path: `${baseDomain}/services`,
    icon: <FaGears className={'size-5'} />,
  },
  {
    id: 5,
    name: 'Kalender Akademik',
    path: `${baseDomain}/calendar-academic`,
    icon: <Calendar className={'size-5'} />,
  },
]

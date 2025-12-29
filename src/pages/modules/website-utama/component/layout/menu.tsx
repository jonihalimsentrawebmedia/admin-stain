import {
  MdAddChart,
  MdChecklist,
  MdDashboard,
  MdEmail,
  MdHandshake,
  MdOutlineRunCircle,
} from 'react-icons/md'
import { IoSchool, IoStorefront } from 'react-icons/io5'
import { TbWorld } from 'react-icons/tb'
import { FaGear, FaGears } from 'react-icons/fa6'
import { Calendar } from 'lucide-react'
import { IconCertificate } from '@/components/common/icon'

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
      {
        id: 8,
        name: 'Galeri',
        child: [
          {
            id: 1,
            name: 'Galeri Video',
            path: `${baseDomain}/public-content/gallery/video`,
          },
          {
            id: 2,
            name: 'Galeri Foto',
            path: `${baseDomain}/public-content/gallery/photo`,
          },
        ],
      },
      {
        id: 9,
        name: 'Prestasi',
        path: `${baseDomain}/public-content/achievement`,
      },
      {
        id: 10,
        name: 'Download',
        path: `${baseDomain}/public-content/download`,
      },
      {
        id: 11,
        name: 'Musik Resmi',
        path: `${baseDomain}/public-content/music`,
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
    id: 5,
    name: 'Layanan',
    path: `${baseDomain}/services`,
    icon: <FaGears className={'size-5'} />,
  },
  {
    id: 6,
    name: 'Statistik',
    path: `${baseDomain}/statistic`,
    icon: <MdAddChart className={'size-5'} />,
  },
  {
    id: 7,
    name: 'Kalender Akademik',
    path: `${baseDomain}/calendar-academic`,
    icon: <Calendar className={'size-5'} />,
  },
  {
    id: 8,
    name: 'Akreditasi',
    path: `${baseDomain}/acreditation`,
    icon: <IconCertificate />,
  },
  {
    id: 10,
    name: 'Identitas',
    path: `${baseDomain}/identity`,
    icon: <IoStorefront className={'size-5'} />,
  },
  {
    id: 11,
    name: 'Peraturan Akademik',
    path: `${baseDomain}/academic-rules`,
    icon: <MdChecklist className={'size-5'} />,
  },
  {
    id: 12,
    name: 'Kehidupan Kampus',
    path: `${baseDomain}/campus-life`,
    icon: <MdOutlineRunCircle className={'size-5'} />,
  },
  {
    id: 13,
    name: 'Surat Keterangan Mahasiswa',
    path: `${baseDomain}/surat-keterangan`,
    icon: <MdEmail className={'size-5'} />,
  },
  {
    id: 14,
    name: 'Kerjasama',
    path: `${baseDomain}/kerjasama`,
    icon: <MdHandshake className={'size-5'} />,
    child: [
      {
        id: 1,
        name: 'Kategori Kerjasama',
        path: `${baseDomain}/kerjasama/kategori-kerjasama`,
      },
      {
        id: 2,
        name: 'Sub Kategori Kerjasama',
        path: `${baseDomain}/kerjasama/sub-kategori-kerjasama`,
      },
      {
        id: 3,
        name: 'Jenis Kerjasama',
        path: `${baseDomain}/kerjasama/jenis-kerjasama`,
      },
      {
        id: 4,
        name: 'Bidang Kerjasama',
        path: `${baseDomain}/kerjasama/bidang-kerjasama`,
      },
      {
        id: 5,
        name: 'Daftar Kerjasama',
        path: `${baseDomain}/kerjasama/daftar-kerjasama`,
      },
    ],
  },
]

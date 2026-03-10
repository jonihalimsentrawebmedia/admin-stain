import {
  MdBusiness,
  MdDashboard,
  MdDataset,
  MdInfo,
  MdOutlineTrackChanges,
  MdQuiz,
} from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'

const baseDomain = '/modules/pusat-karir'

export const GenerateMenu = () => {
  return [
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
      name: 'Tentang Pusat Karir',
      path: `${baseDomain}/about`,
      icon: <FaGraduationCap className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Profile unit',
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
          name: 'Sambutan Ketua',
          path: `${baseDomain}/about/greeting-leader`,
        },
      ],
    },
    {
      id: 4,
      name: 'Layanan',
      path: `${baseDomain}/service`,
      icon: <FaGears className={'size-5'} />,
      child: [
        {
          id: 41,
          name: 'Lowongan Perkerjaan',
          path: `${baseDomain}/service/job-vacancy`,
        },
        {
          id: 42,
          name: 'lowongan Magang',
          path: `${baseDomain}/service/internship-vacancy`,
        },
        {
          id: 43,
          name: 'Konsultasi Karir',
          path: `${baseDomain}/service/consultation`,
        },
        {
          id: 44,
          name: 'Portal CV ATS',
          path: `${baseDomain}/service/portal-cv`,
        },
        {
          id: 45,
          name: 'Layanan Utama',
          path: `${baseDomain}/service/main`,
        },
        {
          id: 46,
          name: 'Posisi Layanan',
          path: `${baseDomain}/service/position`,
        },
      ],
    },
    {
      id: 5,
      name: 'Tracer Study',
      path: `${baseDomain}/tracer-study`,
      icon: <MdOutlineTrackChanges className={'size-5'} />,
    },
    {
      id: 6,
      name: 'Konten Publik',
      icon: <MdInfo className={'size-5'} />,
      path: `${baseDomain}/public-content`,
      child: [
        {
          id: 61,
          name: 'Berita',
          path: `${baseDomain}/public-content/news`,
        },
        {
          id: 62,
          name: 'Agenda',
          path: `${baseDomain}/public-content/agenda`,
        },
        {
          id: 63,
          name: 'Artikel',
          path: `${baseDomain}/public-content/article`,
        },
        {
          id: 64,
          name: 'Download',
          path: `${baseDomain}/public-content/download`,
        },
      ],
    },
    {
      id: 7,
      name: 'Survei',
      icon: <MdQuiz className={'size-5'} />,
      path: `${baseDomain}/survey`,
    },
    {
      id: 8,
      name: 'Referensi',
      icon: <MdDataset className={'size-5'} />,
      child: [
        {
          id: 81,
          name: 'Spesialisasi',
          path: `${baseDomain}/reference/Specialization`,
        },
        {
          id: 82,
          name: 'Ukuran Perusahaan',
          path: `${baseDomain}/reference/company-size`,
        },
        {
          id: 83,
          name: 'Kategori Industri',
          path: `${baseDomain}/reference/industry-category`,
        },
      ],
    },
  ]
}

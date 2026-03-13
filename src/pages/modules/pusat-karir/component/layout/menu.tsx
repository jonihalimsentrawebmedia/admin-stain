import {
  MdBusiness,
  MdDashboard,
  MdDataset,
  MdInfo,
  MdOutlineTrackChanges,
  MdQuiz,
} from 'react-icons/md'
import { FaGraduationCap, FaUserFriends } from 'react-icons/fa'
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
      name: 'Management User',
      icon: <FaUserFriends className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Daftar User',
          path: `${baseDomain}/management-user/user`,
        },
        {
          id: 32,
          name: 'Verifikasi User',
          path: `${baseDomain}/management-user/user-verification`,
        },
        {
          id: 33,
          name: 'Prosedur Pendaftaran',
          path: `${baseDomain}/management-user/procedure`,
        },
      ],
    },
    {
      id: 4,
      name: 'Tentang Pusat Karir',
      path: `${baseDomain}/about`,
      icon: <FaGraduationCap className={'size-5'} />,
      child: [
        {
          id: 41,
          name: 'Profile unit',
          path: `${baseDomain}/about/profile`,
        },
        {
          id: 42,
          name: 'Visi & Misi',
          path: `${baseDomain}/about/vision-mission`,
        },
        {
          id: 43,
          name: 'Struktur Organisasi',
          path: `${baseDomain}/about/structure`,
        },
        {
          id: 44,
          name: 'Sambutan Ketua',
          path: `${baseDomain}/about/greeting-leader`,
        },
      ],
    },
    {
      id: 5,
      name: 'Layanan',
      path: `${baseDomain}/service`,
      icon: <FaGears className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Lowongan Perkerjaan',
          path: `${baseDomain}/service/job-vacancy`,
        },
        {
          id: 52,
          name: 'lowongan Magang',
          path: `${baseDomain}/service/internship-vacancy`,
        },
        {
          id: 53,
          name: 'Konsultasi Karir',
          path: `${baseDomain}/service/consultation`,
        },
        {
          id: 54,
          name: 'Portal CV ATS',
          path: `${baseDomain}/service/portal-cv`,
        },
        {
          id: 55,
          name: 'Layanan Utama',
          path: `${baseDomain}/service/main`,
        },
        {
          id: 56,
          name: 'Posisi Footer',
          path: `${baseDomain}/service/footer`,
        },
      ],
    },
    {
      id: 6,
      name: 'Tracer Study',
      path: `${baseDomain}/tracer-study`,
      icon: <MdOutlineTrackChanges className={'size-5'} />,
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
          name: 'Agenda',
          path: `${baseDomain}/public-content/agenda`,
        },
        {
          id: 73,
          name: 'Artikel',
          path: `${baseDomain}/public-content/article`,
        },
        {
          id: 74,
          name: 'Download',
          path: `${baseDomain}/public-content/download`,
        },
      ],
    },
    {
      id: 8,
      name: 'Survei',
      icon: <MdQuiz className={'size-5'} />,
      path: `${baseDomain}/survey`,
    },
    {
      id: 9,
      name: 'Referensi',
      icon: <MdDataset className={'size-5'} />,
      child: [
        {
          id: 91,
          name: 'Spesialisasi',
          path: `${baseDomain}/reference/Specialization`,
        },
        {
          id: 92,
          name: 'Ukuran Perusahaan',
          path: `${baseDomain}/reference/company-size`,
        },
        {
          id: 93,
          name: 'Kategori Industri',
          path: `${baseDomain}/reference/industry-category`,
        },
      ],
    },
    {
      id: 10,
      name: 'Pengaturan Website',
      icon: <FaGears className={'size-5'} />,
      child: [
        {
          id: 101,
          name: 'Landing Page',
          path: `${baseDomain}/settings/landing-page`,
        },
        {
          id: 102,
          name: 'Pengaturan Warna',
          path: `${baseDomain}/settings/color`,
        },
        {
          id: 103,
          name: 'Template',
          path: `${baseDomain}/settings/template`,
        },
      ],
    },
  ]
}

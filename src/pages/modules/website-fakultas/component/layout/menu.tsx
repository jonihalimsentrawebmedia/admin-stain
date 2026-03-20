import { MdBusiness, MdDashboard, MdInfo, MdMenuBook } from 'react-icons/md'
import { FaGears } from 'react-icons/fa6'
import { IoMdSchool } from 'react-icons/io'

const baseDomain = '/modules/website-fakultas'

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
      name: 'Data Fakultas',
      path: `${baseDomain}/data-faculty`,
      icon: <MdBusiness className={'size-5'} />,
    },
    {
      id: 3,
      name: 'Tentang Fakultas',
      path: `${baseDomain}/about-faculty`,
      icon: <IoMdSchool className={'size-5'} />,
    },
    {
      id: 4,
      name: 'Akademik',
      path: `${baseDomain}/academic`,
      icon: <MdMenuBook className={'size-5'} />,
      child: [
        {
          id: 41,
          name: 'Programe Studi',
          path: `${baseDomain}/academic/study-program`,
        },
        {
          id: 42,
          name: 'Kurikulum',
          path: `${baseDomain}/academic/curriculum`,
        },
        {
          id: 43,
          name: 'PPSM',
          path: `${baseDomain}/academic/ppsm`,
        },
        {
          id: 44,
          name: 'International Mobility',
          path: `${baseDomain}/academic/international-mobility`,
        },
        {
          id: 45,
          name: 'International Undergraduate Program',
          path: `${baseDomain}/academic/undergraduate-program`,
        },
      ],
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
          name: 'Pengumuman',
          path: `${baseDomain}/public-content/announcement`,
        },
        {
          id: 74,
          name: 'Download',
          path: `${baseDomain}/public-content/download`,
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

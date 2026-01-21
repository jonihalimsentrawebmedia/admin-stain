import { MdBusiness, MdDashboard } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'

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
    path: `${baseDomain}/data-Unit`,
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
]

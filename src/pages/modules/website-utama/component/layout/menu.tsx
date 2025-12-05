import { MdDashboard } from 'react-icons/md'
import { IoSchool } from 'react-icons/io5'
import { TbWorld } from 'react-icons/tb'

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
        path: `${baseDomain}/public-content/innovation-impact`,
      },
    ],
  },
]

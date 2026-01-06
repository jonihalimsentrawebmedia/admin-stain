import { MdDashboard } from 'react-icons/md'

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
    name: 'Konten Publik',
    path: `${baseDomain}/public-content`,
    icon: <MdDashboard className={'size-5'} />,
    child: [
      {
        id: 21,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
    ],
  },
]

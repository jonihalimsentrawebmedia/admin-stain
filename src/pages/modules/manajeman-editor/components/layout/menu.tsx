import Cookies from 'js-cookie'
import { IoSchool } from 'react-icons/io5'
import { MdBusiness, MdBusinessCenter, MdDashboard } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'

const baseDomain = '/modules/editor'

export const MENULIST = [
  {
    id: 1,
    name: 'Dashboard',
    path: `${baseDomain}/dashboard`,
    icon: <MdDashboard className={'size-5'} />,
    child: [],
  },
  {
    id: 2,
    name: 'Data Utama Universitas',
    path: `${baseDomain}/main-data-university/detail/${Cookies.get('id_satuan_organisasi')}`,
    icon: <IoSchool className="size-5" />,
    child: [],
  },
  {
    id: 3,
    path: `${baseDomain}/faculty`,
    name: 'Data Fakultas',
    icon: <MdBusiness className="size-5" />,
    child: [],
  },
  {
    id: 4,
    path: `${baseDomain}/prodi`,
    name: 'Data Prodi',
    icon: <MdBusiness className="size-5" />,
    child: [],
  },
  {
    id: 5,
    path: `${baseDomain}/unit`,
    name: 'Data Unit',
    icon: <MdBusinessCenter className="size-5" />,
    child: [],
  },
  {
    id: 6,
    path: `${baseDomain}/institution`,
    name: 'Data Lembaga',
    icon: <MdBusinessCenter className="size-5" />,
    child: [],
  },
  {
    id: 4,
    name: 'Konten Publik',
    path: `${baseDomain}/public-content`,
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
        id: 41,
        name: 'Berita',
        path: `${baseDomain}/public-content/news`,
      },
      {
        id: 3,
        name: 'Inovasi Berdampak',
        path: `${baseDomain}/public-content/impact-innovation`,
      },
      {
        id: 42,
        name: 'Pengumuman',
        path: `${baseDomain}/public-content/announcement`,
      },
      {
        id: 43,
        name: 'Agenda',
        path: `${baseDomain}/public-content/agenda`,
      },
      {
        id: 7,
        name: 'Fasilitas',
        path: `${baseDomain}/public-content/facilities`,
      },
      {
        id: 8,
        name: 'Prestasi',
        path: `${baseDomain}/public-content/achievement`,
      },
      {
        id: 9,
        name: 'Promosi',
        path: `${baseDomain}/public-content/promotion`,
      },
      {
        id: 10,
        name: 'Fasilitas Unit',
        path: `${baseDomain}/public-content/facilities-unit`,
      },
      // {
      //   id: 44,
      //   name: 'Promosi',
      //   path: `${baseDomain}/public-content/promotion`,
      // },
      // {
      //   id: 45,
      //   name: 'Download',
      //   path: `${baseDomain}/public-content/download`,
      // },
    ],
  },
]

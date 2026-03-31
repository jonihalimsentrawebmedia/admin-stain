import {
  MdBusiness,
  MdChat,
  MdDashboard,
  MdDatasetLinked,
  MdInfo,
  MdInventory,
  MdMiscellaneousServices,
  MdWidgets,
} from 'react-icons/md'
import { FaGear, FaGears } from 'react-icons/fa6'
import { IoMdSchool } from 'react-icons/io'

const baseDomain = '/modules/pulsikom'

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
      name: 'Data Pulsikom',
      path: `${baseDomain}/data-pulsikom`,
      icon: <MdBusiness className={'size-5'} />,
    },
    {
      id: 3,
      name: 'Tentang Pusilkom',
      path: `${baseDomain}/about`,
      icon: <IoMdSchool className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Sejarah',
          path: `${baseDomain}/about/history`,
        },
        {
          id: 32,
          name: 'Visi & Misi',
          path: `${baseDomain}/about/vision-mission`,
        },
        {
          id: 33,
          name: 'Pimpinan',
          path: `${baseDomain}/about/chief-officer`,
        },
      ],
    },
    {
      id: 4,
      icon: <MdMiscellaneousServices className={'size-5'} />,
      name: 'Layanan',
      path: `${baseDomain}/services`,
    },
    {
      id: 5,
      name: 'Produk',
      path: `${baseDomain}/products`,
      icon: <MdInventory className={'size-5'} />,
    },
    {
      id: 6,
      name: 'Training',
      path: `${baseDomain}/training`,
      icon: <MdWidgets className={'size-5'} />,
      child: [
        {
          id: 61,
          name: 'Daftar Training',
          path: `${baseDomain}/training/list-training`,
        },
        {
          id: 62,
          name: 'Kalender Training',
          path: `${baseDomain}/training/calendar`,
        },
        {
          id: 63,
          name: 'Program Credit Earning',
          path: `${baseDomain}/training/credit-earning`,
        },
        {
          id: 64,
          name: 'Verifikasi Pendaftaran',
          path: `${baseDomain}/training/verify-registration`,
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
      id: 8,
      name: 'Webisite Karir',
      icon: <FaGears className={'size-5'} />,
      path: `${baseDomain}/carrier-website`,
    },
    {
      id: 9,
      name: 'Pesan Masuk',
      icon: <MdChat className={'size-5'} />,
      path: `${baseDomain}/inbox`,
    },
    {
      id: 10,
      name: 'Referensi',
      icon: <MdDatasetLinked className={'size-5'} />,
      path: `${baseDomain}/reference`,
      child: [
        {
          id: 101,
          name: 'Daftar Rekening',
          path: `${baseDomain}/reference/bank-account`,
        },
      ],
    },
    {
      id: 13,
      name: 'Pengaturan Website',
      icon: <FaGear className={'size-5'} />,
      child: [
        {
          id: 131,
          name: 'Landing Page',
          path: `${baseDomain}/settings/landing-page`,
        },
        {
          id: 132,
          name: 'Pengaturan Warna',
          path: `${baseDomain}/settings/color`,
        },
        {
          id: 133,
          name: 'Template',
          path: `${baseDomain}/settings/template`,
        },
      ],
    },
  ]
}

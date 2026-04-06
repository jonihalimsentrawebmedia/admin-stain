import {
  MdBusiness,
  MdChat,
  MdDashboard,
  MdDatasetLinked,
  MdInfo,
  MdInventory,
  MdMiscellaneousServices,
  MdStars,
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
      name: 'Keunggulan',
      path: `${baseDomain}/advantage`,
      icon: <MdStars className={'size-5'} />,
    },
    {
      id: 6,
      name: 'Produk',
      path: `${baseDomain}/products`,
      icon: <MdInventory className={'size-5'} />,
    },
    {
      id: 7,
      name: 'Training',
      path: `${baseDomain}/training`,
      icon: <MdWidgets className={'size-5'} />,
      child: [
        {
          id: 71,
          name: 'Daftar Training',
          path: `${baseDomain}/training/list-training`,
        },
        {
          id: 72,
          name: 'Kalender Training',
          path: `${baseDomain}/training/calendar`,
        },
        {
          id: 73,
          name: 'Program Credit Earning',
          path: `${baseDomain}/training/credit-earning`,
        },
        {
          id: 74,
          name: 'Verifikasi Pendaftaran',
          path: `${baseDomain}/training/verify-registration`,
        },
      ],
    },
    {
      id: 8,
      name: 'Konten Publik',
      icon: <MdInfo className={'size-5'} />,
      path: `${baseDomain}/public-content`,
      child: [
        {
          id: 81,
          name: 'Berita',
          path: `${baseDomain}/public-content/news`,
        },
        {
          id: 82,
          name: 'Agenda',
          path: `${baseDomain}/public-content/agenda`,
        },
        {
          id: 83,
          name: 'Pengumuman',
          path: `${baseDomain}/public-content/announcement`,
        },
        {
          id: 84,
          name: 'Download',
          path: `${baseDomain}/public-content/download`,
        },
      ],
    },
    {
      id: 9,
      name: 'Webisite Karir',
      icon: <FaGears className={'size-5'} />,
      path: `${baseDomain}/carrier-website`,
    },
    {
      id: 10,
      name: 'Pesan Masuk',
      icon: <MdChat className={'size-5'} />,
      path: `${baseDomain}/inbox`,
    },
    {
      id: 11,
      name: 'Referensi',
      icon: <MdDatasetLinked className={'size-5'} />,
      path: `${baseDomain}/reference`,
      child: [
        {
          id: 111,
          name: 'Daftar Rekening',
          path: `${baseDomain}/reference/bank-account`,
        },
      ],
    },
    {
      id: 12,
      name: 'Pengaturan Website',
      icon: <FaGear className={'size-5'} />,
      child: [
        {
          id: 231,
          name: 'Landing Page',
          path: `${baseDomain}/settings/landing-page`,
        },
        {
          id: 232,
          name: 'Gambar Background',
          path: `${baseDomain}/settings/background-image`,
        },
        {
          id: 123,
          name: 'Pengaturan Warna',
          path: `${baseDomain}/settings/color`,
        },
        {
          id: 124,
          name: 'Template',
          path: `${baseDomain}/settings/template`,
        },
      ],
    },
  ]
}

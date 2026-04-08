import {
  MdBusiness,
  MdChat,
  MdDashboard,
  MdDatasetLinked,
  MdInfo,
  MdInventory,
  MdMiscellaneousServices,
  MdStars,
} from 'react-icons/md'
import { FaGear, FaGears } from 'react-icons/fa6'
import { IoMdSchool } from 'react-icons/io'

const baseDomain = '/modules/spi'

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
      name: 'Data SPI',
      path: `${baseDomain}/data-spi`,
      icon: <MdBusiness className={'size-5'} />,
    },
    {
      id: 3,
      name: 'Tentang SPI',
      path: `${baseDomain}/about`,
      icon: <IoMdSchool className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Profil Singkat',
          path: `${baseDomain}/about/profile`,
        },
        {
          id: 32,
          name: 'Sejarah',
          path: `${baseDomain}/about/history`,
        },
        {
          id: 33,
          name: 'Visi & Misi',
          path: `${baseDomain}/about/vision-mission`,
        },
        {
          id: 34,
          name: 'Struktur Organisasi',
          path: `${baseDomain}/about/organization`,
        },
        {
          id: 35,
          name: 'Sumber Daya Manusia',
          path: `${baseDomain}/about/human-resource`,
        },
        {
          id: 36,
          name: 'Tugas & Wewenang',
          path: `${baseDomain}/about/authority`,
        },
        {
          id: 37,
          name: 'Kode Etik',
          path: `${baseDomain}/about/ethics`,
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
      name: 'Jaminan Mutu',
      path: `${baseDomain}/quality-assurance`,
      icon: <MdStars className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Tinjauan Manajemen',
          path: `${baseDomain}/quality-assurance/audit`,
        },
        {
          id: 52,
          name: 'Sistem Dokumen',
          path: `${baseDomain}/quality-assurance/document-system`,
        },
      ],
    },
    {
      id: 6,
      name: 'Peraturan',
      path: `${baseDomain}/regulation`,
      icon: <MdInventory className={'size-5'} />,
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
      ],
    },
    {
      id: 9,
      name: 'Penghargaan',
      icon: <FaGears className={'size-5'} />,
      path: `${baseDomain}/award`,
    },
    {
      id: 10,
      name: 'E-LHKPN',
      icon: <MdChat className={'size-5'} />,
      path: `${baseDomain}/e-lhkpn`,
    },
    {
      id: 11,
      name: 'Portal Eksternal',
      icon: <MdDatasetLinked className={'size-5'} />,
      path: `${baseDomain}/external-portal`,
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

import {
  MdBusiness,
  MdDashboard,
  MdDataset,
  MdHomeRepairService,
  MdInfo,
  MdScience,
} from 'react-icons/md'
import { FaGraduationCap, FaNewspaper } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { GiWorld } from 'react-icons/gi'
import { FaGears } from 'react-icons/fa6'
import { UseLPPMContext } from '@/pages/modules/LPPM/components/context'

const baseDomain = '/modules/lppm'

export const GenerateMenu = () => {
  const { profileSession } = UseLPPMContext()

  return [
    {
      id: 1,
      name: 'Beranda',
      path: `${baseDomain}/dashboard`,
      icon: <MdDashboard className={'size-5'} />,
    },
    {
      id: 2,
      name: 'Data Lembaga',
      path: `${baseDomain}/data-lppm`,
      icon: <MdBusiness className={'size-5'} />,
    },
    {
      id: 3,
      name: 'Tentang LPPM',
      path: `${baseDomain}/about`,
      icon: <FaGraduationCap className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Profile Lembaga',
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
          name: 'Profil Ketua LPPM',
          path: `${baseDomain}/about/leader`,
        },
        {
          id: 35,
          name: 'Profil Sekretaris LPPM',
          path: `${baseDomain}/about/secretary`,
        },
        {
          id: 36,
          name: 'Staff LPPM',
          path: `${baseDomain}/about/staff`,
        },
      ],
    },
    {
      id: 4,
      name: 'Penelitian',
      path: `${baseDomain}/research`,
      icon: <MdScience className={'size-5'} />,
      child: [
        {
          id: 41,
          name: 'Pusat Penelitan',
          path: `${baseDomain}/research/main`,
        },
        {
          id: 42,
          name: 'Skema Penelitian',
          path: `${baseDomain}/research/schema`,
          child: [
            {
              id: 421,
              name: 'Program Post Doctoral',
              path: `${baseDomain}/research/schema/doctoral`,
            },
            {
              id: 422,
              name: 'Penelitian Pendanaan Internal',
              path: `${baseDomain}/research/schema/internal`,
            },
          ],
        },
        {
          id: 43,
          name: 'Rencana Induk Penelitian',
          path: `${baseDomain}/research/plan`,
        },
        {
          id: 44,
          name: 'Buku Panduan',
          path: `${baseDomain}/research/guide`,
        },
        {
          id: 45,
          name: 'Pusat Studi',
          path: `${baseDomain}/research/study-center`,
          child: [
            {
              id: 451,
              name: 'Pusat Studi',
              path: `${baseDomain}/research/study-center/study-list`,
            },
            {
              id: 452,
              name: 'Standar Operasional Pusat Studi',
              path: `${baseDomain}/research/study-center/operational-standard`,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'Pengabdian',
      path: `${baseDomain}/devotion`,
      icon: <MdHomeRepairService className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Pusat Pengabdian',
          path: `${baseDomain}/devotion/main`,
        },
        {
          id: 52,
          name: 'Skema Pengabdian',
          path: `${baseDomain}/devotion/schema`,
          child: [
            {
              id: 521,
              name: 'Pengabdian Pendanaan Internal',
              path: `${baseDomain}/devotion/schema/internal`,
            },
            {
              id: 522,
              name: 'Pendanan DRTPM',
              path: `${baseDomain}/devotion/schema/drtpm`,
            },
            {
              id: 523,
              name: 'Pendanaan BRIN',
              path: `${baseDomain}/devotion/schema/brin`,
            },
            {
              id: 524,
              name: 'Pendanaan Lainnya',
              path: `${baseDomain}/devotion/schema/other`,
            },
          ],
        },
        {
          id: 53,
          name: `${profileSession?.singkatan_universitas} Hub`,
          path: `${baseDomain}/devotion/stain-hub`,
        },
      ],
    },
    {
      id: 6,
      name: 'Publikasi & HKI',
      icon: <GiWorld className={'size-5'} />,
      path: `${baseDomain}/publication-hki`,
      child: [
        {
          id: 61,
          name: 'Buku',
          path: `${baseDomain}/publication-hki/book`,
          child: [
            {
              id: 611,
              name: 'Pusat Buku dan Media Massa',
              path: `${baseDomain}/publication-hki/book/book-center`,
            },
            {
              id: 622,
              name: 'Penerbitan Buku',
              path: `${baseDomain}/publication-hki/book/publisher`,
            },
            {
              id: 633,
              name: 'Penerbitan Media Massa',
              path: `${baseDomain}/publication-hki/book/media`,
            },
          ],
        },
        {
          id: 62,
          name: 'HKI',
          path: `${baseDomain}/publication-hki/hki`,
          child: [
            {
              id: 621,
              name: 'Pusat KI & Layanan Teknis',
              path: `${baseDomain}/publication-hki/hki/hki-center`,
            },
            {
              id: 622,
              name: 'Deskripsi KI',
              path: `${baseDomain}/publication-hki/hki/description`,
            },
            {
              id: 623,
              name: 'Pendaftaran KI',
              path: `${baseDomain}/publication-hki/hki/registration`,
            },
          ],
        },
        {
          id: 63,
          name: 'Jurnal',
          path: `${baseDomain}/publication-hki/journal`,
          child: [
            {
              id: 631,
              name: 'PLP',
              path: `${baseDomain}/publication-hki/journal/plp`,
            },
            {
              id: 632,
              name: 'PPJS',
              path: `${baseDomain}/publication-hki/journal/ppjs`,
            },
            {
              id: 633,
              name: 'Daftar Jurnal',
              path: `${baseDomain}/publication-hki/journal/list`,
            },
          ],
        },
      ],
    },
    {
      id: 7,
      name: 'Data',
      icon: <MdDataset />,
      path: `${baseDomain}/data`,
    },
    {
      id: 8,
      name: 'Layanan',
      icon: <FaGears className={'size-5'} />,
      path: `${baseDomain}/services`,
    },
    {
      id: 9,
      name: 'PPID',
      icon: <FaNewspaper className={'size-5'} />,
      path: `${baseDomain}/ppid`,
    },
    {
      id: 9,
      name: 'Konten Publik',
      icon: <MdInfo className={'size-5'} />,
      path: `${baseDomain}/public-content`,
      child: [
        {
          id: 91,
          name: 'Berita',
          path: `${baseDomain}/public-content/news`,
        },
        {
          id: 92,
          name: 'Pengumuman',
          path: `${baseDomain}/public-content/announcement`,
        },
        {
          id: 93,
          name: 'Agenda',
          path: `${baseDomain}/public-content/agenda`,
        },
        {
          id: 94,
          name: 'Artikel',
          path: `${baseDomain}/public-content/article`,
        },
        {
          id: 95,
          name: 'Download',
          path: `${baseDomain}/public-content/download`,
        },
      ],
    },
    {
      id: 10,
      name: 'Pengaturan Website',
      icon: <IoMdSettings className={'size-5'} />,
      path: `${baseDomain}/settings`,
      child: [
        {
          id: 101,
          name: 'Landing Page',
          path: `${baseDomain}/settings/landing-page`,
        },
        // {
        //   id: 102,
        //   name: 'Gambar Background',
        //   path: `${baseDomain}/settings/background`,
        // },
        {
          id: 103,
          name: 'Pengaturan Warna Unit',
          path: `${baseDomain}/settings/primary-color`,
        },
        {
          id: 104,
          name: 'Template Website',
          path: `${baseDomain}/settings/template`,
        },
      ],
    },
  ]
}

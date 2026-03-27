import {
  MdBusiness,
  MdDashboard,
  MdEmojiPeople,
  MdHomeRepairService,
  MdInfo,
  MdMenuBook,
  MdMiscellaneousServices,
  MdScience,
} from 'react-icons/md'
import { FaGear, FaGears } from 'react-icons/fa6'
import { IoMdImage, IoMdSchool } from 'react-icons/io'
import { IoPeople } from 'react-icons/io5'

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
      id: 5,
      name: 'Penelitian',
      path: `${baseDomain}/research`,
      icon: <MdScience className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Kelompok Keahlian',
          path: `${baseDomain}/research/research-group`,
        },
        {
          id: 52,
          name: 'Bekerja Sama Dengan Kami',
          path: `${baseDomain}/research/collaboration`,
        },
        {
          id: 53,
          name: 'Riset & Penelitian',
          path: `${baseDomain}/research/study-research`,
        },
      ],
    },
    {
      id: 6,
      name: 'Komunitas',
      path: `${baseDomain}/community`,
      icon: <IoPeople className={'size-5'} />,
      child: [
        {
          id: 61,
          name: 'Kuliah di Fakultas',
          path: `${baseDomain}/community/study-faculty`,
          child: [
            {
              id: 611,
              name: 'Sistem Perkuliahan',
              path: `${baseDomain}/community/study-faculty/college-system`,
            },
            {
              id: 612,
              name: 'Akreditasi',
              path: `${baseDomain}/community/study-faculty/accreditation`,
            },
            {
              id: 613,
              name: 'Prospek Karir',
              path: `${baseDomain}/community/study-faculty/carrier-prospect`,
            },
          ],
        },
        {
          id: 62,
          name: 'Kehidupan Mahasiswa',
          path: `${baseDomain}/community/student-life`,
          child: [
            {
              id: 621,
              name: 'Akomodasi',
              path: `${baseDomain}/community/student-life/accommodation`,
            },
            {
              id: 622,
              name: 'Organisasi Mahasiswa',
              path: `${baseDomain}/community/student-life/student-organization`,
            },
            {
              id: 623,
              name: 'Tempat Hiburan',
              path: `${baseDomain}/community/student-life/entertainment`,
            },
          ],
        },
        {
          id: 63,
          name: 'Alumni',
          path: `${baseDomain}/community/alumni`,
          child: [
            {
              id: 631,
              name: 'Cerita Alumni',
              path: `${baseDomain}/community/alumni/story`,
            },
            {
              id: 632,
              name: 'Kontak Masuk',
              path: `${baseDomain}/community/alumni/inbox`,
            },
          ],
        },
      ],
    },
    {
      id: 7,
      name: 'Fasilitas',
      icon: <MdMiscellaneousServices className={'size-5'} />,
      path: `${baseDomain}/facilities`,
    },
    {
      id: 8,
      icon: <MdHomeRepairService className={'size-5'} />,
      name: 'Layanan',
      path: `${baseDomain}/services`,
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
          name: 'Agenda',
          path: `${baseDomain}/public-content/agenda`,
        },
        {
          id: 93,
          name: 'Pengumuman',
          path: `${baseDomain}/public-content/announcement`,
        },
        {
          id: 94,
          name: 'Download',
          path: `${baseDomain}/public-content/download`,
        },
      ],
    },
    {
      id: 10,
      name: 'Galeri',
      icon: <IoMdImage className={'size-5'} />,
      path: `${baseDomain}/gallery`,
      child: [
        {
          id: 101,
          name: 'Galeri Foto',
          path: `${baseDomain}/gallery/photo`,
        },
        {
          id: 102,
          name: 'Galeri Video',
          path: `${baseDomain}/gallery/video`,
        },
      ],
    },
    {
      id: 11,
      name: 'PMB',
      icon: <MdEmojiPeople className={'size-5'} />,
      path: `${baseDomain}/pmb`,
    },
    {
      id: 12,
      name: 'Zona Integritas',
      icon: <FaGears className={'size-5'} />,
      path: `${baseDomain}/zone-integrity`,
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

import { MdBusiness, MdDashboard, MdInfo } from 'react-icons/md'
import { IoMdPersonAdd } from 'react-icons/io'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { FaGear } from 'react-icons/fa6'

const baseDomain = '/modules/pmb'

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
      name: 'Data PMB',
      icon: <MdBusiness className={'size-5'} />,
      path: `${baseDomain}/data-pmb`,
    },
    {
      id: 3,
      name: 'Jalur Masuk',
      icon: <IoMdPersonAdd className={'size-5'} />,
      path: `${baseDomain}/entrance-pmb`,
    },
    {
      id: 4,
      name: 'Konten Publik',
      icon: <MdInfo className={'size-5'} />,
      path: `${baseDomain}/public-content`,
      child: [
        {
          id: 41,
          name: 'Pengumuman',
          path: `${baseDomain}/public-content/announcement`,
        },
      ],
    },
    {
      id: 5,
      name: 'FAQ',
      icon: <RiQuestionAnswerFill className={'size-5'} />,
      path: `${baseDomain}/faq`,
    },
    {
      id: 6,
      name: 'Pengaturan Website',
      icon: <FaGear className={'size-5'} />,
      path: `${baseDomain}/settings`,
      child: [
        {
          id: 61,
          name: 'Landing Page',
          path: `${baseDomain}/settings/landing-page`,
        },
        {
          id: 62,
          name: 'Pengaturan Warna',
          path: `${baseDomain}/settings/color`,
        },
        {
          id: 63,
          name: 'Template',
          path: `${baseDomain}/settings/template`,
        },
      ],
    },
  ]
}

import { MdDashboard, MdRoomPreferences } from 'react-icons/md'

const baseDomain = '/modules/e-office'

export const GenerateMenu = () => {
  return [
    {
      id: 1,
      name: 'Beranda',
      path: `${baseDomain}/dashboard`,
      icon: <MdDashboard className={'size-5'} />,
    },
    {
      id: 9,
      name: 'Referensi',
      path: `${baseDomain}/reference`,
      icon: <MdRoomPreferences className={'size-5'} />,
      child: [
        {
          id: 91,
          name: 'Sifat Surat',
          path: `${baseDomain}/reference/letter-nature`,
        },
        {
          id: 92,
          name: 'Jenis Surat',
          path: `${baseDomain}/reference/letter-type`,
        },
        {
          id: 93,
          name: 'Asal Surat',
          path: `${baseDomain}/reference/letter-origin`,
        },
        {
          id: 94,
          name: 'Klasifikasi Surat',
          path: `${baseDomain}/reference/letter-classification`,
        },
        {
          id: 95,
          name: 'Waktu Pengingat Agenda',
          path: `${baseDomain}/reference/reminder-agenda`,
        },
      ],
    },
  ]
}

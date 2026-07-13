import {
  MdDashboard,
  MdDatasetLinked,
  MdLocalHospital,
  MdPermContactCalendar,
} from 'react-icons/md'
import { FaBriefcaseMedical } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdPeople } from 'react-icons/io'

const baseDomain = '/modules/sim-rs'

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
      name: 'Profil Rumah Sakit',
      path: `${baseDomain}/profile`,
      icon: <MdLocalHospital className={'size-5'} />,
    },
    {
      id: 3,
      name: 'Pelayanan',
      path: `${baseDomain}/services`,
      icon: <FaBriefcaseMedical className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Pendaftaran',
          path: `${baseDomain}/services/registration`,
        },
        {
          id: 32,
          name: 'Pemeriksaan',
          path: `${baseDomain}/services/examination`,
        },
        {
          id: 33,
          name: 'Rawat Inap',
          path: `${baseDomain}/services/inpatient`,
        },
      ],
    },
    {
      id: 4,
      name: 'Jadwal Dokter',
      path: `${baseDomain}/schedule`,
      icon: <MdPermContactCalendar className={'size-5'} />,
    },
    {
      id: 5,
      name: 'Laporan',
      path: `${baseDomain}/report`,
      icon: <IoStatsChart className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Laporan Pasien',
          path: `${baseDomain}/report/patient-report`,
        },
        {
          id: 52,
          name: 'Laporan Kunjungan',
          path: `${baseDomain}/report/visit-report`,
        },
        {
          id: 53,
          name: 'Laporan Rawat Inap',
          path: `${baseDomain}/report/inpatient-report`,
        },
      ],
    },
    {
      id: 6,
      name: 'Management User',
      path: `${baseDomain}/user-management`,
      icon: <IoMdPeople className={'size-5'} />,
      child: [
        {
          id: 61,
          name: 'Daftar User',
          path: `${baseDomain}/user-management/user-list`,
        },
        {
          id: 62,
          name: 'Role',
          path: `${baseDomain}/user-management/role`,
        },
      ],
    },
    {
      id: 7,
      name: 'Referensi',
      path: `${baseDomain}/reference`,
      icon: <MdDatasetLinked className={'size-5'} />,
      child: [
        {
          id: 71,
          name: 'Pasien',
          path: `${baseDomain}/reference/patient`,
        },
        {
          id: 72,
          name: 'Dokter',
          path: `${baseDomain}/reference/doctor`,
        },
        {
          id: 73,
          name: 'Poli',
          path: `${baseDomain}/reference/poli`,
        },
        {
          id: 74,
          name: 'Ruangan',
          path: `${baseDomain}/reference/room`,
        },
        {
          id: 75,
          name: 'Spesialisasi Dokter',
          path: `${baseDomain}/reference/specialist`,
        },
        {
          id: 76,
          name: 'Jenis Ruangan',
          path: `${baseDomain}/reference/room-type`,
        },
      ],
    },
  ]
}

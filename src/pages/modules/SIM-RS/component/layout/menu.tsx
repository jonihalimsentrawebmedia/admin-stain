import {
  MdDashboard,
  MdDatasetLinked,
  MdLocalHospital,
  MdLocalPharmacy,
  MdPermContactCalendar,
} from 'react-icons/md'
import { FaBriefcaseMedical } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdPeople } from 'react-icons/io'
import { FaGear } from 'react-icons/fa6'

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
      key: 'PROFIL_RUMAH_SAKIT',
      icon: <MdLocalHospital className={'size-5'} />,
    },
    {
      id: 3,
      name: 'Pelayanan',
      path: `${baseDomain}/services`,
      key: 'PELAYANAN',
      icon: <FaBriefcaseMedical className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Pendaftaran',
          path: `${baseDomain}/services/registration`,
          key: 'PENDAFTARAN',
        },
        {
          id: 32,
          name: 'Rawat Jalan',
          path: `${baseDomain}/services/outpatient`,
          key: 'RAWAT_JALAN',
        },
        {
          id: 33,
          name: 'Rawat Inap',
          path: `${baseDomain}/services/inpatient`,
          key: 'RAWAT_INAP',
        },
      ],
    },
    {
      id: 9,
      name: 'Farmasi',
      path: `${baseDomain}/pharmacy`,
      key: 'FARMASI',
      icon: <MdLocalPharmacy className={'size-5'} />,
      child: [
        {
          id: 91,
          name: 'Daftar Obat',
          key: 'OBAT',
          path: `${baseDomain}/pharmacy/medicine`,
        },
        {
          id: 92,
          name: 'Resep Obat',
          path: `${baseDomain}/pharmacy/prescription`,
        },
        // {
        //   id: 93,
        //   name: 'Riwayat Penyerahan Obat',
        //   path: `${baseDomain}/pharmacy/medicine-delivery`,
        // },
      ],
    },
    {
      id: 4,
      name: 'Jadwal Dokter',
      path: `${baseDomain}/schedule`,
      key: 'JADWAL_DOKTER',
      icon: <MdPermContactCalendar className={'size-5'} />,
    },
    {
      id: 5,
      name: 'Laporan',
      path: `${baseDomain}/report`,
      key: 'LAPORAN',
      icon: <IoStatsChart className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Laporan Pasien',
          path: `${baseDomain}/report/patient-report`,
          key: 'LAPORAN_PASIEN',
        },
        {
          id: 52,
          name: 'Laporan Kunjungan',
          path: `${baseDomain}/report/visit-report`,
          key: 'LAPORAN_KUNJUNGAN',
        },
        {
          id: 53,
          name: 'Laporan Rawat Inap',
          path: `${baseDomain}/report/inpatient-report`,
          key: 'LAPORAN_RAWAT_INAP',
        },
      ],
    },
    {
      id: 6,
      name: 'Management User',
      key: 'MANAJEMEN_USER',
      path: `${baseDomain}/user-management`,
      icon: <IoMdPeople className={'size-5'} />,
      child: [
        {
          id: 61,
          name: 'Daftar User',
          path: `${baseDomain}/user-management/user-list`,
          key: 'DAFTAR_USER',
        },
        {
          id: 62,
          name: 'Role',
          path: `${baseDomain}/user-management/role`,
          key: 'ROLE_USER',
        },
      ],
    },
    {
      id: 7,
      name: 'Referensi',
      path: `${baseDomain}/reference`,
      key: 'REFERENSI',
      icon: <MdDatasetLinked className={'size-5'} />,
      child: [
        {
          id: 71,
          name: 'Pasien',
          path: `${baseDomain}/reference/patient`,
          key: 'PASIEN',
        },
        {
          id: 72,
          name: 'Dokter',
          path: `${baseDomain}/reference/doctor`,
          key: 'DOKTER',
        },
        {
          id: 73,
          name: 'Poli',
          path: `${baseDomain}/reference/poli`,
          key: 'POLI',
        },
        {
          id: 74,
          name: 'Ruangan',
          path: `${baseDomain}/reference/room`,
          key: 'RUANGAN',
        },
        {
          id: 75,
          name: 'Spesialisasi Dokter',
          path: `${baseDomain}/reference/specialist`,
          key: 'SPESIALIS',
        },
        {
          id: 76,
          name: 'Jenis Ruangan',
          path: `${baseDomain}/reference/room-type`,
          key: 'JENIS_RUANGAN',
        },
        {
          id: 77,
          name: 'Diagnosis (ICD-10)',
          path: `${baseDomain}/reference/diagnosis`,
          key: 'DIAGNOSIS',
        },
        {
          id: 78,
          name: 'Tindakan (ICD-9-CM)',
          path: `${baseDomain}/reference/procedure`,
          key: 'TINDAKAN',
        },
        {
          id: 79,
          name: 'Sumber Biaya Pengobatan',
          path: `${baseDomain}/reference/source-medical-treatment`,
          key: 'SUMBER_BIAYA_PENGOBATAN',
        },
      ],
    },
    {
      id: 8,
      name: 'Pengaturan',
      path: `${baseDomain}/setting`,
      key: 'PENGATURAN',
      icon: <FaGear className={'size-5'} />,
      child: [
        {
          id: 81,
          name: 'Pengaturan Warna',
          path: `${baseDomain}/setting/color`,
          key: 'PENGATURAN_WARNA',
        },
        {
          id: 82,
          name: 'Kode Rekam Medis',
          path: `${baseDomain}/setting/code`,
          key: 'PENOMORAN_REKAM_MEDIS',
        },
      ],
    },
  ]
}

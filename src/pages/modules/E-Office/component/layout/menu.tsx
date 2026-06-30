import { MdDashboard, MdOutgoingMail, MdRoomPreferences } from 'react-icons/md'
import { FaArchive, FaListUl, FaRegCalendarAlt } from 'react-icons/fa'
import { IoMailUnread } from 'react-icons/io5'
import { FaGear, FaUsers } from 'react-icons/fa6'
import { RiMailAiFill } from 'react-icons/ri'
import { BiSolidPlaneAlt } from 'react-icons/bi'
import { PiStudentFill } from 'react-icons/pi'

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
      id: 2,
      name: 'Layanan',
      path: `${baseDomain}/service`,
      icon: <FaArchive className={'size-5'} />,
      child: [
        {
          id: 21,
          name: 'Jenis Layanan',
          path: `${baseDomain}/service/service-type`,
        },
      ],
    },
    {
      id: 3,
      name: 'Surat Masuk',
      path: `${baseDomain}/inbox`,
      icon: <IoMailUnread className={'size-5'} />,
      child: [
        {
          id: 31,
          name: 'Registrasi Surat Masuk',
          path: `${baseDomain}/inbox/registration-inbox`,
        },
        {
          id: 32,
          name: 'Daftar Surat Masuk',
          path: `${baseDomain}/inbox/inbox-list`,
        },
        {
          id: 33,
          name: 'Disposisi Surat',
          path: `${baseDomain}/inbox/inbox-disposition`,
        },
        {
          id: 34,
          name: 'Tembusan Surat',
          path: `${baseDomain}/inbox/copy-letter`,
        },
      ],
    },
    {
      id: 4,
      name: 'Surat Keluar',
      path: `${baseDomain}/outbox`,
      icon: <MdOutgoingMail className={'size-5'} />,
      child: [
        {
          id: 41,
          name: 'Registrasi Surat Keluar',
          path: `${baseDomain}/outbox/registration-outbox`,
        },
        {
          id: 42,
          name: 'Daftar Surat Keluar',
          path: `${baseDomain}/outbox/outbox-list`,
        },
      ],
    },
    {
      id: 10,
      name: 'Buat Surat',
      path: `${baseDomain}/letter-generation`,
      icon: <RiMailAiFill className={'size-5'} />,
      child: [
        {
          id: 101,
          name: 'Kode Nomor Surat',
          path: `${baseDomain}/letter-generation/code-letter`,
        },
        {
          id: 102,
          name: 'Kelompok Surat',
          path: `${baseDomain}/letter-generation/letter-type`,
        },
        {
          id: 103,
          name: 'Buat Surat',
          path: `${baseDomain}/letter-generation/create-letter`,
        },
        {
          id: 104,
          name: 'Daftar Surat',
          path: `${baseDomain}/letter-generation/letter-list`,
        },
      ],
    },
    {
      id: 11,
      name: 'Perjalanan Dinas',
      path: `${baseDomain}/official-travel`,
      icon: <BiSolidPlaneAlt className={'size-5'} />,
      child: [
        {
          id: 111,
          name: 'Surat Tugas / SPD',
          path: `${baseDomain}/official-travel/letter-assignment`,
        },
        {
          id: 112,
          name: 'Pejabat',
          path: `${baseDomain}/official-travel/pejabat`,
        },
        {
          id: 113,
          name: 'Anggaran',
          path: `${baseDomain}/official-travel/budget`,
        },
      ],
    },
    {
      id: 5,
      name: 'Agenda',
      path: `${baseDomain}/agenda`,
      icon: <FaListUl className={'size-5'} />,
      child: [
        {
          id: 51,
          name: 'Agenda Surat Masuk',
          path: `${baseDomain}/agenda/inbox`,
        },
        {
          id: 52,
          name: 'Agenda Surat Keluar',
          path: `${baseDomain}/agenda/outbox`,
        },
      ],
    },
    {
      id: 6,
      name: 'Referensi',
      path: `${baseDomain}/reference`,
      icon: <MdRoomPreferences className={'size-5'} />,
      child: [
        {
          id: 61,
          name: 'Sifat Surat',
          path: `${baseDomain}/reference/letter-nature`,
        },
        {
          id: 62,
          name: 'Jenis Surat',
          path: `${baseDomain}/reference/letter-type`,
        },
        {
          id: 63,
          name: 'Asal Surat',
          path: `${baseDomain}/reference/letter-origin`,
        },
        {
          id: 64,
          name: 'Klasifikasi Surat',
          path: `${baseDomain}/reference/letter-classification`,
        },
        {
          id: 65,
          name: 'Waktu Pengingat Agenda',
          path: `${baseDomain}/reference/reminder-agenda`,
        },
        {
          id: 66,
          name: 'Jenis Keperluan',
          path: `${baseDomain}/reference/purpose-type`,
        },
        {
          id: 67,
          name: 'Tujuan Bertamu',
          path: `${baseDomain}/reference/purpose-guest`,
        },
        {
          id: 68,
          name: 'Jenis Transportasi',
          path: `${baseDomain}/reference/transport-type`,
        },
        {
          id: 69,
          name: 'Jenis Biaya',
          path: `${baseDomain}/reference/costing-type`,
        },
      ],
    },
    {
      id: 7,
      name: 'Buku Tamu',
      path: `${baseDomain}/guestbook`,
      icon: <FaUsers className={'size-5'} />,
      child: [
        {
          id: 71,
          name: 'Daftar Buku Tamu',
          path: `${baseDomain}/guestbook/guestbook-list`,
        },
        {
          id: 72,
          name: 'Kuisioner',
          path: `${baseDomain}/guestbook/questionnaire`,
        },
      ],
    },
    {
      id: 8,
      name: 'Acara & Kegiatan',
      path: `${baseDomain}/event-activity`,
      icon: <FaRegCalendarAlt />,
      child: [
        {
          id: 81,
          name: 'Data Acara',
          path: `${baseDomain}/event-activity/event-data`,
        },
        {
          id: 82,
          name: 'Laporan',
          path: `${baseDomain}/event-activity/report`,
        },
      ],
    },
    {
      id: 9,
      name: 'Pengaturan',
      path: `${baseDomain}/settings`,
      icon: <FaGear />,
      child: [
        {
          id: 91,
          name: 'Penerima Notifikasi',
          path: `${baseDomain}/settings/accept-notification`,
        },
        {
          id: 92,
          name: 'Kop Surat',
          path: `${baseDomain}/settings/letter-header`,
        },
      ],
    },
    {
      id: 12,
      name: 'Mahasiswa',
      path: `${baseDomain}/student`,
      icon: <PiStudentFill className={'size-5'} />,
      child: [
        {
          id: 121,
          name: 'Program Studi',
          path: `${baseDomain}/student/study-program`,
        },
        {
          id: 122,
          name: 'Jalur Masuk',
          path: `${baseDomain}/student/admission-process`,
        },
        {
          id: 123,
          name: 'Status Mahasiswa',
          path: `${baseDomain}/student/student-status`,
        },
        {
          id: 124,
          name: 'Agama',
          path: `${baseDomain}/student/religion`,
        },
        {
          id: 125,
          name: 'Data Mahasiswa',
          path: `${baseDomain}/student/student-data`,
        },
      ],
    },
  ]
}

import { IoMailUnread } from 'react-icons/io5'
import { FaUsers } from 'react-icons/fa6'
import { FaRegCalendarAlt } from 'react-icons/fa'
import {
  UseGerUrgentInformation,
  UseGetDashboardAgenda,
  UseGetDashboardCounts,
  UseGetDashboardInboxList,
  UseGetStatisticLetterByTime,
} from '@/pages/modules/E-Office/dashboard/hooks'
import { ColumnsInboxDashboard } from '@/pages/modules/E-Office/dashboard/data/columns.tsx'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils.ts'
import { MdMailOutline } from 'react-icons/md'
import { PiTelegramLogo } from 'react-icons/pi'
import { LuUsers } from 'react-icons/lu'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { TbPencilMinus } from 'react-icons/tb'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticsChart from '@/pages/modules/E-Office/dashboard/component/lineChart.tsx'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar.tsx'
import { format } from 'date-fns'

const DashboardEOfficePage = () => {
  const { counts } = UseGetDashboardCounts()
  const [searchParams] = useSearchParams()
  const periode = searchParams.get('periode') ?? 'enam_bulan'
  const { profileUser } = UseGetUserProfile()
  const { inboxDashboard } = UseGetDashboardInboxList()
  const { statisticTime } = UseGetStatisticLetterByTime({
    periode: periode as 'enam_bulan',
  })
  const { todayAgenda } = UseGetDashboardAgenda({
    tanggal_mulai: '2026-05-23',
  })
  const { urgentInformation } = UseGerUrgentInformation()

  const columns = ColumnsInboxDashboard()
  const fastAccess = [
    {
      name: 'Surat Masuk',
      link: '/modules/e-office/inbox/registration-inbox',
      icon: <IoMailUnread className={'size-4'} />,
    },
    {
      name: 'Surat Keluar',
      link: '/modules/e-office/outbox/registration-outbox',
      icon: <IoMailUnread className={'size-4'} />,
    },
    {
      name: 'Buat Surat',
      icon: <TbPencilMinus className={'size-4'} />,
      link: '/modules/e-office/letter-generation/create-letter',
    },
    {
      name: 'Buku Tamu',
      link: '/modules/e-office/guestbook/guestbook-list',
      icon: <FaUsers className={'size-4'} />,
    },
    {
      name: 'Acara & Kegiatan',
      link: '/modules/e-office/event-activity/event-data',
      icon: <FaRegCalendarAlt className={'size-4'} />,
    },
  ]
  const urgentData = [
    {
      text: 'Surat Menunggu Disposisi',
      desc: 'Segera lakukan disposisi',
      clasName: 'bg-red-100 text-red-500 shadow',
      total: urgentInformation?.surat_disposisi,
    },
    {
      text: 'Tamu Hari ini',
      desc: 'Segera Lihat Buku Tamu Hari ini',
      clasName: 'bg-blue-100 text-blue-500 shadow',
      total: urgentInformation?.buku_tamu_bulan_ini,
    },
    {
      text: 'Agenda Hari ini',
      desc: 'Jangan Lewatkan Agenda Penting',
      clasName: 'bg-green-100 text-green-500 shadow',
      total: urgentInformation?.agenda_bulan_ini,
    },
  ]
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <div className={'grid grid-cols-12 gap-4'}>
        <div className="col-span-9">
          <p className="text-2xl text-primary font-semibold">
            Selamat Datang, {profileUser?.nama_lengkap} 👋
          </p>
          <p>Berikut Ringkatan Aktivitas sis E-office Hari ini</p>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {counts?.items?.map((row, k) => (
              <div key={k} className={'bg-white shadow rounded p-4 space-y-1.5'}>
                <div className="flex items-start gap-4">
                  {row?.label.includes('Surat Masuk') ? (
                    <div className={'p-3 rounded w-fit bg-blue-100'}>
                      <MdMailOutline className={'size-5 text-blue-500'} />
                    </div>
                  ) : row?.label.includes('Surat Keluar') ? (
                    <div className={'p-3 rounded w-fit bg-green-100'}>
                      <PiTelegramLogo className={'size-5 text-green-500'} />
                    </div>
                  ) : row?.label.includes('Buku Tamu') ? (
                    <div className={'p-3 rounded w-fit bg-purple-100'}>
                      <LuUsers className={'size-5 text-purple-500'} />
                    </div>
                  ) : (
                    <div className={'p-3 rounded w-fit bg-orange-100'}>
                      <FaRegCalendarAlt className={'size-5 text-orange-500'} />
                    </div>
                  )}
                  <div>
                    <p className={'font-semibold'}>{row?.label}</p>
                    <p className={'text-2xl font-semibold'}>{row?.this_month}</p>
                  </div>
                </div>
                <p
                  className={cn(
                    'flex items-center gap-1.5 text-sm',
                    row?.trend === 'naik'
                      ? 'text-green-500'
                      : row?.trend === 'turun'
                        ? 'text-red-500'
                        : 'text-black'
                  )}
                >
                  {row?.trend === 'naik' ? (
                    <ArrowUp className={'size-4 text-green-500'} />
                  ) : row?.trend === 'turun' ? (
                    <ArrowDown className={'size-4 text-red-500'} />
                  ) : (
                    <></>
                  )}
                  {row?.percent_change}
                </p>
                <p className={'text-xs text-gray-500'}> Dari Bulan Lalu</p>
              </div>
            ))}
          </div>

          <p className={'text-2xl font-semibold mt-4'}>Akses Cepat</p>
          <div className="mt-4 grid grid-cols-5 gap-5">
            {fastAccess?.map((row, k) => (
              <Link to={row?.link} key={k}>
                <div
                  className={cn(
                    'rounded-lg flex items-center gap-1.5 bg-white p-4 text-start',
                    'w-full border-primary text-primary hover:text-primary border'
                  )}
                  key={k}
                >
                  {row?.icon}
                  {row?.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white shadow rounded p-4 border mt-5">
            <p className="text-2xl font-semibold">Surat Masuk Terbaru</p>
            <TableCustom
              className={'mt-4'}
              data={inboxDashboard}
              columns={columns}
              isShowPagination={false}
              isShowFilter={false}
              isShowLimit={false}
            />
          </div>

          {statisticTime && statisticTime?.items?.length > 0 && (
            <StatisticsChart
              data={statisticTime.items.map((item) => ({
                month: item.label.replace(/\s\d{4}/, ''),
                suratMasuk: item.surat_masuk,
                suratKeluar: item.surat_keluar,
              }))}
            />
          )}
        </div>
        <div className="col-span-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border w-full"
          />
          <div className="bg-white p-4 rounded shadow mt-4">
            <p className="text-lg text-primary font-semibold">Agenda Hari ini</p>
            <ul className={'text-primary mt-2 space-y-2.5'}>
              {todayAgenda?.map((row, k) => (
                <li key={k} className={'flex items-start gap-2.5'}>
                  <div className={'w-fit flex items-center gap-1.5'}>
                    <div
                      style={{ backgroundColor: row?.warna_sifat_surat }}
                      className="p-1.5 w-fit rounded-full"
                    />
                    <p>{format(row?.tanggal_mulai, 'HH:mm')}</p>
                  </div>
                  <div>
                    <p className={'text-sm font-semibold'}>{row?.nama_kegiatan}</p>
                    <p className={'text-gray-500 text-xs'}>{row?.tempat}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 shadow mt-4">
            <p className="text-2xl font-semibold">Informasi Penting</p>
            <ul className={'space-y-4 mt-4'}>
              {urgentData?.map((row, k) => (
                <div key={k} className={cn(row.clasName, 'p-4')}>
                  <p className={'text-lg font-semibold'}>
                    {row.total} {row?.text}
                  </p>
                  <p className={'text-gray-500'}>{row?.desc}</p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardEOfficePage

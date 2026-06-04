import { Button } from '@/components/ui/button.tsx'
import { IoMailUnread } from 'react-icons/io5'
import { FaUsers } from 'react-icons/fa6'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {
  UseGetDashboardCounts,
  UseGetDashboardInboxList,
  UseGetStatisticInbox,
  UseGetStatisticOutbox,
} from '@/pages/modules/E-Office/dashboard/hooks'
import ICON1 from '/public/Frame26.png'
import ICON2 from '/public/Frame25.png'
import ICON3 from '/public/Frame24.png'
import ICON4 from '/public/Frame27.png'
import { ColumnsInboxDashboard } from '@/pages/modules/E-Office/dashboard/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ChartLetterNature from '@/pages/modules/E-Office/dashboard/component/inboxChart.tsx'

const DashboardEOfficePage = () => {
  const { counts } = UseGetDashboardCounts()
  const { inboxDashboard } = UseGetDashboardInboxList()
  const { statisticInbox } = UseGetStatisticInbox()
  const { statisticOutbox } = UseGetStatisticOutbox()
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
  const countsList = [
    { image: ICON1, text: 'Total Surat Masuk', counts: counts?.suratMasuk },
    { image: ICON2, text: 'Total Surat Keluar', counts: counts?.suratKeluar },
    { image: ICON3, text: 'Total Tamu', counts: counts?.acaraDaftarHadir },
    { image: ICON4, text: 'Total Acara', counts: counts?.acara },
  ]

  return (
    <>
      <div className="space-y-5">
        <p className="text-2xl font-semibold">Akses Cepat</p>
        <div className="flex items-center gap-2">
          {fastAccess?.map((row, k) => (
            <Link to={row?.link} key={k}>
              <Button
                variant={'outline'}
                className={'rounded-full border-primary text-primary hover:text-primary'}
                key={k}
              >
                {row?.icon}
                {row?.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          {countsList?.map((row, k) => (
            <div key={k} className="flex flex-col shadow rounded-lg p-4 bg-white gap-2">
              <img src={row?.image} alt="icon" className="w-10 h-10 object-cover" />
              <p className="text-gray-500 text-sm">{row?.text}</p>
              <p className="text-2xl font-semibold">{row?.counts}</p>
            </div>
          ))}
        </div>

        <p className="text-2xl font-semibold mt-5">Surat Masuk Terbaru</p>
        <div className="bg-white shadow rounded p-4 border">
          <TableCustom
            data={inboxDashboard}
            columns={columns}
            isShowPagination={false}
            isShowFilter={false}
            isShowLimit={false}
          />
        </div>

        <div className={'flex items-center text-gray-500 gap-1.5'}>
          <p className="text-sm whitespace-nowrap">Grafik Sifat Surat</p>
          <div className={'border w-full'} />
        </div>
        <div className="flex items-center gap-5 w-full mt-5">
          <ChartLetterNature label={'Surat Masuk'} data={statisticInbox} />
          <ChartLetterNature label={'Surat Keluar'} data={statisticOutbox} />
        </div>
      </div>
    </>
  )
}

export default DashboardEOfficePage

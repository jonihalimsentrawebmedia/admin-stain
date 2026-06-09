import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { cn } from '@/lib/utils.ts'
import { SectionFile } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/file-support/sectionFile.tsx'
import DocumentationEventActivity from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation'
import MeetingMinutes from '@/pages/modules/E-Office/event-activity/event-data/detail/component/meeting-minutes'
import ExpenditureSection from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure'
import { Check } from 'lucide-react'
import ReportActivity from '@/pages/modules/E-Office/event-activity/event-data/detail/component/report-activity'
import ListAttendance from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces'
import { useSearchParams } from 'react-router-dom'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'

interface Props {
  detail?: IEvent
}

const MenuEvent = (props: Props) => {
  const { detail } = props
  const TabsData = [
    { id: 1, value: 'file', label: 'File Pendukung', element: <SectionFile /> },
    {
      id: 2,
      value: 'attendance',
      label: 'Daftar Hadir',
      element: <ListAttendance detail={detail} />,
    },
    {
      id: 3,
      value: 'documentation',
      label: 'Dokumentasi',
      element: <DocumentationEventActivity detail={detail} />,
    },
    { id: 4, value: 'notulen', label: 'Notulen', element: <MeetingMinutes /> },
    {
      id: 5,
      value: 'cost',
      label: 'Pengeluaran Keuangan',
      element: <ExpenditureSection detail={detail} />,
    },
    { id: 6, value: 'report', label: 'Laporan Kegiatan', element: <ReportActivity /> },
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const tabs = searchParams.get('tabs') ?? 'file'

  return (
    <>
      <Tabs
        value={tabs}
        onValueChange={(e) => {
          const Params = new URLSearchParams(searchParams)
          Params.set('tabs', e)
          setSearchParams(Params.toString())
        }}
        className="w-full h-full flex items-start flex-col! gap-x-5"
      >
        <TabsList
          className={cn(
            'w-full h-full flex flex-col gap-2 justify-start items-start bg-white shadow border p-5'
          )}
        >
          <p key={'asd'} className="text-2xl font-semibold">
            Menu Detail Acara
          </p>
          <div className={'flex items-center gap-2 w-full whitespace-nowrap'}>
            {TabsData?.map((row, k) => (
              <TabsTrigger
                key={k}
                value={row?.value}
                className={cn(
                  'border border-primary w-full text-start rounded',
                  'data-[state=active]:bg-yellow-600 data-[state=active]:text-primary',
                  'whitespace-nowrap'
                )}
              >
                <p className="w-full text-start flex items-center gap-2 whitespace-nowrap">
                  {tabs === row?.value && <Check />}
                  {row?.label}
                </p>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        {TabsData?.map((row, k) => (
          <TabsContent key={k} value={row?.value} className={'w-full'}>
            {row?.element}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

export default MenuEvent

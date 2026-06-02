import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { cn } from '@/lib/utils.ts'
import { useState } from 'react'
import { SectionFile } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/file-support/sectionFile.tsx'
import DocumentationEventActivity from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation'
import MeetingMinutes from '@/pages/modules/E-Office/event-activity/event-data/detail/component/meeting-minutes'
import ExpenditureSection from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure'
import { Check } from 'lucide-react'
import ReportActivity from '@/pages/modules/E-Office/event-activity/event-data/detail/component/report-activity'
import ListAttendance from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces'

const MenuEvent = () => {
  const TabsData = [
    { id: 1, value: 'file', label: 'File Pendukung', element: <SectionFile /> },
    { id: 2, value: 'attendance', label: 'Daftar Hadir', element: <ListAttendance /> },
    {
      id: 3,
      value: 'documentation',
      label: 'Dokumentasi',
      element: <DocumentationEventActivity />,
    },
    { id: 4, value: 'notulen', label: 'Notulen', element: <MeetingMinutes /> },
    { id: 4, value: 'cost', label: 'Pengeluaran Keuangan', element: <ExpenditureSection /> },
    { id: 4, value: 'report', label: 'Laporan Kegiatan', element: <ReportActivity /> },
    { id: 4, value: 'share to', label: 'Dibagikan Ke' },
  ]

  const [tabValue, setTabValue] = useState(TabsData[0]?.value)

  return (
    <>
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-full h-full flex items-start flex-row! gap-x-5"
      >
        <TabsList
          className={
            'w-1/5 h-full flex flex-col gap-2 justify-start items-start bg-white shadow border p-5'
          }
        >
          <p key={'asd'} className="text-2xl font-semibold">
            Menu Detail Acara
          </p>
          {TabsData?.map((row, k) => (
            <TabsTrigger
              key={k}
              value={row?.value}
              className={cn(
                'border border-primary w-full text-start rounded',
                'data-[state=active]:bg-yellow-600 data-[state=active]:text-primary'
              )}
            >
              <p className="w-full text-start flex items-center gap-2">
                {tabValue === row?.value && <Check />}
                {row?.label}
              </p>
            </TabsTrigger>
          ))}
        </TabsList>
        {TabsData?.map((row, k) => (
          <TabsContent key={k} value={row?.value}>
            {row?.element}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

export default MenuEvent

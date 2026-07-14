import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetReportStatusActive } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/hook'
import { ColumnsReports } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { ChartStatusActive } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/component/grafict.tsx'

export const ReportData = () => {
  const { report, loading } = UseGetReportStatusActive()
  const coloumns = ColumnsReports()
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup isBack label="Laporan Status Aktif" buttonGroup={[]} />

        <Tabs className={'w-full h-full'} defaultValue={'table'}>
          <TabsList className={'w-full sm:w-fit h-full bg-white rounded-none flex gap-2 items-center overflow-x-auto'}>
            <p>Tampilkan</p>
            <TabsTrigger
              value="table"
              className={
                'border border-primary rounded data-[state=active]:bg-primary data-[state=active]:text-white!'
              }
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              className={
                'border border-primary rounded data-[state=active]:bg-primary data-[state=active]:text-white!'
              }
              value="grafik"
            >
              Grafik
            </TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <TableCustom isShowFilter={false} columns={coloumns} data={report} loading={loading} />
          </TabsContent>
          <TabsContent value="grafik">
            <ChartStatusActive data={report} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

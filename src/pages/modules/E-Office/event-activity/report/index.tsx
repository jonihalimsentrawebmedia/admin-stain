import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetEventYear, UseGetReportEventActivity } from './hooks'
import { useSearchParams } from 'react-router-dom'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { ColumnsEventReport } from '@/pages/modules/E-Office/event-activity/report/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ReportEventActivity = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const year = searchParams.get('year') ?? ''
  const { report, meta, loading } = UseGetReportEventActivity({
    page,
    year,
    limit,
    search,
  })
  const { years } = UseGetEventYear()
  const columns = ColumnsEventReport()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Laporan'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Laporan'} valueGuide="E_OFFICE_EVENT_ACTIVITY" /> }]} />
        <FilterSelect
          className={'w-1/3'}
          placeholder={'Tahun'}
          data={years?.map((row) => ({
            label: row.toString(),
            value: row.toString(),
          }))}
          name={'year'}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={report}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ReportEventActivity

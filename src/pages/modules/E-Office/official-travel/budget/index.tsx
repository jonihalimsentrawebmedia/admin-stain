import { UseGetBudgetOfficialTravel } from '@/pages/modules/E-Office/official-travel/budget/hooks'
import { useSearchParams } from 'react-router-dom'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddBudget from '@/pages/modules/E-Office/official-travel/budget/component/buttonAdd.tsx'
import { ColumnsBudget } from '@/pages/modules/E-Office/official-travel/budget/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const BudgetOfficialTravel = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const tahun = searchParams.get('tahun') ?? ''
  const { budget, meta, loading } = UseGetBudgetOfficialTravel({
    page,
    limit,
    search,
    tahun,
  })
  const columns = ColumnsBudget()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          label={'Anggaran'}
          buttonGroup={[
            { type: 'custom', element: <ButtonGoToGuide titleGuide={'Anggaran'} valueGuide="E_OFFICE_OFFICIAL_TRAVEL" /> },
            { type: 'custom', element: <ButtonAddBudget /> },
          ]}
        />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={budget}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

export default BudgetOfficialTravel

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPlanning } from '@/pages/modules/LPPM/research/plan/component/buttonAdd.tsx'
import { UseGetResearchPlan } from '@/pages/modules/LPPM/research/plan/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { ColumnsResearchPlan } from '@/pages/modules/LPPM/research/plan/data/columns.tsx'

export const PlanMainResearch = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { researchPlan, loading, meta } = UseGetResearchPlan({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsResearchPlan()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Rencana Induk Penelitian'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPlanning />,
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'w-[120px]'}
              name="limit"
              label="Jlh Data"
              options={[10, 25, 50, 100].map((item) => {
                return {
                  label: item.toString(),
                  value: item.toString(),
                }
              })}
            />
          }
          data={researchPlan}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStaff } from '@/pages/modules/LPPM/about/staff/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { useSearchParams } from 'react-router-dom'
import { ColumnsStaff } from '@/pages/modules/LPPM/about/staff/hooks/columns.tsx'
import { ButtonAddStaffLPPM } from '@/pages/modules/LPPM/about/staff/component/buttonAdd.tsx'

export const ProfileStaffLPPM = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { staff, loading, meta } = UseGetStaff({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsStaff()

  return (
    <>
      <ButtonTitleGroup
        label={'Staff LPPM'}
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonAddStaffLPPM />,
          },
        ]}
      />

      <TableCustom
        data={staff}
        columns={columns}
        loading={loading}
        meta={meta}
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
      />
    </>
  )
}

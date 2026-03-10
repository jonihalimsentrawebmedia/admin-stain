import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/component/buttonAdd.tsx'
import { UseGetSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/data/columns.tsx'
import { useSearchParams } from 'react-router-dom'

export const SpecializationPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { specialization, meta, loading } = UseGetSpecialization({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsSpecialization()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Spesialisasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddSpecialization />,
            },
          ]}
        />

        <TableCustom data={specialization} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

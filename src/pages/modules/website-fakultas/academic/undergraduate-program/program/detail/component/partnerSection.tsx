import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPartner } from './buttonAdd'
import { UseGetUniversityPartner } from '../hooks/index'
import { useParams, useSearchParams } from 'react-router-dom'
import { ColumnsPartnerUndergraduate } from '../data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const PartnerSection = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const { partner, meta, loading } = UseGetUniversityPartner({
    id: id as string,
    page: page,
    limit: limit,
  })
  const columns = ColumnsPartnerUndergraduate()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Universitas Partner'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPartner />,
            },
          ]}
        />

        <TableCustom data={partner} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

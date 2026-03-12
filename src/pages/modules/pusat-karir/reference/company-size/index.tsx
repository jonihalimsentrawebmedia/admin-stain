import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetCompanySize } from './hooks/index.tsx'
import { ColumnsCompanySize } from './data/columns.tsx'
import { ButtonAddCompanySize } from './component/buttonAdd.tsx'

export const CompanySizePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { companySize, loading, meta } = UseGetCompanySize({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsCompanySize()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Ukuran Perusahaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCompanySize />,
            },
          ]}
        />

        <TableCustom data={companySize} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

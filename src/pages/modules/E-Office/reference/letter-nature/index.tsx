import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddLetterNature from '@/pages/modules/E-Office/reference/letter-nature/component/buttonAdd.tsx'
import { USeGetLetterNature } from '@/pages/modules/E-Office/reference/letter-nature/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsLetterNature } from '@/pages/modules/E-Office/reference/letter-nature/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListLetterNature = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterNature, meta, loading } = USeGetLetterNature({
    page,
    limit,
    search,
  })
  const columns = ColumnsLetterNature()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Sifat Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetterNature />,
            },
          ]}
        />

        <TableCustom data={letterNature} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
export default ListLetterNature

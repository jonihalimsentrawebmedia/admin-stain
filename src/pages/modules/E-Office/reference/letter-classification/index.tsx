import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddLetterClassification from './component/buttonAdd.tsx'
import { USeGetLetterClassification } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsLetterClassification } from './data/columns.tsx'
import { DataTableRecursive } from '@/pages/modules/E-Office/component/common/tableRecursif.tsx'

const ListLetterClassification = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterClassification } = USeGetLetterClassification({
    page,
    limit,
    search,
  })
  const columns = ColumnsLetterClassification()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Klasifikasi Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetterClassification />,
            },
          ]}
        />

        <DataTableRecursive data={letterClassification} columns={columns} />
      </div>
    </>
  )
}
export default ListLetterClassification

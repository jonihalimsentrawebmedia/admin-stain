import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetTypeLetters } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import { useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCreateLetterByType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/columns.tsx'

const CreateLetterByTypePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { letterType, meta, loading } = UseGetTypeLetters({
    page,
    limit,
    search,
  })
  const columns = ColumnsCreateLetterByType()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Buat Surat'} buttonGroup={[]} />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={letterType}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default CreateLetterByTypePage

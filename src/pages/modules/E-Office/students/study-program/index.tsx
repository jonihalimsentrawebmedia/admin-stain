import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStudyProgram } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsStudyProgram } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListStudyProgram = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { studyProgram, meta, loading } = UseGetStudyProgram({
    page,
    limit,
    search,
  })
  const columns = ColumnsStudyProgram()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Program Studi'} buttonGroup={[]} />

        <TableCustom data={studyProgram} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
export default ListStudyProgram

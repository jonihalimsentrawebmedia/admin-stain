import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStudyProgram } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsStudyProgram } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

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
        <ButtonTitleGroup
          label={'Program Studi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Mahasiswa'} valueGuide="E_OFFICE_STUDENTS" />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={studyProgram}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListStudyProgram

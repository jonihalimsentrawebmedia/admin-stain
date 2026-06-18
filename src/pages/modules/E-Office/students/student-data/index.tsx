import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'
import { UseGetStudentData } from './hooks'
import { ColumnsStudentData } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListStudentData = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const columns = ColumnsStudentData()
  const navigate = useNavigate()
  const { loading, studentData, meta } = UseGetStudentData({
    limit,
    page,
    search,
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Data Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button onClick={() => navigate('add')} className={'rounded-full text-white'}>
                  <BiPlus />
                  Tambah Mahasiswa
                </Button>
              ),
            },
          ]}
        />

        <TableCustom data={studentData} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default ListStudentData

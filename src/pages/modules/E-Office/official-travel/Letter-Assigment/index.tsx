import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { UseGetLetterAssigment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/hooks'
import { ColumnsLetterAssigment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const LetterOfAssigment = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const tahun = searchParams.get('tahun') ?? ''
  const bulan = searchParams.get('bulan') ?? ''

  const { letterAssignment, loading, meta } = UseGetLetterAssigment({
    page,
    limit,
    search,
    tahun,
    bulan,
  })

  const columns = ColumnsLetterAssigment()

  const navigate = useNavigate()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Surat Tugas / SPD'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button className={'rounded-full text-white'} onClick={() => navigate('add')}>
                  <FaCirclePlus />
                  Tambah Surat Tugas / SPD
                </Button>
              ),
            },
          ]}
        />

        <TableCustom
          className={'border'}
          thClassName={'border-none! bg-primary text-white'}
          tdClassName={'border-none!'}
          data={letterAssignment}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default LetterOfAssigment

import { useNavigate, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import { ColumnsCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const NumberOfCodeLetterPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterNumber, meta, loading } = UseGetLetterNumberAutomatic({
    page,
    limit,
    search,
  })
  const { columns } = ColumnsCodeNumber()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Kode Nomor Surat'}
          buttonGroup={[
            { type: 'custom', element: <ButtonGoToGuide titleGuide={'Kode Nomor Surat'} valueGuide="E_OFFICE_CODE_LETTER" /> },
            {
              type: 'custom',
              element: (
                <Button className={'rounded-full text-white'} onClick={() => navigate('add')}>
                  <FaCirclePlus className={'text-yellow-500'} />
                  Tambah Kode Nomor
                </Button>
              ),
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={letterNumber}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
export default NumberOfCodeLetterPage

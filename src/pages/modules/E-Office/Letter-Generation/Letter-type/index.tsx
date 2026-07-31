import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import ButtonAddLetterType from '@/pages/modules/E-Office/Letter-Generation/Letter-type/component/buttonAdd.tsx'
import { UseGetTypeLetters } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import { useSearchParams } from 'react-router-dom'
import { LetterTypeCode } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const LetterTypePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { letterType, meta, loading } = UseGetTypeLetters({
    page,
    limit,
    search,
  })
  const { columns } = LetterTypeCode()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Kelompok Surat'}
          buttonGroup={[
            { type: 'custom', element: <ButtonGoToGuide titleGuide={'Kelompok Surat'} valueGuide="E_OFFICE_LETTER_TYPE" /> },
            { type: 'custom', element: <ButtonAddLetterType /> },
          ]}
        />
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

export default LetterTypePage

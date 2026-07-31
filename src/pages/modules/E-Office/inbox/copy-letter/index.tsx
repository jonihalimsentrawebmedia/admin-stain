import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetCopyLetter } from '@/pages/modules/E-Office/inbox/copy-letter/hooks'
import ColumnsCopyLetter from '@/pages/modules/E-Office/inbox/copy-letter/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'

export const CopyLetterPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { meta, copyLetter, loading } = UseGetCopyLetter({
    page,
    limit,
    search,
  })
  const columns = ColumnsCopyLetter()
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Tembusan Surat'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Tembusan Surat'} valueGuide="E_OFFICE_INBOX_COPY_LETTER" /> }]} />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={copyLetter}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

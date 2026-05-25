import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetCopyLetter } from '@/pages/modules/E-Office/inbox/copy-letter/hooks'
import ColumnsCopyLetter from '@/pages/modules/E-Office/inbox/copy-letter/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const CopyLetterPage = () => {
  const { meta, copyLetter, loading } = UseGetCopyLetter()
  const columns = ColumnsCopyLetter()
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Tembusan Surat'} buttonGroup={[]} />
        <TableCustom data={copyLetter} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}

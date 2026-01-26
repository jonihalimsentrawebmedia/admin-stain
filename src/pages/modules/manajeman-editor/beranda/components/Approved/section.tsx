import type { IContent } from '@/pages/modules/website-utama/beranda/types'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsApprovalEditor } from '@/pages/modules/manajeman-editor/beranda/types/columns.tsx'

interface Props {
  data: IContent[]
}

export const ApprovedSectionEditor = (props: Props) => {
  const { data } = props
  const columns = ColumnsApprovalEditor()

  return (
    <>
      <div className={'lg:max-h-[280px] overflow-y-auto border'}>
        <TableCustom
          isShowFilter={false}
          className={'text-start whitespace-pre-line'}
          tdClassName={'whitespace-pre-line border'}
          isShowPagination={false}
          data={data}
          columns={columns}
        />
      </div>
    </>
  )
}

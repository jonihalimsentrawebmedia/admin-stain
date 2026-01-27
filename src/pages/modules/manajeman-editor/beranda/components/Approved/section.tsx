import type { IContent } from '@/pages/modules/website-utama/beranda/types'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { status } from '@/pages/modules/new_editor/data/types/data.tsx'
import { RendersColumnsData } from '@/pages/modules/new_editor/data/columns'

interface Props {
  data: IContent[]
  status: status
}

export const ApprovedSectionEditor = (props: Props) => {
  const { data, status } = props
  const columns = RendersColumnsData(status)

  return (
    <>
      <div className={'overflow-y-auto border'}>
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

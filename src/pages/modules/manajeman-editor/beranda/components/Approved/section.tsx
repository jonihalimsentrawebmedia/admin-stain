import type { IContent } from '@/pages/modules/website-utama/beranda/types'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { status } from '@/pages/modules/new_editor/data/types/data.tsx'
import { RendersColumnsData } from '@/pages/modules/new_editor/data/columns'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface Props {
  data: IContent[]
  status: status
  loading: boolean
  meta?: Meta
}

export const ApprovedSectionEditor = (props: Props) => {
  const { data, status, loading, meta } = props
  const columns = RendersColumnsData(status)

  return (
    <>
      <div className={'overflow-y-auto border'}>
        <TableCustom
          isShowFilter={false}
          loading={loading}
          isShowPagination={meta && meta?.total > 10}
          meta={meta}
          className={'text-start whitespace-pre-line'}
          tdClassName={'whitespace-pre-line border'}
          data={data}
          columns={columns}
        />
      </div>
    </>
  )
}

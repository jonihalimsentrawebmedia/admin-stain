import type { IContent } from '@/pages/modules/website-utama/beranda/types'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsApprovalUnit } from '@/pages/modules/website-unit/dashboard/data/columns.tsx'

interface Props {
  data: IContent[]
}

export const ApprovedSection = (props: Props) => {
  const { data } = props
  const columns = ColumnsApprovalUnit()

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

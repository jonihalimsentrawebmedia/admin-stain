import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsApprovalUnit } from '@/pages/modules/website-unit/dashboard/data/columns'
import type { IContent } from '../../types'

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

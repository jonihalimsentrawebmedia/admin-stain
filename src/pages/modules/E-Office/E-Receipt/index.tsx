import { UseGetEReceipt } from '@/pages/modules/E-Office/E-Receipt/hooks'
import { useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddEreceipt from '@/pages/modules/E-Office/E-Receipt/component/buttonAdd.tsx'
import { ColumnsEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const EReceiptPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { ereceipt, meta, loading } = UseGetEReceipt({
    page,
    limit,
    search,
  })
  const columns = ColumnsEreceipt()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          label={'Kwitansi'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddEreceipt /> }]}
        />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={ereceipt}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

export default EReceiptPage

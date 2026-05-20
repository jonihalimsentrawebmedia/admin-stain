import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetProduct } from './hooks/index.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsProduct } from '@/pages/modules/Pulsikom/product/data/columns.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide.tsx'

export const ProductListPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { product, meta, loading } = UseGetProduct({
    page,
    limit,
    search,
  })
  const columns = ColumnsProduct()
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Produk'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={`Produk`} valueGuide="PUSILKOM_PRODUK" />,
            },
            {
              type: 'add',
              label: 'Tambah Produk',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />

        <TableCustom data={product} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

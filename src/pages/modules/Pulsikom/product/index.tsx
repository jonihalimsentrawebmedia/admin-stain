import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetProduct } from './hooks/index.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsProduct } from '@/pages/modules/Pulsikom/product/data/columns.tsx'

export const ProductListPage = () => {
  const { product, meta, loading } = UseGetProduct()
  const columns = ColumnsProduct()
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Produk'}
          buttonGroup={[
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

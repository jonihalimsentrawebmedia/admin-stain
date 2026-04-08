import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetServices } from './hooks/index'
import { ColumnsService } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ServicesSPI = () => {
  const { service, meta, loading } = UseGetServices()
  const columns = ColumnsService()
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Layanan'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Layanan',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />

        <TableCustom data={service} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

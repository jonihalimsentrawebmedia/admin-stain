import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetServices } from '@/pages/modules/Pulsikom/services/hooks'
import { ColumnsService } from '@/pages/modules/Pulsikom/services/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const ServicesPulsikom = () => {
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
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Layanan'} valueGuide="PUSILKOM_LAYANAN" />
              ),
            },
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

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetServices } from './hooks/index'
import { ColumnsService } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const ServicesSPI = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { service, meta, loading } = UseGetServices({
    page,
    limit,
    search,
  })
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
              element: <ButtonGoToGuide titleGuide={'Layanan'} valueGuide="SPI_LAYANAN" />,
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

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetService } from '@/pages/modules/website-fakultas/service/hooks'
import { ColumnsService } from '@/pages/modules/website-fakultas/service/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddService } from '@/pages/modules/website-fakultas/service/component/buttonAdd.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const ServiceListPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { service, meta, loading } = UseGetService({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsService()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          label="Layanan"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Layanan'} valueGuide="FAKULTAS_LAYANAN" />,
            },
            {
              type: 'custom',
              element: <ButtonAddService />,
            },
          ]}
        />
        <TableCustom data={service} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

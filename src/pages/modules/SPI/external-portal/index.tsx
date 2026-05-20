import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetPortal } from '@/pages/modules/SPI/external-portal/hooks'
import { ColumnsExternalPortal } from '@/pages/modules/SPI/external-portal/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddPortal } from '@/pages/modules/SPI/external-portal/component/buttonAdd.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const ExternalPortalPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { portal, loading, meta } = UseGetPortal({
    page,
    limit,
    search,
  })
  const columns = ColumnsExternalPortal()
  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          label={'Portal Eksternal'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Portal Eksternal'}
                  valueGuide="SPI_PORTAL_EKSTERNAL"
                />
              ),
            },
            { type: 'custom', element: <ButtonAddPortal /> },
          ]}
        />
        <TableCustom data={portal} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

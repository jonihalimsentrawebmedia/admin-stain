import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetListServices } from '@/pages/modules/website-unit/services/category/hooks'
import { CategoryServiceColumns } from '@/pages/modules/website-unit/services/category/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { ButtonAddCategoryService } from '@/pages/modules/website-unit/services/category/component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const ServicesList = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listServices, loading, meta } = UseGetListServices({
    page: page,
    limit: limit,
    search: search,
  })
  const { session } = UseGetSessionUnit()
  const columns = CategoryServiceColumns(session)

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Daftar Layanan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Daftar Layanan" valueGuide="PERPUSTAKAAN_LAYANAN" />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddCategoryService session={session} />,
            },
          ]}
        />

        <TableCustom columns={columns} data={listServices} loading={loading} meta={meta} />
      </div>
    </>
  )
}

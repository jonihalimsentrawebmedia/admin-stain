import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailServices } from '@/pages/modules/website-unit/services/category/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetListService } from '@/pages/modules/website-unit/services/list/hooks'
import { ColumnsListService } from '@/pages/modules/website-unit/services/list/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddListCategory } from '@/pages/modules/website-unit/services/list/component/buttonAdd.tsx'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ListServiceCategory = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { detailServices } = UseGetDetailServices(id ?? '')
  const { meta, listService, loading } = UseGetListService({
    id: id as string,
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsListService(detailServices as ICategoryServices)

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          label={`Daftar Layanan-${detailServices?.nama_layanan}`}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={`Daftar Layanan-${detailServices?.nama_layanan}`}
                  valueGuide="PERPUSTAKAAN_LAYANAN_KATEGORI_LAYANAN"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonGoToGuide valueGuide="PERPUSTAKAAN_LAYANAN_KATEGORI_LAYANAN" />,
            },
            {
              type: 'custom',
              element: <ButtonAddListCategory {...(detailServices as ICategoryServices)} />,
            },
          ]}
        />

        <TableCustom columns={columns} data={listService} loading={loading} meta={meta} />
      </div>
    </>
  )
}

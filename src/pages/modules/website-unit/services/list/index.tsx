import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailServices } from '@/pages/modules/website-unit/services/category/hooks'
import { useParams } from 'react-router-dom'
import { UseGetListService } from '@/pages/modules/website-unit/services/list/hooks'
import { ColumnsListService } from '@/pages/modules/website-unit/services/list/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddListCategory } from '@/pages/modules/website-unit/services/list/component/buttonAdd.tsx'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'

export const ListServiceCategory = () => {
  const { id } = useParams()
  const { detailServices } = UseGetDetailServices(id ?? '')
  const { meta, listService, loading } = UseGetListService(id ?? '')
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
              element: <ButtonAddListCategory {...(detailServices as ICategoryServices)} />,
            },
          ]}
        />

        <TableCustom columns={columns} data={listService} loading={loading} meta={meta} />
      </div>
    </>
  )
}

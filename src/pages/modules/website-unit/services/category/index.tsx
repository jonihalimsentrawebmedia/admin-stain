import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetListServices } from '@/pages/modules/website-unit/services/category/hooks'
import { CategoryServiceColumns } from '@/pages/modules/website-unit/services/category/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { ButtonAddCategoryService } from '@/pages/modules/website-unit/services/category/component/buttonAdd.tsx'

export const ServicesList = () => {
  const { listServices, loading, meta } = UseGetListServices()
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
              element: <ButtonAddCategoryService session={session} />,
            },
          ]}
        />

        <TableCustom columns={columns} data={listServices} loading={loading} meta={meta} />
      </div>
    </>
  )
}

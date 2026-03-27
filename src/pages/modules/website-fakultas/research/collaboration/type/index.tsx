import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddType } from '@/pages/modules/website-fakultas/research/collaboration/type/component/buttonAdd.tsx'
import { ColumnsTypeCollaboration } from '@/pages/modules/website-fakultas/research/collaboration/type/data/columns.tsx'
import { UseGetTypeCollaboration } from '@/pages/modules/website-fakultas/research/collaboration/type/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const TypeOurPartners = () => {
  const { typeCollaboration, loading, meta } = UseGetTypeCollaboration()
  const columns = ColumnsTypeCollaboration()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Bidang Kolaborasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddType />,
            },
          ]}
        />

        <TableCustom data={typeCollaboration} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}

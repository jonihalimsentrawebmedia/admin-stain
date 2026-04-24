import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddType } from '@/pages/modules/website-fakultas/research/collaboration/type/component/buttonAdd.tsx'
import { ColumnsTypeCollaboration } from '@/pages/modules/website-fakultas/research/collaboration/type/data/columns.tsx'
import { UseGetTypeCollaboration } from '@/pages/modules/website-fakultas/research/collaboration/type/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

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
              element: (
                <ButtonGoToGuide
                  titleGuide={'Bidang Kolaborasi'}
                  valueGuide="FAKULTAS_PENELITIAN_BERKERJASAMA_DENGAN_KAMI_KOLABORASI"
                />
              ),
            },
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

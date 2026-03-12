import { USeGetDetailSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddSubSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/sub-specialization/component/buttonAdd.tsx'
import { UseGetSubSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/sub-specialization/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsSubSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/sub-specialization/data/columns.tsx'

export const SubSpecializationPage = () => {
  const { id } = useParams()
  const { detail } = USeGetDetailSpecialization((id as string) ?? '')
  const { subSpecialization, loading, meta } = UseGetSubSpecialization({
    id: id as string,
  })

  const columns = ColumnsSubSpecialization()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={`Sub Spesialisasi - ${detail?.nama_spesialisasi}`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddSubSpecialization />,
            },
          ]}
        />

        <TableCustom data={subSpecialization} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

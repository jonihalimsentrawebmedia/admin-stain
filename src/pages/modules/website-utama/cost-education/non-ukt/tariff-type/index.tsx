import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import UseGetEducationalLevel from '@/pages/modules/settings/reference/educational-level/controller/useGetEducationalLevel.tsx'
import { ButtonAddTariffType } from './component/buttonAdd.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetTariffType } from './hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsTariffType } from './data/columns.tsx'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide.tsx'

export const TariffTypePage = () => {
  const { educationalLevel } = UseGetEducationalLevel({ isGetAll: true })
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const jenjang = searchParams.get('jenjang') ?? ''

  const { tariffType, loading, meta } = UseGetTariffType({
    page,
    limit,
    search,
    id_jenjang: jenjang,
  })

  const columns = ColumnsTariffType({
    selectList: educationalLevel,
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Jenis Tarif"
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="NON - UKT - Jenis Tarif" valueGuide="WEBSITE_UTAMA_NON_UKT_JENIS_TARIF" />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddTariffType select={educationalLevel} />,
            },
          ]}
        />

        <TableCustom columns={columns} data={tariffType} loading={loading} meta={meta} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddLevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/component/buttonAdd.tsx'
import { UseGetLevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/hooks'
import { useSearchParams } from 'react-router-dom'
import { columnsLevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import UseGetEducationalLevel from '@/pages/modules/settings/reference/educational-level/controller/useGetEducationalLevel.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const LevelUktPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const jenjang = searchParams.get('jenjang') ?? ''
  const { educationalLevel } = UseGetEducationalLevel({ isGetAll: true })
  const { levelUkt, meta, loading } = UseGetLevelUkt({
    page,
    limit,
    search,
    id_jenjang: jenjang,
  })
  const columns = columnsLevelUkt({
    DataSelect: educationalLevel,
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label="Tingkatan UKT"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLevelUkt select={educationalLevel} />,
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              label={'Jenjang'}
              name={'jenjang'}
              options={
                educationalLevel?.map((row) => ({
                  label: `${row?.kode_jenjang}-${row?.nama_jenjang}`,
                  value: row?.id_jenjang,
                })) ?? []
              }
            />
          }
          columns={columns}
          data={levelUkt}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

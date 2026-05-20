import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddOurTeam } from '@/pages/modules/website-unit/profile/our-team/component/buttonAdd.tsx'
import { UseGetDivisionUnit } from '@/pages/modules/website-unit/profile/our-team/hooks'
import { ColumnsOurTeams } from '@/pages/modules/website-unit/profile/our-team/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const OurTeamUnit = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { meta, loading, division } = UseGetDivisionUnit({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsOurTeams()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Tim Unit'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Tim Unit" valueGuide="PERPUSTAKAAN_PROFIL_TIM" />
              ),
            },
            { type: 'custom', element: <ButtonAddOurTeam /> },
          ]}
        />

        <TableCustom data={division} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

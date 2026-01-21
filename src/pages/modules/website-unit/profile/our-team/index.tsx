import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddOurTeam } from '@/pages/modules/website-unit/profile/our-team/component/buttonAdd.tsx'
import { UseGetDivisionUnit } from '@/pages/modules/website-unit/profile/our-team/hooks'
import { ColumnsOurTeams } from '@/pages/modules/website-unit/profile/our-team/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const OurTeamUnit = () => {
  const { meta, loading, division } = UseGetDivisionUnit()
  const columns = ColumnsOurTeams()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Tim Unit'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddOurTeam /> }]}
        />

        <TableCustom data={division} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDivisionDetail } from '@/pages/modules/website-unit/profile/our-team/hooks'
import { useParams } from 'react-router-dom'
import { ButtonAddDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/component/buttonAdd.tsx'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { UseGetDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/hooks'
import { ColumnsDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const DivisionTeamUnit = () => {
  const { id } = useParams()
  const { unitTeam } = UseGetDivisionDetail(id ?? '')
  const { divisionTeam, meta, loading } = UseGetDivisionTeam(id ?? '')
  const columns = ColumnsDivisionTeam(unitTeam as IUnitTeamGroup)

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          isBack
          label={`Pejabat Divisi - ${unitTeam?.nama_divisi}`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddDivisionTeam {...(unitTeam as IUnitTeamGroup)} />,
            },
          ]}
        />

        <TableCustom data={divisionTeam} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

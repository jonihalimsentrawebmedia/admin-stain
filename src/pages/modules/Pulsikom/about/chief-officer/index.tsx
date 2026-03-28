import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsChiefOfficer } from '@/pages/modules/Pulsikom/about/chief-officer/data/columns.tsx'
import { UseGetChiefOfficerGroup } from '@/pages/modules/Pulsikom/about/chief-officer/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddChiefOfficer } from '@/pages/modules/Pulsikom/about/chief-officer/component/buttonAdd.tsx'

export const ChiefOfficer = () => {
  const columns = ColumnsChiefOfficer()
  const { chiefOfficer, meta, loading } = UseGetChiefOfficerGroup()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Pimpinan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddChiefOfficer />,
            },
          ]}
        />
        <TableCustom data={chiefOfficer} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

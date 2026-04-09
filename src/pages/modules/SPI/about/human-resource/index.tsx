import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsChiefOfficer } from './data/columns.tsx'
import { UseGetChiefOfficerGroup } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddChiefOfficer } from './component/buttonAdd.tsx'

export const HumanResourcePage = () => {
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

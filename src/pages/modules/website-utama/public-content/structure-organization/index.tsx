import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddStructureOrganization } from '../structure-organization/components/buttonAdd.tsx'
import { GroupOrganizationColumns } from '../structure-organization/data/columns.tsx'
import { UseStructureOrganization } from '@/pages/modules/website-utama/public-content/structure-organization/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const StructureOrganizationPage = () => {
  const columns = GroupOrganizationColumns()
  const { listGroupOrganization, meta, loading } = UseStructureOrganization()
  console.log(columns)

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Struktur Organisasi'}
          buttonGroup={[
            {
              type: 'add',
              label: '',
              onClick: () => {},
              element: <ButtonAddStructureOrganization />,
            },
          ]}
        />

        <TableCustom
          meta={meta}
          loading={loading}
          thClassName={'bg-primary-foreground'}
          data={listGroupOrganization}
          columns={columns}
        />
      </div>
    </>
  )
}

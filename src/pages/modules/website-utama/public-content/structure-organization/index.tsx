import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddStructureOrganization } from '../structure-organization/components/buttonAdd.tsx'
import { GroupOrganizationColumns } from '../structure-organization/data/columns.tsx'

export const StructureOrganizationPage = () => {
  const columns = GroupOrganizationColumns()
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
      </div>
    </>
  )
}

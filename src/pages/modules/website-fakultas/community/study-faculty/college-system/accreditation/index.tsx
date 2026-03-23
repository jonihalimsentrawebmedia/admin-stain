import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetAccreditation } from './hooks/index.tsx'
import { AccreditationColumns } from './data/columns.tsx'
import ButtonAddAccreditationFaculty from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/component/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const AccreditationFacultyCommunity = () => {
  const { accreditation, loading, meta } = UseGetAccreditation()
  const columns = AccreditationColumns()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Akreditasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddAccreditationFaculty />,
            },
          ]}
        />

        <TableCustom
          columnsName={['']}
          data={accreditation}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

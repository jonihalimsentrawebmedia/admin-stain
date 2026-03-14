import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { BottonSelectTypeVacancy } from './component/BottonType.tsx'
import { UseGetListInternshipVacancy } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsInternship } from './data/columns'

export const ServiceInternshipVacancy = () => {
  const { internshipVacancy, meta, loading } = UseGetListInternshipVacancy()

  const columns = ColumnsInternship()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Lowongan Magang'}
          buttonGroup={[
            {
              type: 'custom',
              element: <BottonSelectTypeVacancy />,
            },
          ]}
        />

        <TableCustom data={internshipVacancy} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}

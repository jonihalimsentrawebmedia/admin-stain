import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { BottonSelectTypeVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/BottonType.tsx'
import { UseGetListJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/hoooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/columns.tsx'

export const ServiceJobVacancy = () => {
  const { jobVacancy, meta, loading } = UseGetListJobVacancy()

  const columns = ColumnsJobVacancy()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Lowongan Pekerjaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <BottonSelectTypeVacancy />,
            },
          ]}
        />

        <TableCustom data={jobVacancy} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}

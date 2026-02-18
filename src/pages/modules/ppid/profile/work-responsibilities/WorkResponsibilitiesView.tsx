import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import { useNavigate } from 'react-router-dom'
import WorkResponsibilitiesViewModel from './WorkResponsibilitiesViewModel'
import useGetWorkResponsibilities from '@/pages/modules/ppid/profile/work-responsibilities/controller/useGetWorkResponsibilities'

const WorkResponsibilitiesView = () => {
  const navigate = useNavigate()
  const { columns } = WorkResponsibilitiesViewModel()
  const { loading, meta, workResponsibilities } = useGetWorkResponsibilities({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'add',
            label: 'Tambah',
            onClick: () => {
              navigate('add')
            },
          },
        ]}
        label="Tugas, Fungsi, & Tanggung Jawab"
      />
      <TableCustom
        columns={columns}
        loading={loading}
        meta={meta}
        data={workResponsibilities}
        isShowFilter={false}
        isShowPagination={false}
      />
    </div>
  )
}

export default WorkResponsibilitiesView

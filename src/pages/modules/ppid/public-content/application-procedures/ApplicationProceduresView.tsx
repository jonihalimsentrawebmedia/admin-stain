import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ApplicationProceduresViewModel from './ApplicationProceduresViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import useGetApplicationProcedures from './controller/useApplicationProcedures'

const ApplicationProceduresView = () => {
  const { columns } = ApplicationProceduresViewModel()
  const { applicationProcedures, loading, meta } = useGetApplicationProcedures({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAdd />,
          },
        ]}
        label="Tata Cara Permohonan"
      />
      <TableCustom
        isShowFilter={false}
        columns={columns}
        data={applicationProcedures}
        loading={loading}
        isShowLimit={false}
        meta={meta}
        isShowPagination={false}
      />
    </div>
  )
}

export default ApplicationProceduresView

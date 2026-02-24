import { useNavigate } from 'react-router-dom'
import ServiceCommitmentViewModel from './ServiceCommitmentViewModel'
import useGetServiceCommitment from './controller/useGetServiceCommitment'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'

const ServiceCommitmentView = () => {
  const navigate = useNavigate()
  const { columns } = ServiceCommitmentViewModel()
  const { loading, meta, serviceCommitment } = useGetServiceCommitment()
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
        label="Maklumat Layanan"
      />
      <TableCustom
        columns={columns}
        loading={loading}
        meta={meta}
        data={serviceCommitment}
        isShowFilter={false}
        isShowPagination={false}
      />
    </div>
  )
}

export default ServiceCommitmentView

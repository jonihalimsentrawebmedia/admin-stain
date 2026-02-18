import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import VisiMisiViewModel from './VisiMisiViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import { useNavigate } from 'react-router-dom'
import useGetVisiMisiUnit from './controller/useGetVisiMisiUnit'

const VisiMisiPPIDView = () => {
  const navigate = useNavigate()
  const { columns } = VisiMisiViewModel()
  const { loading, meta, visiMisi } = useGetVisiMisiUnit({})
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
        label="Visi Misi"
      />
      <TableCustom
        columns={columns}
        loading={loading}
        meta={meta}
        data={visiMisi}
        isShowFilter={false}
        isShowPagination={false}
      />
    </div>
  )
}

export default VisiMisiPPIDView

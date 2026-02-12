import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import VisiMisiViewModel from './VisiMisiViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetVisiMisiLembaga from './controller/useGetVisiMisiLembaga'
import { useNavigate } from 'react-router-dom'

const VisiMisiView = () => {
  const navigate = useNavigate()
  const { columns } = VisiMisiViewModel()
  const { loading, meta, visiMisi } = useGetVisiMisiLembaga({})
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

export default VisiMisiView

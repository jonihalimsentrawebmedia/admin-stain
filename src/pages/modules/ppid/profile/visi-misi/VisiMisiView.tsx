import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import VisiMisiViewModel from './VisiMisiViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import { useNavigate } from 'react-router-dom'
import useGetVisiMisiUnit from './controller/useGetVisiMisiUnit'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const VisiMisiPPIDView = () => {
  const navigate = useNavigate()
  const { columns } = VisiMisiViewModel()
  const { loading, meta, visiMisi } = useGetVisiMisiUnit({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonGoToGuide titleGuide={'Visi Misi'} valueGuide="PPID_PROFIL_VISI_MISI" />
            ),
          },
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

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetListPlace } from './hook/index'
import ColumnsStudentEntertainment from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ListPlaceStudentOrganization = () => {
  const navigate = useNavigate()
  const { listPlace, loading, meta } = UseGetListPlace()
  const columns = ColumnsStudentEntertainment()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Daftar Hiburan Mahasiswa'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={listPlace} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

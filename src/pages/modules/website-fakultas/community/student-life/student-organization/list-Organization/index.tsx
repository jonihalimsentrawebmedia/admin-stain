import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetStudentOrganizations } from './hooks/index'
import ColumStudentOrganization from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ListOrganizationStudentLife = () => {
  const navigate = useNavigate()
  const { listOrganization, meta, loading } = UseGetStudentOrganizations()
  const columns = ColumStudentOrganization()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Daftar Organisasi Mahasiswa'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={listOrganization} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

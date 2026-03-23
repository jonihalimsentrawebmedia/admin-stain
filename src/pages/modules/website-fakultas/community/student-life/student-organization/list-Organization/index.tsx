import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const ListOrganizationStudentLife = () => {
  const navigate = useNavigate()
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
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const ListPlaceStudentOrganization = () => {
  const navigate = useNavigate()
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
      </div>
    </>
  )
}

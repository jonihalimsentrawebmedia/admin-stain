import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const FacilitiesPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Fasilitas'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Fasilitas',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />
      </div>
    </>
  )
}

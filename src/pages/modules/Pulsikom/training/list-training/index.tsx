import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const ListTraining = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="space-y-5 bg-white">
        <ButtonTitleGroup
          label="Daftar Training"
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Training',
              onClick: () => navigate('add'),
            },
          ]}
        />
      </div>
    </>
  )
}

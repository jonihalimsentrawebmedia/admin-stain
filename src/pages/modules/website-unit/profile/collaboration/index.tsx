import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const Collaboration = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Kerjasama Unit'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah kerjasama',
              onClick: () => navigate('add'),
            },
          ]}
        />
      </div>
    </>
  )
}

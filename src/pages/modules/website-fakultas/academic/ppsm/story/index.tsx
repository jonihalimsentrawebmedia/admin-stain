import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const AlumniStoriesPPSM = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Cerita',
              onClick: () => navigate('add'),
            },
          ]}
          label="PPSM - Cerita Alumni"
        />
      </div>
    </>
  )
}

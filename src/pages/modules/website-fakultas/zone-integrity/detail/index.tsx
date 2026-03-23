import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const DetailZoneIntegrity = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Sub Kategori - Pemenuhan'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Sub Kategori',
              onClick: () => navigate('add'),
            },
          ]}
        />
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'

export const GroupSkillResearch = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          isBack
          label="Daftar Kelompok Keahlian"
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Data',
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

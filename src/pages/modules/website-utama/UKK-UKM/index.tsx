import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import ButtonAddUkkUkm from '@/pages/modules/website-utama/UKK-UKM/component/buttonAdd.tsx'

const UKKUKMPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddUkkUkm />,
            },
          ]}
          label="UKK UKM"
        />
      </div>
    </>
  )
}
export default UKKUKMPage

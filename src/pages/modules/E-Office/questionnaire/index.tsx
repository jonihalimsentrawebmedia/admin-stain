import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const QuestionnairePage = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Kuisioner'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  className={'text-white rounded-full'}
                  onClick={() => navigate('qualitative/add')}
                >
                  <FaCirclePlus />
                  Kuisioner Kualitatif
                </Button>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button
                  className={'text-white rounded-full'}
                  onClick={() => navigate('quantitative/add')}
                >
                  <FaCirclePlus />
                  Kuisioner Kuantitatif
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}

export default QuestionnairePage

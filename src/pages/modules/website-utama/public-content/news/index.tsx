import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { HiPencil } from 'react-icons/hi'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'

const NewsPublicContentPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <ButtonTitleGroup
        label={'Berita'}
        buttonGroup={[
          {
            label: 'Tulis Berita',
            type: 'add',
            onClick: () => {},
            element: (
              <Button
                onClick={() => navigate('add')}
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
              >
                <HiPencil />
                Tulis Berita
              </Button>
            ),
          },
        ]}
      />
    </>
  )
}

export default NewsPublicContentPage

import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'

const NumberOfCodeLetterPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Kode Nomor Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button className={'text-white'} onClick={() => navigate('add')}>
                  <FaCirclePlus className={'text-yellow-500'} />
                  Tambah Kode Nomor
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
export default NumberOfCodeLetterPage

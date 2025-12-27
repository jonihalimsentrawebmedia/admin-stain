import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'

export const CertificateStudent = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Surat Keterangan Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
          ]}
        />

        <Accordion type={'single'} defaultValue={'alur'} collapsible>
          <AccordionCustom name={'alur'} title={'Alur Pengajuan'}>
            <div>
              <div
                className={'flex flex-col gap-4 mt-2'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>
        </Accordion>
      </div>
    </>
  )
}

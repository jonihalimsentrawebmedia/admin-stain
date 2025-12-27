import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { UseGetDetailAcademicRules } from '@/pages/modules/website-utama/peraturan-akademik/hooks'

export const AcademicRegulation = () => {
  const navigate = useNavigate()

  const { academicRules } = UseGetDetailAcademicRules()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Peraturan Akademik'}
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
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => {
                navigate('update')
              },
            },
          ]}
        />

        <Accordion
          className={'flex flex-col gap-5'}
          type={'multiple'}
          defaultValue={['pengantar', 'isi', 'penutup', 'dokumen']}
        >
          <AccordionCustom name={'pengantar'} title={'Pengantar'}>
            <div
              className={'flex flex-col gap-4 mt-2'}
              dangerouslySetInnerHTML={{ __html: academicRules?.pengantar ?? '' }}
            />
          </AccordionCustom>
          <AccordionCustom name={'isi'} title={'Isi'}>
            <div
              className={'flex flex-col gap-4 mt-2'}
              dangerouslySetInnerHTML={{ __html: academicRules?.isi ?? '' }}
            />
          </AccordionCustom>
          <AccordionCustom name={'penutup'} title={'Penutup'}>
            <div
              className={'flex flex-col gap-4 mt-2'}
              dangerouslySetInnerHTML={{ __html: academicRules?.penutup ?? '' }}
            />
          </AccordionCustom>
          <AccordionCustom name={'dokumen'} title={'Dokumen'}>
            <div
              className={'flex flex-col gap-4 mt-2'}
              dangerouslySetInnerHTML={{ __html: academicRules?.dokumen_teks_pengantar ?? '' }}
            />
          </AccordionCustom>
        </Accordion>
      </div>
    </>
  )
}

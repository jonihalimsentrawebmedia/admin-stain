import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { UseGetDetailAcademicRules } from '@/pages/modules/website-utama/peraturan-akademik/hooks'
import { TbExternalLink } from 'react-icons/tb'

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
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Pengantar</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.pengantar ?? '' }}
              />
            </div>
          </AccordionCustom>
          <AccordionCustom name={'isi'} title={'Isi'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Isi</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.isi ?? '' }}
              />
            </div>
          </AccordionCustom>
          <AccordionCustom name={'penutup'} title={'Penutup'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Penutup</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.penutup ?? '' }}
              />
            </div>
          </AccordionCustom>
          <AccordionCustom name={'dokumen'} title={'Dokumen'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Isi Pengantar</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.dokumen_teks_pengantar ?? '' }}
              />

              <p className="text-gray-500">Dokumen</p>
              <Link to={academicRules?.dokumen_status_url ?? '#'} target={'_blank'}>
                <Button
                  className={'border border-primary text-primary hover:text-primary'}
                  variant={'outline'}
                >
                  <TbExternalLink />
                  Buka Dokumen
                </Button>
              </Link>
            </div>
          </AccordionCustom>
        </Accordion>
      </div>
    </>
  )
}

import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'

export const PageIdentity = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Identitas'}
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
          defaultValue={[
            'pengantar',
            'nama',
            'kedudukan',
            'berdiri',
            'busana',
            'lambang',
            'bendera',
            'mars',
          ]}
        >
          <AccordionCustom name={'pengantar'} title={'Pengantar'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Teks Pengantar</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
              <p className="text-gray-500">Dokumen Status</p>
              {/*<Link to={'#'} target={'_blank'}>*/}
              {/*  <Button*/}
              {/*    className={'border border-primary text-primary hover:text-primary'}*/}
              {/*    variant={'outline'}*/}
              {/*  >*/}
              {/*    <TbExternalLink />*/}
              {/*    Buka Dokumen*/}
              {/*  </Button>*/}
              {/*</Link>*/}
            </div>
          </AccordionCustom>

          <AccordionCustom name={'nama'} title={'Nama'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Nama</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>

          <AccordionCustom name={'kedudukan'} title={'Kedudukan'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Kedudukan</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>

          <AccordionCustom name={'berdiri'} title={'Berdiri'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Berdiri</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>

          <AccordionCustom name={'busana'} title={'Busana Akademik'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Busana Akademik</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>

          <AccordionCustom name={'lambang'} title={'Lambang'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Gambar</p>
              <div></div>
              <p className="text-gray-500">Isi Lambang</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>

          <AccordionCustom name={'bendera'} title={'Bendera'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Gambar</p>
              <div></div>
              <p className="text-gray-500">Isi Bendera</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>

          <AccordionCustom name={'mars'} title={'Mars & Hymne'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Mars & Hymne</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            </div>
          </AccordionCustom>
        </Accordion>
      </div>
    </>
  )
}

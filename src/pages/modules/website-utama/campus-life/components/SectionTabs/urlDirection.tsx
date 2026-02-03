import { useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetUrlDirection } from '@/pages/modules/website-utama/campus-life/hooks'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion.tsx'
import { FormUrlDirection } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/urlDirectionform.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'

export const UrlDirectionSection = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { urlDirection } = UseGetUrlDirection()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Link Arahan'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Link to={'link/language'} className={'bg-primary p-1.5 rounded text-white'}>
                    <IoLanguage />
                  </Link>
                ),
              },
              {
                type: 'edit',
                label: 'Edit Data',
                onClick: () => {
                  setIsEdit(!isEdit)
                },
              },
            ]}
          />
        )}

        <Accordion type={'single'} defaultValue={'url'} collapsible>
          {isEdit ? (
            <FormUrlDirection isEdit={isEdit} setIsEdit={setIsEdit} data={urlDirection} />
          ) : (
            <AccordionCustom name={'url'} title={'Isi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Warna Background</p>
                <div>
                  {urlDirection?.is_warna_background ? (
                    <div
                      className={'size-5'}
                      style={{ background: `${urlDirection?.warna_background}` }}
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </div>
                <p className="text-gray-500">Text Pengantar</p>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: urlDirection?.teks_pengantar ?? '' }}
                />
                <p className="text-gray-500">Text Tombol</p>
                <p>{urlDirection?.teks_tombol}</p>
                <p className="text-gray-500">Link Tombol</p>
                {urlDirection?.link_tombol ? (
                  <Link to={urlDirection?.link_tombol ?? '#'} target={'_blank'}>
                    <Button
                      variant={'outline'}
                      className={
                        'border-primary text-primary hover:text-primary bg-primary-foreground hover:bg-primary-foreground'
                      }
                    >
                      {urlDirection?.teks_tombol}
                    </Button>
                  </Link>
                ) : (
                  'TIdak Ada'
                )}
              </div>
            </AccordionCustom>
          )}
        </Accordion>
      </div>
    </>
  )
}

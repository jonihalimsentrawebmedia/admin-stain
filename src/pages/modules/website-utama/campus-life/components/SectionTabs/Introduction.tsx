import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useState } from 'react'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { FormIntroduction } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/forms.tsx'
import { UseGetCampusLifeIntroduction } from '@/pages/modules/website-utama/campus-life/hooks'
import { Link } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'

export const SectionIntroduction = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { introduction } = UseGetCampusLifeIntroduction()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Pengantar'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Link to={'pengantar/language'} className={'bg-primary p-1.5 rounded text-white'}>
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

        <Accordion type={'single'} defaultValue={'pengantar'} collapsible>
          {isEdit ? (
            <FormIntroduction data={introduction} isEdit={isEdit} setIsEdit={setIsEdit} />
          ) : (
            <AccordionCustom name={'pengantar'} title={'Isi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Warna Background</p>
                <div>
                  {introduction?.is_warna_background ? (
                    <div
                      className={'size-5'}
                      style={{ background: `${introduction?.warna_background}` }}
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </div>
                <p className="text-gray-500">Text Pengantar</p>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: introduction?.teks_pengantar ?? '' }}
                />
              </div>
            </AccordionCustom>
          )}
        </Accordion>
      </div>
    </>
  )
}

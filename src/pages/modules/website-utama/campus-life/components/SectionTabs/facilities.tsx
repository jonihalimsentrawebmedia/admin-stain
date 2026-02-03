import { useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion.tsx'
import { UseGetCampusLifeFacilities } from '../../hooks/index.tsx'
import { FormFacilities } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/formFacilities.tsx'
import { Link } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'

export const FacilitiesSection = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { campusFacilities } = UseGetCampusLifeFacilities()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Fasilitas'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Link to={'fasilitas/language'} className={'bg-primary p-1.5 rounded text-white'}>
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

        <Accordion type={'single'} defaultValue={'fasilitas'} collapsible>
          {isEdit ? (
            <FormFacilities isEdit={isEdit} setIsEdit={setIsEdit} data={campusFacilities} />
          ) : (
            <AccordionCustom name={'fasilitas'} title={'Isi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Warna Background</p>
                <div>
                  {campusFacilities?.is_warna_background ? (
                    <div
                      className={'size-5'}
                      style={{ background: `${campusFacilities?.warna_background}` }}
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </div>
                <p className="text-gray-500">Text Pengantar</p>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: campusFacilities?.teks_pengantar ?? '' }}
                />
              </div>
            </AccordionCustom>
          )}
        </Accordion>
      </div>
    </>
  )
}

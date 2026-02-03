import { useState } from 'react'
import { UseGetCampusActivityUnit } from '@/pages/modules/website-utama/campus-life/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion.tsx'
import { LifeActivityForm } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/lifeActivityForm.tsx'
import { Link } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'

export const LifeActivitySection = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { campusActivity } = UseGetCampusActivityUnit()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Unit Kegiatan Mahasiswa'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Link to={'ukm/language'} className={'bg-primary p-1.5 rounded text-white'}>
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

        <Accordion type={'single'} defaultValue={'activity'} collapsible>
          {isEdit ? (
            <LifeActivityForm setIsEdit={setIsEdit} isEdit={isEdit} data={campusActivity} />
          ) : (
            <AccordionCustom name={'activity'} title={'Isi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Warna Background</p>
                <div>
                  {campusActivity?.is_warna_background ? (
                    <div
                      className={'size-5'}
                      style={{ background: `${campusActivity?.warna_background}` }}
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </div>
                <p className="text-gray-500">Text Pengantar</p>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: campusActivity?.teks_pengantar ?? '' }}
                />
              </div>
            </AccordionCustom>
          )}
        </Accordion>
      </div>
    </>
  )
}

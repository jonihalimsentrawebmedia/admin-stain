import { UseGetCampusPerformance } from '../../hooks/index.tsx'
import { useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion.tsx'
import { PerformanceForm } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/performanceForm.tsx'

export const PerformanceSection = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { campusPerformance } = UseGetCampusPerformance()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Prestasi'}
            buttonGroup={[
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

        <Accordion type={'single'} defaultValue={'performance'} collapsible>
          {isEdit ? (
            <PerformanceForm isEdit={isEdit} setIsEdit={setIsEdit} data={campusPerformance} />
          ) : (
            <AccordionCustom name={'performance'} title={'Isi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Warna Background</p>
                <div>
                  {campusPerformance?.is_warna_background ? (
                    <div
                      className={'size-5'}
                      style={{ background: `${campusPerformance?.warna_background}` }}
                    />
                  ) : (
                    'Tidak Ada'
                  )}
                </div>
                <p className="text-gray-500">Text Pengantar</p>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: campusPerformance?.teks_pengantar ?? '' }}
                />
              </div>
            </AccordionCustom>
          )}
        </Accordion>
      </div>
    </>
  )
}

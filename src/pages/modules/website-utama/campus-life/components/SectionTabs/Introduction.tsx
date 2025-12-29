import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useState } from 'react'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { FormIntroduction } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/forms.tsx'

export const SectionIntroduction = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Pengantar'}
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

        <Accordion type={'single'} defaultValue={'pengantar'} collapsible>
          {isEdit ? (
            <FormIntroduction />
          ) : (
            <AccordionCustom name={'pengantar'} title={'Isi'}>
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p className="text-gray-500">Warna Background</p>
                <p></p>
                <p className="text-gray-500">Text Pengantar</p>
                <p></p>
              </div>
            </AccordionCustom>
          )}
        </Accordion>
      </div>
    </>
  )
}

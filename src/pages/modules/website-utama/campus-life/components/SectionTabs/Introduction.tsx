import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useState } from 'react'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'

export const SectionIntroduction = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <div className={'flex flex-col gap-5'}>
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

        <Accordion type={'single'} defaultValue={'pengantar'} collapsible>
          <AccordionCustom name={'pengantar'} title={'Isi'}>
            <div></div>
          </AccordionCustom>
        </Accordion>
      </div>
    </>
  )
}

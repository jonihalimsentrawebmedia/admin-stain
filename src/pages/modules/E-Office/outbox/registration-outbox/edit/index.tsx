import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useParams } from 'react-router-dom'
import { UseGetDetailOutbox } from '../hooks'
import { FormRegistrationOutbox } from '@/pages/modules/E-Office/outbox/registration-outbox/component/form.tsx'

export const RegistrationOutboxEdit = () => {
  const { id } = useParams()
  const { detailOutbox } = UseGetDetailOutbox(id as string)
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Ubah Surat'} isBack buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Ubah Surat'} valueGuide="E_OFFICE_OUTBOX" />,
            },
          ]} />
        <FormRegistrationOutbox data={detailOutbox} />
      </div>
    </>
  )
}

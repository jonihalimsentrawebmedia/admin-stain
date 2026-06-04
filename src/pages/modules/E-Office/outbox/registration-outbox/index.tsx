import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormRegistrationOutbox } from '@/pages/modules/E-Office/outbox/registration-outbox/component/form.tsx'

export const RegistrationOutbox = () => {
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Tulis Surat'} buttonGroup={[]} />
        <FormRegistrationOutbox />
      </div>
    </>
  )
}

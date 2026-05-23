import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormRegistrationInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/component/form.tsx'

export const RegistrationInbox = () => {
  return (
    <>
      <div className={'space-y-5 bg-white py-10'}>
        <ButtonTitleGroup label={'Tulis Surat'} buttonGroup={[]} />
        <FormRegistrationInbox />
      </div>
    </>
  )
}

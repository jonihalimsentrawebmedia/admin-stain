import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormRegistrationInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/component/form.tsx'

export const RegistrationInbox = () => {
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Form Registrasi Surat Masuk'} buttonGroup={[]} />
        <FormRegistrationInbox />
      </div>
    </>
  )
}

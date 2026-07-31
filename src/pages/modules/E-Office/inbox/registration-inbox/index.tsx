import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { FormRegistrationInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/component/form.tsx'

export const RegistrationInbox = () => {
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Form Registrasi Surat Masuk'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Form Registrasi Surat Masuk'} valueGuide="E_OFFICE_INBOX" /> }]} />
        <FormRegistrationInbox />
      </div>
    </>
  )
}

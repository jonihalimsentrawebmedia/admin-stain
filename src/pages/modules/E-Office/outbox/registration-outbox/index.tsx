import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { FormRegistrationOutbox } from '@/pages/modules/E-Office/outbox/registration-outbox/component/form.tsx'

export const RegistrationOutbox = () => {
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Form Registrasi Surat Keluar'} buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Form Registrasi Surat Keluar'} valueGuide="E_OFFICE_OUTBOX" />,
            },
          ]} />
        <FormRegistrationOutbox />
      </div>
    </>
  )
}

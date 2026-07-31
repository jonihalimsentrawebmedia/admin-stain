import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { FormRegistrationInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/component/form.tsx'
import { useParams } from 'react-router-dom'
import { UseGetDetailInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/hooks'

export const RegistrationInboxEdit = () => {
  const { id } = useParams()
  const { detailInbox } = UseGetDetailInbox(id as string)
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Tulis Surat'} isBack buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Tulis Surat'} valueGuide="E_OFFICE_INBOX" /> }]} />
        <FormRegistrationInbox data={detailInbox} />
      </div>
    </>
  )
}

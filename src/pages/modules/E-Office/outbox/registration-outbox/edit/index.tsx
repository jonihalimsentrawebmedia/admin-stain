import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { UseGetDetailOutbox } from '../hooks'
import { FormRegistrationOutbox } from '@/pages/modules/E-Office/outbox/registration-outbox/component/form.tsx'

export const RegistrationOutboxEdit = () => {
  const { id } = useParams()
  const { detailOutbox } = UseGetDetailOutbox(id as string)
  return (
    <>
      <div className={'space-y-5 bg-white'}>
        <ButtonTitleGroup label={'Ubah Surat'} isBack buttonGroup={[]} />
        <FormRegistrationOutbox data={detailOutbox} />
      </div>
    </>
  )
}

import { Button } from '@/components/ui/button'
import ButtonAccept from './ButtonAccept'
import ButtonCancelDraft from './ButtonCancelDraft'
import { ButtonSubmission } from './ButtonSubmission'
import { HiPencil } from 'react-icons/hi'
import { StatusPublish } from '@/utils/helper'

interface Props {
  status: string
  goToEdit: () => void
  linkCancel: string
  linkAccept: string
  keyCancel: string
  keyAccept: string
  keyStatus: string
  keySend: string
  linkSend: string
}

const ButtonNewEditor = ({
  keyAccept,
  keyCancel,
  keyStatus,
  linkAccept,
  linkCancel,
  goToEdit,
  status,
  keySend,
  linkSend,
}: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-2">
        <div className="text-[#999]">Status</div>
        {StatusPublish(status)}
        {status !== 'TOLAK_EDITOR' && status !== 'DISETUJUI_EDITOR' && (
          <Button
            onClick={goToEdit}
            variant={'outline'}
            className={'bg-white text-primary border-primary hover:text-primary'}
          >
            <HiPencil />
            Edit Data
          </Button>
        )}

        {status == 'DIAJUKAN_EDITOR' && (
          <ButtonSubmission link={linkSend} queryKey={keySend} queryKeyStatus={keyStatus} />
        )}

        {status == 'PROSES_EDITOR' && (
          <>
            <ButtonCancelDraft queryKey={keyCancel} url={linkCancel} isIcon={false} />
            <ButtonAccept isIcon={false} queryKey={keyAccept} url={linkAccept} />
          </>
        )}
      </div>
    </div>
  )
}

export default ButtonNewEditor

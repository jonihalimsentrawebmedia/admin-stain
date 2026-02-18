import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Send, X } from 'lucide-react'

interface Props {
  open: boolean
  setOpen: any
  handleSave: (value: any) => void
  loading: boolean
}
const ModalAjukanUnit = ({ handleSave, open, setOpen, loading }: Props) => {
  return (
    <DialogCustom
      className="max-w-2xl! w-full!"
      open={open}
      setOpen={setOpen}
      description="Anda akan mengajukan pengeditan data Anda ke Editor. Apakah Anda yakin untuk mengajukan?"
      title={<p className="text-2xl ">Ajukan Pengeditan Data?</p>}
    >
      <div className={`flex gap-4  items-center justify-end`}>
        <Button
          className="border-primary text-primary bg-white hover:text-primary"
          variant={'outline'}
          onClick={() => {
            setOpen(false)
          }}
        >
          <X />
          Batal
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="border-primary text-white bg-primary hover:text-white hover:bg-primary/80"
        >
          <Send />
          Ajukan
        </Button>
      </div>
    </DialogCustom>
  )
}

export default ModalAjukanUnit

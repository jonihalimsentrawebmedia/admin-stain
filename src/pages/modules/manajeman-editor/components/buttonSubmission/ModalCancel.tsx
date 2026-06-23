import { Button } from '@/components/ui/button'
import { Trash2Icon, X} from 'lucide-react'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  url: string
  queryKey: string
  setOpen: (value: any) => void
  open: boolean
}
const ModalCancel = ({ url, queryKey, open, setOpen }: Props) => {
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const queryClient = useQueryClient()
  async function handleCancel() {
    setLoading(true)
    try {
      const res = await AxiosClient.post(url ?? '', {
        alasan_tolak: reason,
      })

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: [queryKey],
        })
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <DialogCustom
        className="max-w-2xl! w-full! rounded-md"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Tolak Pengajuan Data</p>}
      >
        <p>Tulis alasan penolakan</p>
        <Textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
          }}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => {
              setOpen(false)
            }}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2Icon />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ModalCancel

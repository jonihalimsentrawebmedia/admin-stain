import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'

interface Props {
  url: string
  queryKey: string
  setOpen: (value: any) => void
  open: boolean
}
const ModalAccept = ({ url, queryKey, open, setOpen }: Props) => {
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleAccept() {
    setLoading(true)
    try {
      const res = await AxiosClient.post(url ?? '')

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
        title={<p className="text-2xl text-red-500">Setujui Pengajuan Data</p>}
      >
        <p>Apakah anda yakin ingin menyetujui pengajuan perubahan data ini?</p>

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
            onClick={handleAccept}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Check />
            Setujui
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ModalAccept

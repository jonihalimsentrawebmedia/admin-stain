import { Button } from '@/components/ui/button.tsx'
import { MdCancel, MdOutlineCancel } from 'react-icons/md'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useState } from 'react'
import { BiX } from 'react-icons/bi'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonCancelApproval = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleCancelApproval = async () => {
    setLoading(true)
    await AxiosClient.post('/fakultas/profil/batalkan-draft')
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          toast.success(res.data.message)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['data-faculty'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal membatalkan pengajuan')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        disabled={loading}
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-yellow-500 hover:text-yellow-500 text-yellow-500 rounded-full'}
      >
        <MdOutlineCancel /> Batal Pengajuan
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        title={'Batalkan Pengajuan Pengeditan Data?'}
        description={
          'Anda akan membatalkan pengajuan pengeditan data Anda ke Editor. Apakah Anda yakin untuk membatalkan pengajuan?'
        }
      >
        <div className="flex gap-2 justify-end">
          <Button
            variant={'outline'}
            onClick={() => setOpen(false)}
            className={'border-primary text-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button className={'bg-yellow-500 hover:bg-yellow-600'} onClick={HandleCancelApproval}>
            <MdCancel />
            Batalkan Pengajuan
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

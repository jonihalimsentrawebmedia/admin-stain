import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'


import { useState } from 'react'



import { useQueryClient } from '@tanstack/react-query'

import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { X, XCircle } from 'lucide-react'

const ButtonCancelDraft = () => {
  const [open, setOpen] = useState(false)
  

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: any) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/lembaga/background`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['lembaga'],
        })

     
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        variant={'outline'}
        className={'bg-white text-[#CDA327] border-[#CDA327] hover:text-[#CDA327]'}
      >
        <XCircle />
        Batalkan Pengajuan
      </Button>

     <DialogCustom
      className="max-w-2xl! w-full!"
      open={open}
      setOpen={setOpen}
      description="Anda akan membatalkan pengajuan pengeditan data Anda ke Editor. Apakah Anda yakin untuk membatalkan pengajuan?"
      title={<p className="text-2xl ">Batalkan Pengajuan Pengeditan Data?</p>}
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
          className="border-[#CDA327] text-white bg-[#CDA327] hover:text-white hover:bg-[#CDA327]/80"
        >
          <XCircle />
          Batalkan Pengajuan
        </Button>
      </div>
    </DialogCustom>
    </>
  )
}

export default ButtonCancelDraft

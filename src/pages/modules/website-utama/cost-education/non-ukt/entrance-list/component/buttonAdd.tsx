import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormEntranceUkt } from '../component/form.tsx'
import { type TUktEntranceUkt, UktEntranceUkt } from '../data/resolver.tsx'

export const ButtonAddEntranceNonUkt = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TUktEntranceUkt>({
    resolver: zodResolver(UktEntranceUkt),
  })

  const queryClient = useQueryClient()
  const handleSave = async (value: TUktEntranceUkt) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/jalur-masuk-non-ukt', value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['entrance_non_ukt'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border border-primary hover:text-primary text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Jalur Masuk
      </Button>

      <DialogBasic
        title={'Tambah Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormEntranceUkt
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={handleSave}
        />
      </DialogBasic>
    </>
  )
}

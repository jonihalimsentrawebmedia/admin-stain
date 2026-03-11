import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useForm } from 'react-hook-form'
import { type FooterServiceType, ResolverFooterService } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormServiceFooter } from '../component/form.tsx'

export const ButtonAddFooterService = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<FooterServiceType>({
    resolver: zodResolver(ResolverFooterService),
  })

  const queryClient = useQueryClient()

  console.log(form.formState.errors)

  const HandleSave = async (value: FooterServiceType) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/layanan', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['footer-service'],
          })
          form.reset()
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        Tambah
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        title={'Tambah Layanan'}
      >
        <FormServiceFooter
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}

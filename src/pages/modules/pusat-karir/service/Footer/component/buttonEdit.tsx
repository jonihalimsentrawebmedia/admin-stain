import { useEffect, useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useForm } from 'react-hook-form'
import { type FooterServiceType, ResolverFooterService } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormServiceFooter } from '../component/form.tsx'
import type { IServiceFooter } from '@/pages/modules/pusat-karir/service/Footer/data/types.tsx'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data?: IServiceFooter
}

export const ButtonEditFooterService = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<FooterServiceType>({
    resolver: zodResolver(ResolverFooterService),
  })

  useEffect(() => {
    form.reset({
      ...data,
    })
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: FooterServiceType) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/layanan/${data?.id_layanan}`, value)
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
      <button
        onClick={() => setOpen(!open)}
        className={'text-white bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

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

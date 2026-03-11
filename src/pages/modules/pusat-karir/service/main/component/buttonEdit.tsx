import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormMainService } from '@/pages/modules/pusat-karir/service/main/component/form.tsx'
import { useForm } from 'react-hook-form'
import { type MainServiceType, ResolverMainService } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IMainService } from '../data/types.ts'

interface Props {
  data?: IMainService
}

export const ButtonEditService = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<MainServiceType>({
    resolver: zodResolver(ResolverMainService),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: MainServiceType) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/layanan-utama/${data?.id_layanan}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['main-service'],
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
        Ganti
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        title={'Tambah Layanan Utama'}
      >
        <FormMainService
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

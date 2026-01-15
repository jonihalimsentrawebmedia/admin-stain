import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import {
  ServiceProdiResolver,
  type ServiceProdiResolverType,
} from '@/pages/modules/website-prodi/service/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormServiceProdi } from '@/pages/modules/website-prodi/service/components/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const ButtonAddServiceProdi = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ServiceProdiResolverType>({
    resolver: zodResolver(ServiceProdiResolver),
  })

  const queryClient = useQueryClient()
  console.log(form.formState.errors)

  const HandleSave = async (value: ServiceProdiResolverType) => {
    setLoading(true)
    await AxiosClient.post('/prodi/layanan', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['service-prodi'],
          })
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
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Layanan'}
      >
        <FormServiceProdi
          form={form}
          setOpen={setOpen}
          open={open}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}

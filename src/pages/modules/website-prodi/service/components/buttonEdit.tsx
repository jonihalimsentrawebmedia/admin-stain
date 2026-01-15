import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ServiceProdiResolver,
  type ServiceProdiResolverType,
} from '@/pages/modules/website-prodi/service/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormServiceProdi } from '@/pages/modules/website-prodi/service/components/form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IServiceProdi } from '../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonEditServiceProdi = (data: IServiceProdi) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ServiceProdiResolverType>({
    resolver: zodResolver(ServiceProdiResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_layanan: data.nama_layanan,
        url_layanan: data.url_layanan,
        tampil: data.tampil as 'Y',
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ServiceProdiResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/prodi/layanan/${data?.id_prodi_layanan}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['service-prodi'],
          })
          form.reset()
          toast.success(res?.data?.message || 'Success tambah layanan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 hover:bg-yellow-600 text-white p-1.5'}
      >
        <HiPencil />
      </button>

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

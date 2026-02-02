import { useForm } from 'react-hook-form'
import type { ServicesList } from '../model'
import { ServicesResolver, type IServicesTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import ServiceForm from './ServiceForm'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: ServicesList
}
const ButtonEditServices = ({ data }: Props) => {
  const form = useForm<IServicesTypeForm>({
    resolver: zodResolver(ServicesResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IServicesTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/layanan/${data.id_layanan}`, {
      ...e,
      footer: e.header?.includes('footer') ? 'Y' : 'N',
      header: e.header?.includes('header') ? 'Y' : 'N',
      slider: e.header?.includes('slider') ? 'Y' : 'N',
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-services'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600 rounded'}
        onClick={() => {
          setOpen(true)
          const temp = []
          if (data.footer == 'Y') {
            temp.push('footer')
          }
          if (data.header == 'Y') {
            temp.push('header')
          }
          if (data.slider == 'Y') {
            temp.push('slider')
          }

          form.reset({
            ...data,
            header: temp,
          })
        }}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        width="50%"
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Menu'}
      >
        <ServiceForm
          form={form}
          loading={loading}
          handleSave={handleSave}
          handleCancel={() => {
            setOpen(false)
          }}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonEditServices

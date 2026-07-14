import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ISpecialistResolver, ResolverSpecialist } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { SpecialistForm } from '../component/form.tsx'
import type { ISpecialist } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: ISpecialist
}

export const ButtonEditSpecialist = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ISpecialistResolver>({
    resolver: zodResolver(ResolverSpecialist),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama: data.nama,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ISpecialistResolver) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/spesialis/${data?.id_spesialis}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data spesialis')
          queryClient.invalidateQueries({ queryKey: ['specialist'] })
          setOpen(false)
          setLoading(false)
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
        onClick={() => setOpen(true)}
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        className={'lg:min-w-2xl rounded'}
        title={'Edit Spesialis'}
        open={open}
        setOpen={setOpen}
      >
        <SpecialistForm
          HandlerSave={HandleSave}
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}

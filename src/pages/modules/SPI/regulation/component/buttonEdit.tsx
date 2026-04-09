import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverRegulation, type TResolverRegulation } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormServiceSPI } from '../component/form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IRegulation } from '../data/types.tsx'

interface Props {
  data: IRegulation
}

export const ButtonEditRegulation = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        urutan: data.urutan,
        url: data.url,
        nama_peraturan: data.nama_peraturan,
      })
    }
  }, [data])

  const form = useForm<TResolverRegulation>({
    resolver: zodResolver(ResolverRegulation),
  })

  const queryClient = useQueryClient()
  const HandleAdd = async (value: TResolverRegulation) => {
    setLoading(true)
    await AxiosClient.put(`/spi/peraturan/${data?.id_peraturan}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['regulation'],
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Peraturan'} open={open} setOpen={setOpen}>
        <FormServiceSPI form={form} loading={loading} HandleSave={HandleAdd} />
      </DialogBasic>
    </>
  )
}

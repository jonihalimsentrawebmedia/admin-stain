import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverExternalPortal, type TResolverExternalPortal } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormExternalPortal } from './form.tsx'
import type { IExternalPortal } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IExternalPortal
}

export const ButtonEditPortal = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverExternalPortal>({
    resolver: zodResolver(ResolverExternalPortal),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        url: data.url,
        urutan: data.urutan,
        url_gambar: data?.url_gambar,
        key_url_gambar: data.key_gambar,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverExternalPortal) => {
    setLoading(true)
    await AxiosClient.put(`/spi/portal-eksternal/${data?.id_portal_eksternal}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['external-portal'],
          })
          toast.success(res.data.message || 'Success')
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
        className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Portal Eksternal'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-3xl'}
      >
        <FormExternalPortal
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          open={open}
          setOpen={setOpen}
        />
      </DialogBasic>
    </>
  )
}

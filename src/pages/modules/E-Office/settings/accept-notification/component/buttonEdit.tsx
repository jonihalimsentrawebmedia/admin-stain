import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverAcceptNotification, type TResolverAcceptNotification } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormAcceptNotification from '@/pages/modules/E-Office/settings/accept-notification/component/form.tsx'
import { type INotification } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: INotification
}

export const ButtonEditNotification = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverAcceptNotification>({
    resolver: zodResolver(ResolverAcceptNotification),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_unit: data.id_unit ?? '',
        status: data.status,
        email: data.email ?? '',
        no_telepon: data.no_telepon ?? '',
        id_telegram: data.id_telegram ?? '',
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverAcceptNotification) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/notifikasi/${data?.id_notifikasi}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['accept-notification'],
          })
          setLoading(false)
          toast.success(res.data.message || 'Success')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 text-white p-1.5 rounded hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Penerima Notifikasi'} open={open} setOpen={setOpen}>
        <FormAcceptNotification
          form={form}
          loading={loading}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

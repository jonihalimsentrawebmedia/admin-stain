import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverAcceptNotification, type TResolverAcceptNotification } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormAcceptNotification from '@/pages/modules/E-Office/settings/accept-notification/component/form.tsx'
import { BiPlus } from 'react-icons/bi'

interface props {
  data: any
}

export const ButtonEditNotification = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        id_sdm: data.id_sdm,
        status: data.status,
        email: data.email,
        telepon: data.telepon,
        id_telegram: data.id_telegram,
      })
    }
  }, [data])

  const form = useForm<TResolverAcceptNotification>({
    resolver: zodResolver(ResolverAcceptNotification),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverAcceptNotification) => {
    setLoading(true)
    await AxiosClient.put(`/${data?.id_notifikasi}`, value)
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
      <Button
        className={'bg-primary text-white rounded-full hover:text-white'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Penerima
      </Button>

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

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverReminderAgenda, type TResolverReminderAgenda } from '../data/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormReminderAgenda } from './form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IReminderAgenda } from '../data/types'

interface props {
  data: IReminderAgenda
}

const ButtonEditReminderAgenda = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverReminderAgenda>({
    resolver: zodResolver(ResolverReminderAgenda),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        waktu: data?.waktu,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverReminderAgenda) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/waktu-pengingat-agenda/${data?.id_waktu_pengigat_agenda}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['reminder-agenda'],
          })
          setLoading(false)
          toast.success(res.data.message || 'Success')
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
        className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Waktu Pengingat Agenda'} open={open} setOpen={setOpen}>
        <FormReminderAgenda
          loading={loading}
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditReminderAgenda

import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { ResolverEvent, type TResolverEvent } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormEvent } from '@/pages/modules/E-Office/event-activity/event-data/component/form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import { format } from 'date-fns'

interface props {
  data: IEvent
}

const ButtonEditEvent = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverEvent>({
    resolver: zodResolver(ResolverEvent),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        tanggal_mulai: format(data?.tanggal_mulai, 'yyyy-MM-dd'),
        tanggal_selesai: format(data?.tanggal_selesai, 'yyyy-MM-dd'),
        nama_kegiatan: data?.nama_kegiatan,
        penyelenggara: data?.penyelenggara,
        tempat: data?.tempat,
        waktu: data?.waktu,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverEvent) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/acara/${data?.id_acara}`, {
      ...value,
      tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
      tanggal_selesai: new Date(value.tanggal_selesai).toISOString(),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['event-activity'],
          })
          form.reset()
          toast.success(res?.data?.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        className="p-1.5 text-blue-500 bg-primary/15 hover:bg-primary/15 rounded"
        onClick={() => setOpen(!open)}
      >
        <HiPencil className={'size-5 text-yellow-500'} />
      </button>

      <DialogBasic title={'Edit Acara'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <FormEvent
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          setOpen={setOpen}
          open={open}
        />
      </DialogBasic>
    </>
  )
}
export default ButtonEditEvent

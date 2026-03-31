import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverTopicSchedule,
  type TResolverTopicSchedule,
} from '@/pages/modules/Pulsikom/training/list-training/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormTopicAndSchedule } from '@/pages/modules/Pulsikom/training/list-training/component/form/formTopic.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { HiPencil } from 'react-icons/hi'
import type { ITopicSchedule } from '../../data/types'
import { format } from 'date-fns'

interface Props {
  data: ITopicSchedule
}

export const ButtonEditTopicSchedule = (props: Props) => {
  const { data } = props

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const id = window.localStorage.getItem('id_training')
  const form = useForm<TResolverTopicSchedule>({
    resolver: zodResolver(ResolverTopicSchedule),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        judul_topik_bahasan: data?.judul_topik_bahasan,
        deskripsi: data?.deskripsi,
        tanggal_mulai_bahasan: format(data?.tanggal_mulai_bahasan, 'yyyy-MM-dd'),
        tanggal_selesai_bahasan: format(data?.tanggal_selesai_bahasan, 'yyyy-MM-dd'),
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTopicSchedule) => {
    setLoading(true)
    await AxiosClient.put(
      `/pusilkom/training/${id}/bahasan-dan-topik/${data?.id_bahasan_dan_topik}`,
      {
        ...value,
        tanggal_mulai_bahasan: new Date(value?.tanggal_mulai_bahasan).toISOString(),
        tanggal_selesai_bahasan: new Date(value?.tanggal_selesai_bahasan).toISOString(),
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['topic-schedule'],
          })
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
      <Button
        variant={'outline'}
        className={'border-yellow-500 text-yellow-500 hover:text-yellow-600'}
        onClick={() => setOpen(true)}
      >
        <HiPencil />
        Edit
      </Button>

      <DialogBasic
        title={'Buat Topik Bahasan & Jadwal'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormTopicAndSchedule
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

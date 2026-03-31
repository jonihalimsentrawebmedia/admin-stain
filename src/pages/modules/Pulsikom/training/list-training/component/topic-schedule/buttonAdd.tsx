import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
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

export const ButtonAddTopicSchedule = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const id = window.localStorage.getItem('id_training')
  const form = useForm<TResolverTopicSchedule>({
    resolver: zodResolver(ResolverTopicSchedule),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTopicSchedule) => {
    setLoading(true)
    await AxiosClient.post(`/pusilkom/training/${id}/bahasan-dan-topik`, {
      ...value,
      tanggal_mulai_bahasan: new Date(value?.tanggal_mulai_bahasan).toISOString(),
      tanggal_selesai_bahasan: new Date(value?.tanggal_selesai_bahasan).toISOString(),
    })
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
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(true)}
      >
        Buat Topik Bahasan & Jadwal
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

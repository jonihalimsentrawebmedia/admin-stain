import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { ResolverEvent, type TResolverEvent } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormEvent } from '@/pages/modules/E-Office/event-activity/event-data/component/form.tsx'

const ButtonAddEvent = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverEvent>({
    resolver: zodResolver(ResolverEvent),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverEvent) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/acara', {
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
      <Button className={'bg-primary text-white rounded-full'} onClick={() => setOpen(!open)}>
        <BiPlus /> Tambah Acara
      </Button>

      <DialogBasic title={'Tambah Acara'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
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
export default ButtonAddEvent

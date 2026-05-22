import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverReminderAgenda, type TResolverReminderAgenda } from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { FormReminderAgenda } from './form.tsx'

const ButtonAddReminderAgenda = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverReminderAgenda>({
    resolver: zodResolver(ResolverReminderAgenda),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverReminderAgenda) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/waktu-pengingat-agenda', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['reminder-agenda'],
          })
          form.reset()
          setLoading(false)
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Button className={'rounded-full text-white hover:text-white'} onClick={() => setOpen(!open)}>
        <BiPlus />
        Tambah Jeni Surat
      </Button>

      <DialogBasic title={'Tambah Waktu Pengingat Agenda'} open={open} setOpen={setOpen}>
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

export default ButtonAddReminderAgenda

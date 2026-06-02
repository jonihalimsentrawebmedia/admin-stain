import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { MinutesEvent } from './hooks.tsx'
import { HiPencil } from 'react-icons/hi'

const ResolversMinutes = z.object({
  nama_lengkap: z.string().min(1, 'Nama Lengkap harus diisi'),
  isi_notulen: z.string().min(1, 'Isi Notulen harus diisi'),
})

type TResolverMinutes = z.infer<typeof ResolversMinutes>

interface props {
  data: MinutesEvent
}

const ButtonEditMeetingMinutes = (props: props) => {
  const { id } = useParams()
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverMinutes>({
    resolver: zodResolver(ResolversMinutes),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_lengkap: data?.nama_lengkap,
        isi_notulen: data?.isi_notulen,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverMinutes) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/acara/${id}/notulen/${data?.id_acara_notulen}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['meeting-minutes'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Something went wrong')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Data'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_lengkap'}
              form={form}
              label={'Nama Lengkap'}
              placeholder={'Nama Lengkap'}
              htmlFor={'nama_lengkap'}
              isRequired
            />
            <TextAreaInput
              name={'isi_notulen'}
              form={form}
              label={'Isi'}
              placeholder={'Isi Notulen'}
              htmlFor={'isi_notulen'}
              isRequired
            />
            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
export default ButtonEditMeetingMinutes

import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
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

const ResolversMinutes = z.object({
  nama_lengkap: z.string().min(1, 'Nama Lengkap harus diisi'),
  isi_notulen: z.string().min(1, 'Isi Notulen harus diisi'),
})

type TResolverMinutes = z.infer<typeof ResolversMinutes>

const ButtonAddMeetingMinutes = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverMinutes>({
    resolver: zodResolver(ResolversMinutes),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverMinutes) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/acara/${id}/notulen`, value)
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
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border border-primary rounded-full text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah Data
      </Button>

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
export default ButtonAddMeetingMinutes

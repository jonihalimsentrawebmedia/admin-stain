import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const ResolverPurposeType = z.object({
  jenis_keperluan: z.string().min(1, { message: 'Nama Jenis Keperluan harus diisi' }),
})
type TResolverPurposeType = z.infer<typeof ResolverPurposeType>

const ButtonAddPurposeType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPurposeType>({
    resolver: zodResolver(ResolverPurposeType),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPurposeType) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/jenis-keperluan', value)
      .then((res) => {
        if (res?.data) {
          setLoading(false)
          setOpen(false)
          toast.success(res?.data?.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['purpose-type'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <Button
        className={'rounded-full text-white hover:text-white'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <BiPlus />
        Tambah Data
      </Button>

      <DialogBasic title={'Tambah Jenis Keperluan'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-5">
            <TextInput
              form={form}
              name={'jenis_keperluan'}
              label={'Nama Jenis Keperluan'}
              placeholder={'Masukkan Nama Jenis Keperluan'}
              htmlFor={'nama_jenis_keperluan'}
              isRequired
              isRow
            />
            <ButtonForm loading={loading} onCancel={() => setLoading(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonAddPurposeType

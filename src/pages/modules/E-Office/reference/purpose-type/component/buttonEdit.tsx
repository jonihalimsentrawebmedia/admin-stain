import { useEffect, useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { HiPencil } from 'react-icons/hi'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IPurposeType } from '../data/types'

const ResolverPurposeType = z.object({
  jenis_keperluan: z.string().min(1, { message: 'Nama Jenis Keperluan harus diisi' }),
})
type TResolverPurposeType = z.infer<typeof ResolverPurposeType>

interface props {
  data: IPurposeType
}

const ButtonEditPurposeType = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPurposeType>({
    resolver: zodResolver(ResolverPurposeType),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        jenis_keperluan: data.jenis_keperluan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPurposeType) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/jenis-keperluan/${data?.id_jenis_keperluan}`, value)
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
      <button
        onClick={() => setOpen(!open)}
        className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

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
            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonEditPurposeType

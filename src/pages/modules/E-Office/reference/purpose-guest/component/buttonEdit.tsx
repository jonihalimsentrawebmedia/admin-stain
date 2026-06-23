import { useEffect, useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { HiPencil } from 'react-icons/hi'
import { toast } from 'react-toastify'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { IPurposeGuest } from '@/pages/modules/E-Office/reference/purpose-guest/data/types.ts'

const ResolverPurposeGuest = z.object({
  tujuan_bertamu: z.string().min(1, { message: 'Nama Tujuan Bertamu Harus Diisi' }),
})
type TResolverPurposeGuest = z.infer<typeof ResolverPurposeGuest>

interface props {
  data: IPurposeGuest
}

const ButtonEditPurposeGuest = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPurposeGuest>({
    resolver: zodResolver(ResolverPurposeGuest),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        tujuan_bertamu: data.tujuan_bertamu,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPurposeGuest) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/tujuan-bertamu/${data?.id_tujuan_bertamu}`, value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res?.data?.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['purpose-guest'],
          })
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
        onClick={() => setOpen(!open)}
        className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Tujuan Bertamu'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-5">
            <TextInput
              form={form}
              name={'tujuan_bertamu'}
              label={'Tujuan Bertamu'}
              placeholder={'Masukkan Nama Tujuan Bertamu'}
              htmlFor={'nama_tujuan_bertamu'}
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

export default ButtonEditPurposeGuest

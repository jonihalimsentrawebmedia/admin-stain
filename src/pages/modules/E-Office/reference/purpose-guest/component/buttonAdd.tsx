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

const ResolverPurposeGuest = z.object({
  tujuan_bertamu: z.string().min(1, { message: 'Nama tujuan Bertamu harus diisi' }),
})
type TResolverPurposeGuest = z.infer<typeof ResolverPurposeGuest>

const ButtonAddPurposeGuest = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPurposeGuest>({
    resolver: zodResolver(ResolverPurposeGuest),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPurposeGuest) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/tujuan-bertamu', value)
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
      <Button
        className={'rounded-full text-white hover:text-white'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <BiPlus />
        Tambah Data
      </Button>

      <DialogBasic title={'Tambah Tujuan Bertamu'} open={open} setOpen={setOpen}>
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

export default ButtonAddPurposeGuest

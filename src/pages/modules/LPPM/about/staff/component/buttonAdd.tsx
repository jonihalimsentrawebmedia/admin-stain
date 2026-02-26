import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

const staffResolver = z.object({
  nama_kelompok: z.string().min(1, { message: 'Nama kelompok harus diisi' }),
  urutan: z.number().min(1, { message: 'Urutan harus diisi' }),
})

type StaffSchema = z.infer<typeof staffResolver>

export const ButtonAddStaffLPPM = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<StaffSchema>({
    resolver: zodResolver(staffResolver),
  })

  const queryClient = useQueryClient()

  const HandleAddStaff = async (e: StaffSchema) => {
    await AxiosClient.post('/lppm/staff', e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah kelompok')
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['about-staff'],
          })
          form.reset()
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal tambah kelompok')
        setLoading(false)
      })
  }

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <PlusIcon />
        Tambah Kelompok
      </Button>

      <DialogBasic title={'Tambah Kelompok Staff'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleAddStaff)}>
            <TextInput
              name={'nama_kelompok'}
              form={form}
              label={'Nama Kelompok'}
              placeholder={'Nama Kelompok'}
              inputClassName={'bg-white'}
              isRow
              isRequired
            />

            <TextInput
              name={'urutan'}
              form={form}
              label={'Urutan'}
              placeholder={'Urutan'}
              inputClassName={'bg-white'}
              type={'number'}
              isRow
              isRequired
              isNumber
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

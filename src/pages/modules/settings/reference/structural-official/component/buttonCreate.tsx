import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useQueryClient } from '@tanstack/react-query'

const ButtonCreateStructural = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<{ nama_jabatan_struktural: string }>({
    resolver: zodResolver(
      z.object({
        nama_jabatan_struktural: z.string({ error: 'nama Wajib Diisi' }),
      })
    ),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: { nama_jabatan_struktural: string }) => {
    setLoading(true)
    await AxiosClient.post('/pengaturan/referensi/jabatan-struktural', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['structural-official'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => {
          setOpen(true)
        }}
      >
        Tambah Data
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Jabatan Struktural'}
        className={'max-w-2xl! w-full! rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_jabatan_struktural'}
              form={form}
              label={'Nama Jabatan Struktural'}
              placeholder={'Nama Jabatan Struktural'}
              htmlFor={'nama_jabatan_struktural'}
              isRow
              isRequired
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

export default ButtonCreateStructural

import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'

const ButtonAddStatusActive = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<{
    kode_status: string
    nama_status: string
  }>({
    resolver: zodResolver(
      z.object({
        kode_status: z.string({ error: 'Kode Status Wajib Diisi' }),
        nama_status: z.string({ error: 'Nama Status Wajib Diisi' }),
      })
    ),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: { kode_status: string; nama_status: string }) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/sdm-status-aktif', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['status-sdm'],
          })
          form.reset()
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
        className={'border-primary text-primary hover:text-primary'}
        variant={'outline'}
        onClick={() => setOpen(!open)}
      >
        Tambah Data
      </Button>

      <DialogBasic title={'Tambah Status Active'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              form={form}
              name={'kode_status'}
              label={'Kode Status'}
              htmlFor={'kode_status'}
              placeholder={'Kode Status'}
              isRequired
              isRow
            />

            <TextInput
              form={form}
              name={'nama_status'}
              label={'Nama Status'}
              htmlFor={'nama_status'}
              placeholder={'Nama Status'}
              isRequired
              isRow
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonAddStatusActive

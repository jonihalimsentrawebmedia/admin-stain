import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IServiceType, ServiceResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddService = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IServiceType>({
    resolver: zodResolver(ServiceResolver),
  })

  const queryClient = useQueryClient()
  const handleSave = async (e: IServiceType) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/layanan', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['service-faculty'],
          })
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(true)}
      >
        <BiPlus />
        Tambah Layanan
      </Button>

      <DialogBasic title={'Tambah Layanan'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(handleSave)}>
            <TextInput
              name={'nama_layanan'}
              form={form}
              label={'Nama Layanan'}
              placeholder={'Nama Layanan'}
              isRow
              isRequired
            />
            <TextInput
              name={'url'}
              form={form}
              type={'url'}
              label={'URL'}
              placeholder={'URL'}
              isRow
              isRequired
            />
            <InputRadio
              form={form}
              name={'is_footer'}
              label={'Posisi Bawah Slider'}
              data={[
                { label: 'Aktif', value: true },
                { label: 'Tidak Aktif', value: false },
              ]}
              isRow
              isRequired
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

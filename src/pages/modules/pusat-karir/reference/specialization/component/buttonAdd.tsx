import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ISpecializationResolver, ResolverSpecialization } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'

export const ButtonAddSpecialization = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ISpecializationResolver>({
    resolver: zodResolver(ResolverSpecialization),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: ISpecializationResolver) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/spesialisasi', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['specialization'],
          })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={'border-primary text-primary hover:text-primary'}
        variant={'outline'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic title={'Tambah Spesialisasi'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
            <TextInput
              name={'nama_spesialisasi'}
              form={form}
              label={'Nama Spesialisasi'}
              placeholder={'Nama Spesialisasi'}
              className={'bg-white'}
              isRequired
              isRow
            />
            <TextInput
              name={'urutan'}
              form={form}
              label={'Urutan'}
              placeholder={'Urutan'}
              className={'bg-white'}
              type={'number'}
              isNumber
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

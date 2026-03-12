import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ISubSpecializationResolver, ResolverSubSpecialization } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UseGetSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/hooks'
import { useParams } from 'react-router-dom'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

export const ButtonAddSubSpecialization = () => {
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ISubSpecializationResolver>({
    resolver: zodResolver(ResolverSubSpecialization),
    defaultValues: {
      id_spesialisasi: id as string,
    },
  })

  const { specialization } = UseGetSpecialization({
    page: '0',
    limit: '0',
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: ISubSpecializationResolver) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/sub-spesialisasi', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['sub-specialization'],
          })
          setOpen(false)
          setLoading(false)
          form.reset()
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
            <SelectBasicInput
              name={'id_spesialisasi'}
              form={form}
              placeholder={'Pilih Specialissi'}
              data={
                specialization?.map((row) => ({
                  label: row?.nama_spesialisasi,
                  value: row?.id_spesialisasi,
                })) ?? []
              }
              label={'Spesialisasi'}
              isDisabled
              isRequired
              isRow
              usePortal
            />
            <TextInput
              name={'nama_spesialisasi'}
              form={form}
              label={'Nama Sub Spesialisasi'}
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

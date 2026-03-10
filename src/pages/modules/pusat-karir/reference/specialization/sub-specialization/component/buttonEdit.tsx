import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ISubSpecializationResolver, ResolverSubSpecialization } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { ISubSpecialization } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/hooks'

interface Props {
  data: ISubSpecialization
}

export const ButtonEditSpecialization = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ISubSpecializationResolver>({
    resolver: zodResolver(ResolverSubSpecialization),
  })

  const { specialization } = UseGetSpecialization({
    page: '0',
    limit: '0',
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_spesialisasi: data?.nama_spesialisasi,
        urutan: data?.urutan,
        id_spesialisasi: data?.id_spesialisasi,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ISubSpecializationResolver) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/sub-spesialisasi/${data?.id_sub_spesialisasi}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['sub-specialization'],
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
      <button
        onClick={() => setOpen(true)}
        className={'p-1.5 rounded text-white bg-yellow-500 hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

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
              placeholder={'Nama Sub Spesialisasi'}
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

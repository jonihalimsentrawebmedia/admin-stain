import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IServiceType, ServiceResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { IServices } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface props {
  data?: IServices
}

export const ButtonEditService = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IServiceType>({
    resolver: zodResolver(ServiceResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_layanan: data?.nama_layanan,
        url: data?.url,
        is_footer: data?.is_footer,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (e: IServiceType) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/layanan/${data?.id_layanan}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['service-faculty'],
          })
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 text-white rounded hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

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

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ICategoryIndustryResolver, ResolverCategoryIndustry } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { ICategoryIndustry } from '../data/type'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data?: ICategoryIndustry
}

export const ButtonEditIndustryCategory = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ICategoryIndustryResolver>({
    resolver: zodResolver(ResolverCategoryIndustry),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kategori_industri: data?.nama_kategori_industri,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ICategoryIndustryResolver) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/kategori-industri/${data?.id_kategori_industri}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['industry-category'],
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

      <DialogBasic title={'Tambah Kategori Industri'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
            <TextInput
              name={'nama_kategori_industri'}
              form={form}
              label={'Nama Kategori Industri'}
              placeholder={'Nama Kategori Industri'}
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

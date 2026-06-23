import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { ICategoryDocument } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: ICategoryDocument
}

export const ButtonEditCategory = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_sistem_dokumen: data.nama_sistem_dokumen,
        urutan: data.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleAdd = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(`/spi/kategori-sistem-dokumen/${data?.id_kategori_sistem_dokumen}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['category-document'],
          })
          toast.success(res.data.message || 'Success')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Kategori Dokumen'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleAdd)}>
            <TextInput
              name={'nama_sistem_dokumen'}
              placeholder={'Nama Kategori Dokumen'}
              form={form}
              label={'Nama Kategori Dokumen'}
              isRow
              isRequired
            />
            <TextInput
              form={form}
              placeholder={'Urutan'}
              name={'urutan'}
              label={'Urutan'}
              type={'number'}
              isNumber
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

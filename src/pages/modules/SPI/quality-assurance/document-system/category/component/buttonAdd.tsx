import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddCategory = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleAdd = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/spi/kategori-sistem-dokumen', value)
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
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Kategori
      </Button>

      <DialogBasic
        title={'Tambah Kategori Dokumen'}
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

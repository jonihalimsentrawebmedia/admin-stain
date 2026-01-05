import { BiPlus, BiX } from 'react-icons/bi'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { FaSave } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const ButtonAddCategoryFAQ = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const HandleSave = async (value: any) => {
    setLoading(!loading)
    await AxiosClient.post('/website-utama/kategori-faq', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['list-category-faq'],
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
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'text-primary hover:text-primary border-primary'}
      >
        <BiPlus />
        Tambah Kategori
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Kategori'}
        className={'max-w-2xl rounded'}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              placeholder={'Nama Kategori'}
              label={'Nama Kategori'}
              name={'nama_kategori_faq'}
              form={form}
            />
            <div className="flex justify-end gap-2 mt-5">
              <Button
                variant={'outline'}
                className={'text-primary hover:text-primary border-primary'}
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(!open)
                }}
              >
                <BiX />
                Batal
              </Button>

              <Button disabled={loading}>
                <FaSave />
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

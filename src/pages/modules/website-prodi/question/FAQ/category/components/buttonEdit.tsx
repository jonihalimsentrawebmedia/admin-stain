import { BiX } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { FaSave } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { ICategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/type.ts'
import { HiPencil } from 'react-icons/hi'

export const ButtonEditCategoryFaqProdi = (data: ICategoryFAQ) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kategori_faq: data.nama_kategori_faq,
      })
    }
  }, [data])

  const HandleSave = async (value: any) => {
    setLoading(!loading)
    await AxiosClient.put(`/prodi/kategori-faq/${data?.id_kategori_faq}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['prodi-category-faq'],
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
      <button
        onClick={() => setOpen(!open)}
        className={'text-white p-2 bg-yellow-500 hover:bg-yellow-600 rounded'}
      >
        <HiPencil />
      </button>

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

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { BiPlus, BiX } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'

export const ButtonAddCategoryDownloadUnit = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const HandleSubmit = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/unit/kategori-berkas', e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({ queryKey: ['category-download-unit'] })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan.')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus /> Tambah Kategori
      </Button>

      <DialogCustom
        className={'rounded-md min-w-2xl'}
        width={'450px'}
        open={open}
        setOpen={setOpen}
        title={''}
      >
        <div className={'mt-5'}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSubmit)} className={'flex flex-col gap-5'}>
              <TextInput
                name={'nama_kategori'}
                form={form}
                label={'Nama Kategori Berkas'}
                placeholder={'Nama Kategori Berkas'}
                isRequired
                isRow
              />

              <div className="flex items-center justify-end gap-5">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(!open)
                  }}
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
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
        </div>
      </DialogCustom>
    </>
  )
}

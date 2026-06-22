import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const ButtonAddProgram = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const handleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/international-ungreaduate-program', e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['program-undergraduate'],
          })
          toast.success(res.data.message || 'Success tambah program')
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
        variant={'outline'}
        onClick={() => setOpen(true)}
        disabled={loading}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah Program
      </Button>

      <DialogBasic
        title={'Tambah Program'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(handleSave)}>
            <UploadPhotoImage
              form={form}
              name={'url_gambar'}
              ratio_width={1}
              ratio_height={1}
              label={'LOGO'}
            />
            <TextInput
              name={'nama_program'}
              form={form}
              label={'Nama Program'}
              placeholder={'Nama Program'}
              inputClassName={'bg-white'}
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

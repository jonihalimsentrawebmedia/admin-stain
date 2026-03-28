import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { IProgramUndergraduate } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IProgramUndergraduate
}

export const ButtonEditProgram = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  useEffect(() => {
    if (data) {
      form.reset({
        url_gambar: data?.url_gambar,
        nama_program: data?.nama_program,
      })
    }
  }, [])

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
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        className={'bg-yellow-500 text-white p-1.5 rounded hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Tambah Program'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(handleSave)}>
            <UploadPhotoImage form={form} name={'url_gambar'} ratio_width={1} ratio_height={1} />
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

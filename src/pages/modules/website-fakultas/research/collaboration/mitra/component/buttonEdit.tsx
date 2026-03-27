import type { IPartnerMitra } from '@/pages/modules/website-fakultas/research/collaboration/mitra/data/type.ts'
import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { HiPencil } from 'react-icons/hi'

interface props {
  data?: IPartnerMitra
}

export const ButtonEditMitra = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        url_gambar: data?.url_gambar,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/mitra-kerjasama/${data?.id_mitra_kerjasama}`, e)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res?.data?.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['mitra-partner'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 text-white p-1.5 hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Mitra'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadPhotoImage name={'url_gambar'} form={form} />
            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

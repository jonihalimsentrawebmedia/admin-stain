import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IVideoType, VideoResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageBasic } from '@/pages/modules/website-utama/component/UploadImage'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddVideo = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IVideoType>({
    resolver: zodResolver(VideoResolver),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (e: IVideoType) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/galeri-video', e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['gallery-video'],
          })
          form.reset()
          toast.success(res.data.message || 'Success menambahkan data')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
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
        Tambah Video
      </Button>

      <DialogBasic
        title={'Tambah Galery Video'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-4xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadImageBasic
              name={'thumbnail'}
              label={'Thumnail Video'}
              form={form}
              uploadUrl={'/upload'}
            />

            <TextInput
              name={'judul'}
              form={form}
              label={'Judul Video'}
              placeholder={'Masukkan Judul'}
              isRequired
              isRow
            />

            <TextInput
              name={'link_video'}
              form={form}
              label={'Link Video'}
              placeholder={'Masukkan Link Url Video'}
              type={'url'}
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

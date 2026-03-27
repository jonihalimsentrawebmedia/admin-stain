import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IphotoType, PhotoResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageBasic } from '@/pages/modules/website-utama/component/UploadImage'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useParams } from 'react-router-dom'

export const ButtonAddPhoto = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const form = useForm<IphotoType>({
    resolver: zodResolver(PhotoResolver),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (e: IphotoType) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/galeri-foto', {
      ...e,
      id_album: id,
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['gallery-photo'],
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
        Tambah Foto
      </Button>

      <DialogBasic
        title={'Tambah Galery Foto'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-4xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadImageBasic name={'link_foto'} label={'Foto'} form={form} uploadUrl={'/upload'} />

            <TextInput
              name={'judul'}
              form={form}
              label={'Keterangan Foto'}
              placeholder={'Keterangan Foto'}
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

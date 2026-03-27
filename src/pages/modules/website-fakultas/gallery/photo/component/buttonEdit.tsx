import { useEffect, useState } from 'react'
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
import type { IGaleriPhoto } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IGaleriPhoto
}

export const ButtonEditPhoto = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IphotoType>({
    resolver: zodResolver(PhotoResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        judul: data.judul,
        id_album: data.id_album,
        link_foto: data?.link_foto,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: IphotoType) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/galeri-foto/${data?.id_galeri_foto}`, e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['gallery-photo'],
          })
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded text-white'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Galery Foto'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-4xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadImageBasic
              name={'link_foto'}
              label={'Thumnail Video'}
              form={form}
              uploadUrl={'/upload'}
            />

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

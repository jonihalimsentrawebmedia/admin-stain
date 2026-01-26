import { useEffect, useState } from 'react'
import { PhotoResolver, type PhotoType } from '../data/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { IGalleryPhoto } from '../data/index'
import { HiPencil } from 'react-icons/hi'

export const ButtonEditImage = (data: IGalleryPhoto) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<PhotoType>({
    resolver: zodResolver(PhotoResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_album: data.id_album,
        judul: data.judul,
        link_foto: data.link_foto,
      })
    }
  }, [])

  const queryClient = useQueryClient()

  const HandlerSave = async (e: PhotoType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/galeri-foto/${data?.id_galeri_foto}`, e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-photo'],
          })

          queryClient.invalidateQueries({
            queryKey: ['detail-album'],
          })

          toast.success(res.data.message || 'Success Pengajuan tambah data foto')

          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className={'bg-yellow-500 p-1.5 text-white rounded'}>
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Foto'}
        className={'rounded lg:max-w-xl'}
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandlerSave)} className={'flex flex-col gap-5'}>
              <UploadImageRatio form={form} name={'link_foto'} placeholder={'Gambar'} />

              <TextInput
                form={form}
                name={'judul'}
                label={'Keterangan'}
                placeholder={'Keterangan'}
                isRequired
                isRow
              />

              <ButtonTitleGroup
                label={''}
                buttonGroup={[
                  {
                    label: 'Batal',
                    type: 'cancel',
                    onClick: () => {
                      setOpen(false)
                    },
                  },
                  {
                    isDisabled: loading,
                    label: 'Simpan',
                    type: 'save',
                    onClick: () => {},
                  },
                ]}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

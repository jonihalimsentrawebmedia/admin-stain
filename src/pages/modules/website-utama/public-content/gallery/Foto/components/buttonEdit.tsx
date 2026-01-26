import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { AlbumResolver, type AlbumType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'
import { HiPencil } from 'react-icons/hi'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'

export const ButtonEditAlbumPhoto = (data: IGaleriAlbum) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<AlbumType>({
    resolver: zodResolver(AlbumResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        judul: data.judul,
        thumbnail: data?.thumbnail
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (e: AlbumType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/galeri-album/${data?.id_galeri_album}`, e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-album'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data album foto')
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
      <button className={'bg-yellow-500 p-1.5 text-white rounded'} onClick={() => setOpen(!open)}>
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-xl'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Galeri Foto'}
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
              <UploadImageRatio form={form} name={'thumbnail'} placeholder={'thumbnail'} />
              <TextInput
                name={'judul'}
                form={form}
                label={'Judul'}
                placeholder={'Judul Galeri'}
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

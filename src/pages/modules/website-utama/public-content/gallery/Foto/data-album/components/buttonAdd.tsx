import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
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
import { useParams } from 'react-router-dom'

export const ButtonAddImage = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const form = useForm<PhotoType>({
    resolver: zodResolver(PhotoResolver),
    defaultValues: {
      id_album: id,
    },
  })

  const queryClient = useQueryClient()

  const HandlerSave = async (e: PhotoType) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/galeri-foto', e)
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
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah Foto
      </Button>

      <DialogCustom open={open} setOpen={setOpen} title={'Tambah Foto'}>
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

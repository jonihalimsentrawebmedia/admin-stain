import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

export const ButtonDeleteAlbumPhoto = (data: IGaleriAlbum) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/galeri-album/${data?.id_galeri_album}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-album'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data album foto')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button className={'bg-red-500 p-1.5 text-white rounded'} onClick={() => setOpen(!open)}>
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Galeri Foto</p>}
        description={'Apakah anda yakin untuk menghapus foto yang dipilih?'}
      >
        <div className={'flex flex-col gap-4'}>
          <div className="grid grid-cols-[15rem_1fr]">
            <p className="text-gray-500">Judul</p>
            <p>{data?.judul}</p>
          </div>

          <Form {...form}>
            <form className="my-2">
              <TextInput
                form={form}
                name={'validator'}
                label={
                  <p className={'text-red-500'}>
                    To confirm, type <b>“DELETE”</b>
                  </p>
                }
              />
            </form>
          </Form>

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
                element: (
                  <>
                    <Button
                      variant={'destructive'}
                      onClick={HandleSave}
                      disabled={form.watch('validator') !== 'DELETE' || loading}
                    >
                      <FaTrash /> Hapus
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </DialogCustom>
    </>
  )
}

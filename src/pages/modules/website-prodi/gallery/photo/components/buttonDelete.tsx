import { useState } from 'react'
import type { IGalleryPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/data'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  data: IGalleryPhoto
  title: string
}

export const ButtonDeletePhotoProdi = (props: IProps) => {
  const { data, title } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/prodi/galeri-foto/${data?.id_galeri_foto}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data foto')
          queryClient.invalidateQueries({
            queryKey: ['photo-prodi'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className={'bg-red-500 p-1.5 text-white rounded'}>
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Foto</p>}
        description={'Apakah anda yakin untuk menghapus foto yang dipilih?'}
        className={'rounded lg:max-w-xl'}
      >
        <div className={'flex flex-col gap-5'}>
          <img
            src={data?.link_foto}
            alt="image"
            className={'w-[320px] h-[240px] object-cover mx-auto rounded'}
          />

          <div className="grid grid-cols-[12rem_1fr]">
            <p className="text-gray-500">Judul Gallery</p>
            <p>{title}</p>
            <p className="text-gray-500">Keterangan</p>
            <p>{data?.judul}</p>
          </div>
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
                type: 'custom',
                onClick: () => {},
                element: (
                  <Button onClick={HandlerDelete} variant={'destructive'}>
                    <FaTrash /> Hapus
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </DialogCustom>
    </>
  )
}

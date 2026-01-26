import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'

export const ButtonDeleteAlbumPhotoProdi = (data: IGaleriAlbum) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/prodi/galeri-album/${data?.id_galeri_album}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['album-prodi'],
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
                    <Button variant={'destructive'} onClick={HandleSave} disabled={loading}>
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

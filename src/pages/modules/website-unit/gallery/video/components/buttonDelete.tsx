import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data'
import { Link } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'

export const ButtonDeleteVideoUnit = (data: IGalleryVideo) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/galeri-video/${data?.id_galeri_video}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['video-unit'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data video')
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
        open={open}
        setOpen={setOpen}
        title={
        <p className={'text-2xl text-red-500'}>Hapus Galeri Video</p>
        }
        description={'Apakah anda yakin untuk menghapus galeri video yang dipilih?'}
        className={'rounded lg:max-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Judul Gallery</p>
          <p>{data?.judul}</p>
          <p className="text-gray-500">Link Video</p>
          <Link className={'text-blue-600 underline underline-offset-2'} to={data?.link_video}>
            Buka Link
          </Link>
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
              type: 'custom',
              element: (
                <>
                  <Button variant={'destructive'} onClick={HandlerDelete} disabled={loading}>
                    <FaTrash /> Hapus
                  </Button>
                </>
              ),
            },
          ]}
        />
      </DialogCustom>
    </>
  )
}

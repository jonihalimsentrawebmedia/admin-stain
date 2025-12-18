import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { VideoResolver, type VideoType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormGalleyVideo } from '@/pages/modules/website-utama/public-content/gallery/video/components/form.tsx'
import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data'
import { HiPencil } from 'react-icons/hi'

export const ButtonEditVideo = (data: IGalleryVideo) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<VideoType>({
    resolver: zodResolver(VideoResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        link_video: data.link_video,
        judul: data.judul,
        thumbnail: data?.thumbnail,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandlerDelete = async (e: VideoType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/galeri-video/${data?.id_galeri_video}`, e)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-video'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data video')
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
        open={open}
        setOpen={setOpen}
        title={'Edit Galeri Video'}
        className={'rounded lg:max-w-2xl'}
      >
        <FormGalleyVideo
          form={form}
          setOpen={setOpen}
          open={open}
          loading={loading}
          HandleSave={HandlerDelete}
        />
      </DialogCustom>
    </>
  )
}

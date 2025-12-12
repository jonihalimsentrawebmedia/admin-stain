import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { VideoResolver, type VideoType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormGalleyVideo } from '@/pages/modules/website-utama/public-content/gallery/video/components/form.tsx'

export const ButtonAddVideo = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<VideoType>({
    resolver: zodResolver(VideoResolver),
  })

  const queryClient = useQueryClient()

  const HandlerDelete = async (e: VideoType) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/galeri-video', e)
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
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Video
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Galeri Video'}
        className={'rounded'}
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

import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { VideoPPIDResolver, type VideoPPIDType } from './model/resolver'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useGetPPIDVideos from './controller/useGetPPIDVideos'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { Form } from '@/components/ui/form'
import DetailField from '@/components/common/field/DetailField'
import TextInput from '@/components/common/form/TextInput'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Skeleton } from '@/components/ui/skeleton'
const getEmbedUrl = (url: string) => {
  if (!url) return ''

  // Regex to extract the Video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  const videoId = match && match[2].length === 11 ? match[2] : null

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}
const PPIDSettingsVideosView = () => {
  const { video, loading: loadingDetail } = useGetPPIDVideos()
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm<VideoPPIDType>({
    resolver: zodResolver(VideoPPIDResolver),
    defaultValues: {
      url_video: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: VideoPPIDType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/video-profile`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['video-pengaturan-unit-ppid'],
        })
        setIsEdit(false)

        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (video) {
      form.reset({
        ...video,
      })
    }
  }, [video])
  if (loadingDetail) {
    return <Skeleton className="h-[50px]" />
  }
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Video Profil" />
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSave)}>
          {!isEdit ? (
            <DetailField
              data={[
                {
                  label: 'URL Youtube',
                  name: 'url_video',
                },
              ]}
              form={form}
            />
          ) : (
            <TextInput isRow form={form} name="url_video" type="url" label="URL Video Profil" />
          )}
          {!isEdit ? (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsEdit(true)
              }}
              variant={'outline'}
              className="border-primary w-fit text-primary hover:text-primary"
            >
              <Pencil />
              Edit Data
            </Button>
          ) : (
            <ButtonForm
              onCancel={() => {
                setIsEdit(false)
              }}
              loading={loading}
            />
          )}
          <iframe
            src={getEmbedUrl(video?.url_video ?? '')}
            className="w-full h-96 aspect-video mt-4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        </form>
      </Form>
    </div>
  )
}

export default PPIDSettingsVideosView

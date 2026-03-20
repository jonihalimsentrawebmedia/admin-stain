import { useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CardInput from '@/components/common/card/CardInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { UseGetProdiVisionMission } from '@/pages/modules/website-fakultas/academic/program-studi/detail/hooks'
import { type IVisionMissionForm, VisionMissionResolver } from './resolver.tsx'
import { useParams } from 'react-router-dom'

const VisionMissionProdi = () => {
  const { id } = useParams()
  const { visionMission } = UseGetProdiVisionMission((id as string) ?? '')
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm<IVisionMissionForm>({
    resolver: zodResolver(VisionMissionResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IVisionMissionForm) => {
    setLoading(true)
    await AxiosClient.post(`/fakultas/satuan-organisasi/${id}/visi-misi`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['prodi-vision-mission'],
          })

          setLoading(false)
          setIsEdit(!isEdit)
          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-primary">Tentang Prodi</div>
          {isEdit ? (
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setIsEdit(false)
              }}
            />
          ) : (
            <Button
              onClick={() => {
                setIsEdit(!isEdit)
                form.reset({
                  ...visionMission,
                })
              }}
              variant={'outline'}
              className={'bg-white text-primary border-primary hover:text-primary'}
            >
              <HiPencil />
              Edit
            </Button>
          )}
        </div>
        <CardInput title="Visi">
          {isEdit ? (
            <RichText form={form} name="visi" />
          ) : (
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: visionMission?.visi ?? '' }}
            />
          )}
        </CardInput>
        <CardInput title="Misi">
          {isEdit ? (
            <RichText form={form} name="misi" />
          ) : (
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: visionMission?.misi ?? '' }}
            />
          )}
        </CardInput>
        <CardInput title="Tujuan">
          {isEdit ? (
            <RichText form={form} name="tujuan" />
          ) : (
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: visionMission?.tujuan ?? '' }}
            />
          )}
        </CardInput>
      </form>
    </Form>
  )
}

export default VisionMissionProdi

import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CardInput from '@/components/common/card/CardInput'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Button } from '@/components/ui/button'
import { HiPencil } from 'react-icons/hi'
import { UseGetVisionMission } from '../hooks/index'
import { type IVisionMissionForm, VisionMissionResolver } from './resolver.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

const VisionMissionFaculty = () => {
  const { visionMission } = UseGetVisionMission()
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm<IVisionMissionForm>({
    resolver: zodResolver(VisionMissionResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IVisionMissionForm) => {
    setLoading(true)
    await AxiosClient.post(`/fakultas/profil/visi-misi`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['vision-mission'],
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-primary text-xl sm:text-2xl font-medium">Visi, Misi & Tujuan</div>
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            <ButtonGoToGuide
              titleGuide={'Visi, Misi & Tujuan'}
              valueGuide="FAKULTAS_PROFIL_VISI_MISI"
            />

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

export default VisionMissionFaculty

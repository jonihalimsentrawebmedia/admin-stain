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
import { UseVisionMission } from '@/pages/modules/website-prodi/profile/vision-mission/hooks'
import {
  type IVisiMisiTypeForm,
  VisiMisiResolver,
} from '@/pages/modules/website-utama/program-studi/detail/model/visi-misi.tsx'

const ProfileVisionMissionPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { visionMission } = UseVisionMission()
  const form = useForm<IVisiMisiTypeForm>({
    resolver: zodResolver(VisiMisiResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IVisiMisiTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`prodi/profil/visi-misi`, {
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
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium">Visi, Misi, Dan Tujuan</p>
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

export default ProfileVisionMissionPage

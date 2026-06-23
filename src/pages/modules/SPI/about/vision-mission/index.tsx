import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetVisionMissionSPI } from './hooks/index'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const VisionMissionSPIPage = () => {
  const { visionMission } = UseGetVisionMissionSPI()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (visionMission) {
      form.setValue('visi', visionMission?.visi)
      form.setValue('misi', visionMission?.misi)
    }
  }, [visionMission])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    await AxiosClient.post('/spi/visi-misi', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['vision-mission-spi'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      {isEdit ? (
        <>
          <Form {...form}>
            <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSave)}>
              <ButtonTitleGroup
                label={'Update Visi & Misi'}
                buttonGroup={[
                  {
                    type: 'custom',
                    element: (
                      <ButtonGoToGuide
                        titleGuide={'Visi & Misi'}
                        valueGuide="SPI_TENTANG_VISI_MISI"
                      />
                    ),
                  },
                  {
                    type: 'cancel',
                    label: 'Batal',
                    onClick: () => setIsEdit(!isEdit),
                  },
                  {
                    type: 'save',
                    label: 'Simpan',
                    onClick: () => {},
                  },
                ]}
              />
              <RichText form={form} name={'visi'} isRow={false} label={'Visi'} />
              <RichText form={form} name={'misi'} isRow={false} label={'Misi'} />
              <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className={'mt-5 space-y-4'}>
            <ButtonTitleGroup
              label={'Visi & Misi'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Visi & Misi'}
                      valueGuide="SPI_TENTANG_VISI_MISI"
                    />
                  ),
                },
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />
            <p className="text-yellow-500 font-semibold">VIsi</p>
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: visionMission?.visi ?? '' }}
            />
            <p className="text-yellow-500 font-semibold">Misi</p>
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: visionMission?.misi ?? '' }}
            />
          </div>
        </>
      )}
    </>
  )
}

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import FormUploadImage from '@/pages/modules/LPPM/about/vision-mission/component/uploadImage.tsx'
import { type VisionMission, VisionMissionResolver } from './resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { IVisionMission } from '../hooks/types.ts'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  data?: IVisionMission
}

export const FormVisionMission = (props: props) => {
  const { isEdit, setIsEdit, data } = props
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        visi: data?.visi,
        misi: data?.misi,
        url_gambar_visi: data?.url_gambar_visi,
        url_gambar_misi: data?.url_gambar_misi,
      })
    }
  }, [data])

  const form = useForm<VisionMission>({
    resolver: zodResolver(VisionMissionResolver),
  })

  const queryClient = useQueryClient()

  const handleSave = async (e: VisionMission) => {
    setLoading(true)
    await AxiosClient.post('/lppm/visi-misi', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setIsEdit(!isEdit)
          queryClient.invalidateQueries({
            queryKey: ['about-vision-mission'],
          })
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSave)}>
          <ButtonTitleGroup
            label={'Visi & Misi'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  setIsEdit(!isEdit)
                },
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <p className="text-yellow-500">Visi</p>
          <div className={'grid grid-cols-[240px_1fr] gap-4'}>
            <FormUploadImage form={form} name={'url_gambar_visi'} />
            <RichText
              form={form}
              name={'visi'}
              showLabel={false}
              isRow={false}
              className={'w-full'}
            />
          </div>
          <p className="text-yellow-500">Misi</p>
          <div className={'grid grid-cols-[240px_1fr] gap-4'}>
            <FormUploadImage form={form} name={'url_gambar_misi'} />
            <RichText
              form={form}
              name={'misi'}
              showLabel={false}
              isRow={false}
              className={'w-full'}
            />
          </div>

          <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
        </form>
      </Form>
    </>
  )
}

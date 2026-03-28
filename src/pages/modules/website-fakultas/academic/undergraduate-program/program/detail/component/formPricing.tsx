import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useGetDetailPricingDetail } from '../hooks/index'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const FormPricing = () => {
  const form = useForm()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { pricing } = useGetDetailPricingDetail((id as string) ?? '')

  useEffect(() => {
    if (pricing) {
      form.setValue('isi', pricing?.isi)
    }
  }, [pricing])

  const queryClient = useQueryClient()
  const handleSave = async (e: any) => {
    setLoading(false)
    await AxiosClient.post(`/fakultas/international-ungreaduate-program-biaya/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['detail-pricing'],
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
        <Form {...form}>
          <form className={'flex flex-col gap-5 my-5'} onSubmit={form.handleSubmit(handleSave)}>
            <ButtonTitleGroup
              label={'Biaya'}
              buttonGroup={[
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

            <RichText form={form} name={'isi'} isRow={false} showLabel={false} label={''} />
            <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
          </form>
        </Form>
      ) : (
        <>
          <div className={'flex flex-col gap-5 my-5'}>
            <ButtonTitleGroup
              label={'Biaya'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Biaya',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />
            <RenderHTMLContent content={pricing?.isi ?? ''} />
          </div>
        </>
      )}
    </>
  )
}

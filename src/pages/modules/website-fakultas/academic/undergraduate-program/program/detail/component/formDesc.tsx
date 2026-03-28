import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { UseGetDetailProgram } from '../hooks/index'
import { useQueryClient } from '@tanstack/react-query'

export const FormDescription = () => {
  const form = useForm()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { detail } = UseGetDetailProgram((id as string) ?? '')

  useEffect(() => {
    if (detail) {
      form.setValue('isi', detail?.isi)
    }
  }, [detail])

  const queryClient = useQueryClient()
  const handleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/fakultas/international-ungreaduate-program-deskripsi/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['detail-program'],
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
      {isEdit ? (
        <Form {...form}>
          <form className={'flex flex-col gap-5 my-5'} onSubmit={form.handleSubmit(handleSave)}>
            <ButtonTitleGroup
              label={'Deskripsi'}
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
        <div className={'flex flex-col gap-5 my-5'}>
          <ButtonTitleGroup
            label={'Deskripsi'}
            buttonGroup={[
              {
                type: 'edit',
                label: 'Edit Deskripsi',
                onClick: () => setIsEdit(!isEdit),
              },
            ]}
          />
          <RenderHTMLContent content={detail?.isi ?? ''} />
        </div>
      )}
    </>
  )
}

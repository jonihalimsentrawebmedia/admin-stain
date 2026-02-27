import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetSchemaDevotion } from '@/pages/modules/LPPM/devotion/schema/internal/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FaListUl } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const DevotionInternalSchema = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { responseData } = UseGetSchemaDevotion()

  useEffect(() => {
    if (responseData) {
      form.setValue('isi', responseData?.isi)
    }
  }, [responseData])

  const form = useForm()

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/lppm/pengabdian-pendanaan-internal', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['schema-devotion'],
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
                label={'Pusat Pengabdian'}
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
        </>
      ) : (
        <>
          <div className={'mt-5'}>
            <ButtonTitleGroup
              label={'Pusat Pengabdian'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <Link
                      to={'activity-program'}
                      className={
                        'flex items-center gap-1.5 border border-primary text-primary rounded p-1.5 px-4 bg-white text-sm'
                      }
                    >
                      <FaListUl className={'size-4'} />
                      Program Kegiatan
                    </Link>
                  ),
                },
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: responseData?.isi ?? '' }}
            />
          </div>
        </>
      )}
    </>
  )
}

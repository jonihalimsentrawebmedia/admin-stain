import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetPublicationCenter } from './hooks/index'
import { FaUserFriends } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const BookCenterPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { responseData } = UseGetPublicationCenter({
    context: 'pusat-buku-dan-media-masa',
  })
  const form = useForm()

  useEffect(() => {
    if (responseData) {
      form.setValue('isi', responseData?.isi)
    }
  }, [responseData])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    await AxiosClient.post('/lppm/pusat-publikasi/pusat-buku-dan-media-masa', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['center-publication'],
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
                label={'Pusat Buku dan Media Massa'}
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
              label={'Pusat Buku dan Media Massa'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <Link
                      to={'management'}
                      className={
                        'border border-primary px-3 py-1.5 rounded-md text-primary flex items-center bg-white gap-1.5'
                      }
                    >
                      <FaUserFriends className={'size-4'} />
                      Pengelola
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

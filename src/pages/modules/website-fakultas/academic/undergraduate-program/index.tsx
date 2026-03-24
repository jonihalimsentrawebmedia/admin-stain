import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { MdMenuBook } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa'
import { UseGetDetailUndergraduate } from '@/pages/modules/website-fakultas/academic/undergraduate-program/hooks'

export const AcademicInternationalUnderGraduated = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const navigate = useNavigate()
  const { description } = UseGetDetailUndergraduate()

  useEffect(() => {
    if (description) {
      form.reset({
        isi: description?.isi,
      })
    }
  }, [description])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    await AxiosClient.post('/fakultas/deskripsi-international-ungreaduate-program', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['undergraduate-faculty'],
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
                label={'International Undergraduate Program'}
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
              label={'International Undergraduate Program'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <>
                      <Button
                        variant={'outline'}
                        className={'border-primary text-primary hover:text-primary'}
                        onClick={() => navigate('program')}
                      >
                        <FaListUl className={'size-4 mr-2'} />
                        Daftar Program
                      </Button>
                    </>
                  ),
                },
                {
                  type: 'custom',
                  element: (
                    <>
                      <Button
                        variant={'outline'}
                        className={'border-primary text-primary hover:text-primary'}
                        onClick={() => navigate('story')}
                      >
                        <MdMenuBook className={'size-4 mr-2'} />
                        Cerita Alumni
                      </Button>
                    </>
                  ),
                },
                {
                  type: 'edit',
                  label: 'Edit Deskripsi',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: description?.isi ?? '' }}
            />
          </div>
        </>
      )}
    </>
  )
}

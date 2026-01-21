import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TaskPurposeResolver, type TaskPurposeResolverType } from './data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetTaskPurpose } from './hooks/index'

export const TaskPurposeUnit = () => {
  const { taskPurpose: detail } = UseGetTaskPurpose()

  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<TaskPurposeResolverType>({
    resolver: zodResolver(TaskPurposeResolver),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        fungsi: detail?.fungsi,
        tugas: detail?.tugas,
        tujuan: detail?.tujuan,
      })
    }
  }, [detail])

  const queryClient = useQueryClient()

  const handleSave = async (e: TaskPurposeResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/profil/tujuan-fungsi', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['task-purpose'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        {isEdit ? (
          <Form {...form}>
            <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(handleSave)}>
              <ButtonTitleGroup
                label={'Tugas, Fungsi, & Tujuan'}
                buttonGroup={[
                  { type: 'cancel', label: 'Batal', onClick: () => setIsEdit(!isEdit) },
                  {
                    label: 'Simpan',
                    type: 'save',
                    onClick: () => {},
                    isDisabled: loading,
                  },
                ]}
              />

              <Accordion
                type={'multiple'}
                defaultValue={['tugas', 'fungsi', 'tujuan']}
                className={'flex flex-col gap-5'}
              >
                <AccordionCustom headertClassName={'bg-green-100'} name={'tugas'} title={'Tugas'}>
                  <RichText
                    form={form}
                    name={'tugas'}
                    label={''}
                    className={'flex w-full'}
                    labelClassName={'hidden'}
                    isRow={false}
                  />
                </AccordionCustom>
                <AccordionCustom headertClassName={'bg-green-100'} name={'fungsi'} title={'Fungsi'}>
                  <RichText
                    form={form}
                    name={'fungsi'}
                    label={''}
                    className={'flex w-full'}
                    labelClassName={'hidden'}
                    isRow={false}
                  />
                </AccordionCustom>
                <AccordionCustom headertClassName={'bg-green-100'} name={'tujuan'} title={'Tujuan'}>
                  <RichText
                    form={form}
                    name={'tujuan'}
                    label={''}
                    className={'flex w-full'}
                    labelClassName={'hidden'}
                    isRow={false}
                  />
                </AccordionCustom>
              </Accordion>
            </form>
          </Form>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Tugas, Fungsi, & Tujuan'}
              buttonGroup={[{ label: 'Edit', type: 'edit', onClick: () => setIsEdit(!isEdit) }]}
            />
            <Accordion
              type={'multiple'}
              defaultValue={['tugas', 'fungsi', 'tujuan']}
              className={'flex flex-col gap-5'}
            >
              <AccordionCustom name={'tugas'} title={'Tugas'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.tugas ?? '' }}
                />
              </AccordionCustom>
              <AccordionCustom name={'fungsi'} title={'Fungsi'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.fungsi ?? '' }}
                />
              </AccordionCustom>
              <AccordionCustom name={'tujuan'} title={'Tujuan'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.tujuan ?? '' }}
                />
              </AccordionCustom>
            </Accordion>
          </>
        )}
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { UseGetAboutUnit } from '@/pages/modules/website-unit/profile/about/hooks'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const AboutProfileUnit = () => {
  const { aboutProfile: detail } = UseGetAboutUnit()

  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  useEffect(() => {
    if (detail) {
      form.setValue('isi_konten', detail?.isi_konten ?? '')
    }
  }, [detail])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/unit/profil/tentang', e)
      .then((res) => {
        if (res?.data?.status) {
          queryClient.invalidateQueries({
            queryKey: ['about-unit'],
          })
          setIsEdit(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
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
                label={'Tentang Unit'}
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

              <Accordion type={'single'} defaultValue={'isi'}>
                <AccordionCustom
                  headertClassName={'bg-green-100'}
                  name={'isi'}
                  title={'Isi Konten'}
                >
                  <RichText
                    form={form}
                    name={'isi_konten'}
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
              label={'Tentang Unit'}
              buttonGroup={[{ label: 'Edit', type: 'edit', onClick: () => setIsEdit(!isEdit) }]}
            />
            <Accordion type={'single'} defaultValue={'isi'}>
              <AccordionCustom name={'isi'} title={'Isi Konten'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.isi_konten ?? '' }}
                />
              </AccordionCustom>
            </Accordion>
          </>
        )}
      </div>
    </>
  )
}

import { UseGetVisionMissionUnit } from '@/pages/modules/website-unit/profile/vission/hooks'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VisionMissionResolver, type VisionMissionResolverType } from './data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const VisionMission = () => {
  const { visionMission: detail } = UseGetVisionMissionUnit()

  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<VisionMissionResolverType>({
    resolver: zodResolver(VisionMissionResolver),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        visi: detail?.visi,
        misi: detail?.misi,
        sasaran: detail?.sasaran,
      })
    }
  }, [detail])

  const queryClient = useQueryClient()

  const handleSave = async (e: VisionMissionResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/profil/visi-misi', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['vision-mission-unit'],
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
                label={'Visi, Misi, & Sasaran'}
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
                defaultValue={['Visi', 'misi', 'sasaran']}
                className={'flex flex-col gap-5'}
              >
                <AccordionCustom headertClassName={'bg-green-100'} name={'Visi'} title={'Visi'}>
                  <RichText
                    form={form}
                    name={'visi'}
                    label={''}
                    className={'flex w-full'}
                    labelClassName={'hidden'}
                    isRow={false}
                  />
                </AccordionCustom>
                <AccordionCustom headertClassName={'bg-green-100'} name={'misi'} title={'Misi'}>
                  <RichText
                    form={form}
                    name={'misi'}
                    label={''}
                    className={'flex w-full'}
                    labelClassName={'hidden'}
                    isRow={false}
                  />
                </AccordionCustom>
                <AccordionCustom
                  headertClassName={'bg-green-100'}
                  name={'sasaran'}
                  title={'Sasaran'}
                >
                  <RichText
                    form={form}
                    name={'sasaran'}
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
              label={'Visi, Misi, & Sasaran'}
              buttonGroup={[{ label: 'Edit', type: 'edit', onClick: () => setIsEdit(!isEdit) }]}
            />
            <Accordion
              type={'multiple'}
              defaultValue={['Visi', 'misi', 'sasaran']}
              className={'flex flex-col gap-5'}
            >
              <AccordionCustom name={'Visi'} title={'Visi'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.visi ?? '' }}
                />
              </AccordionCustom>
              <AccordionCustom name={'misi'} title={'Misi'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.misi ?? '' }}
                />
              </AccordionCustom>
              <AccordionCustom name={'sasaran'} title={'Sasaran'}>
                <div
                  className={'tiptap ProseMirror simple-editor'}
                  dangerouslySetInnerHTML={{ __html: detail?.sasaran ?? '' }}
                />
              </AccordionCustom>
            </Accordion>
          </>
        )}
      </div>
    </>
  )
}

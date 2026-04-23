import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetCarrierWebsite } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const WebsiteCarrierPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { website } = UseGetCarrierWebsite()

  const form = useForm()

  useEffect(() => {
    if (website) {
      form.reset({
        url: website?.url,
      })
    }
  }, [website])

  const queryClient = useQueryClient()

  const handleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/website-karir', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setIsEdit(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['website-carrier'],
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
      <div className={'space-y-5 my-5'}>
        {isEdit ? (
          <>
            <Form {...form}>
              <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSave)}>
                <ButtonTitleGroup
                  label={'Webiste Karir'}
                  buttonGroup={[
                    {
                      type: 'custom',
                      element: (
                        <ButtonGoToGuide
                          titleGuide={'Webiste Karir'}
                          valueGuide="PUSILKOM_WEBSITE_KARIR"
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
                      isDisabled: loading,
                      onClick: () => {},
                    },
                  ]}
                />
                <TextInput
                  form={form}
                  name={'url'}
                  label={'Link URL'}
                  placeholder={'Link URL'}
                  className={'w-1/2 bg-white'}
                  isRow
                  isRequired
                  type={'url'}
                />

                <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
              </form>
            </Form>
          </>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Webiste Karir'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Webiste Karir'}
                      valueGuide="PUSILKOM_WEBSITE_KARIR"
                    />
                  ),
                },
                { type: 'edit', label: 'Edit URL', onClick: () => setIsEdit(!isEdit) },
              ]}
            />

            <div
              className={
                'bg-blue-50 border-blue-500 p-2 text-sm text-blue-500 rounded-full flex items-center gap-2 w-fit border'
              }
            >
              <MdInfo className={'size-5'} />
              Masukkan URL atau link tracer study perguruan tinggi anda.
            </div>

            <div className="grid grid-cols-[12rem_1fr]">
              <p className="text-gray-500">URL/Link</p>
              <p>{website?.url}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

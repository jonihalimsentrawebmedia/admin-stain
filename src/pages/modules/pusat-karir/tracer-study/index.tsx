import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetTracerStudy } from '@/pages/modules/pusat-karir/tracer-study/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const TracerStudyPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { tracerStudy } = UseGetTracerStudy()

  const form = useForm()

  useEffect(() => {
    if (tracerStudy) {
      form.reset({
        url: tracerStudy?.url,
      })
    }
  }, [tracerStudy])

  const queryClient = useQueryClient()

  const handleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/studytracer', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setIsEdit(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['tracer-study'],
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
                  label={'Tracer Study'}
                  buttonGroup={[
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
                  name={'link_url'}
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
              label={'Tracer Study'}
              buttonGroup={[{ type: 'edit', label: 'Edit URL', onClick: () => setIsEdit(!isEdit) }]}
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
              <p>{tracerStudy?.url}</p>
            </div>

          </>
        )}
      </div>
    </>
  )
}

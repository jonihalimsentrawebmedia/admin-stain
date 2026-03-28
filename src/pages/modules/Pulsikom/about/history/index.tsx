import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetHistoryAbout } from '@/pages/modules/Pulsikom/about/history/hooks'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { useQueryClient } from '@tanstack/react-query'

export const HistoryAboutPulsikom = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const { history } = UseGetHistoryAbout()

  useEffect(() => {
    if (history) {
      form.reset({
        deskripsi: history?.deskripsi,
        url_gambar: history?.url_gambar,
      })
    }
  }, [history])

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/sejarah', value)
      .then((res) => {
        if (res.data?.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['history-about'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-5 bg-white p-5">
        {isEdit ? (
          <Form {...form}>
            <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
              <ButtonTitleGroup
                label={'Edit Sejarah'}
                buttonGroup={[
                  {
                    type: 'cancel',
                    label: 'Batal',
                    onClick: () => setIsEdit(true),
                  },
                  {
                    type: 'save',
                    label: 'Simpan',
                  },
                ]}
              />

              <UploadPhotoImage ratio_width={1} ratio_height={1} name={'url_gambar'} form={form} />
              <RichText form={form} name={'deskripsi'} label={'Deskripsi'} isRow={false} />

              <ButtonForm loading={loading} onCancel={() => setIsEdit(false)} />
            </form>
          </Form>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Edit Sejarah'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Sejarah',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />

            <div className="flex items-start gap-x-5 bg-white">
              <img
                src={history?.url_gambar}
                className={'w-[480px] h-[360px] object-cover'}
                width={480}
                height={360}
              />
              <RenderHTMLContent content={history?.deskripsi ?? ''} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

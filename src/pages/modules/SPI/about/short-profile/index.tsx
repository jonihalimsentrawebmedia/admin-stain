import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetShortProfile } from './hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { useQueryClient } from '@tanstack/react-query'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ShortProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const { shortProfile } = UseGetShortProfile()

  useEffect(() => {
    if (shortProfile) {
      form.reset({
        isi: shortProfile?.isi,
        url_gambar: shortProfile?.url_gambar,
      })
    }
  }, [shortProfile])

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/spi/profile-singkat', value)
      .then((res) => {
        if (res.data?.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['short-profile'],
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
                label={'Edit Profil Singkat'}
                buttonGroup={[
                  {
                    type: 'custom',
                    element: (
                      <ButtonGoToGuide
                        titleGuide={'Edit Profil Singkat'}
                        valueGuide="SPI_TENTANG_PROFIL"
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
                  },
                ]}
              />

              <UploadPhotoImage ratio_width={1} ratio_height={1} name={'url_gambar'} form={form} />
              <RichText form={form} name={'isi'} label={'Deskripsi'} isRow={false} />

              <ButtonForm loading={loading} onCancel={() => setIsEdit(false)} />
            </form>
          </Form>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Profil Singkat'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Edit Profil Singkat'}
                      valueGuide="SPI_TENTANG_PROFIL"
                    />
                  ),
                },
                {
                  type: 'edit',
                  label: 'Edit Sejarah',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />

            <div className="flex items-start gap-x-5 bg-white">
              <img
                src={shortProfile?.url_gambar}
                className={'w-[480px] h-[360px] object-cover'}
                width={480}
                height={360}
              />
              <RenderHTMLContent content={shortProfile?.isi ?? ''} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

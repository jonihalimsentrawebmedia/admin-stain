import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailELHKPN } from './hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { ButtonAddUrl } from '@/pages/modules/SPI/e-lhkpn/component/buttonAddUrl.tsx'

export const ELHKPNDetailPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const { ELHKPN } = UseGetDetailELHKPN()

  useEffect(() => {
    if (ELHKPN) {
      form.reset({
        deskripsi: ELHKPN?.deskripsi,
        url_gambar: ELHKPN?.url_gambar,
      })
    }
  }, [ELHKPN])

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/spi/elhkpn/upsert-gambar-deskripsi', value)
      .then((res) => {
        if (res.data?.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['e-lhkpn'],
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
              <RichText form={form} name={'deskripsi'} label={'Deskripsi'} isRow={false} />

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
                  element: <ButtonAddUrl data={ELHKPN} />,
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
                src={ELHKPN?.url_gambar}
                className={'w-[480px] h-[360px] object-cover'}
                width={480}
                height={360}
              />
              <RenderHTMLContent content={ELHKPN?.deskripsi ?? ''} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import { useGetQuotes } from '@/pages/modules/website-utama/settings-menu/qoutes/hooks'

export const QuotesPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const { quotes } = useGetQuotes()

  useEffect(() => {
    if (quotes) {
      form.reset({
        isi: quotes?.isi,
        pengarang: quotes?.pengarang,
        url_gambar_background: quotes?.url_gambar_background,
      })
    }
  }, [quotes])

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/quotes', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data quotes')
          queryClient.invalidateQueries({
            queryKey: ['quotes'],
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
      {isEdit ? (
        <>
          <Form {...form}>
            <form className={'flex flex-col gap-4 mt-5'} onSubmit={form.handleSubmit(HandleSave)}>
              <ButtonTitleGroup
                label={'Quotes'}
                buttonGroup={[
                  { type: 'cancel', onClick: () => setIsEdit(false) },
                  {
                    type: 'save',
                    label: 'Simpan',
                  },
                ]}
              />

              <UploadImageRatio
                name={'url_gambar_background'}
                form={form}
                label={'Gambar Background'}
                placeholder={'Gambar Background'}
                aspectRatioWidth={16}
                aspectRatioHeight={9}
                maxWidthClassName={'w-[500px]'}
                required
                isRow
              />
              <TextAreaInput
                name={'isi'}
                form={form}
                label={'Quotes'}
                placeholder={'Quotes'}
                isRow
                isRequired
              />
              <TextInput
                name={'pengarang'}
                form={form}
                label={'Pengarang'}
                placeholder={'Pengarang'}
                isRow
                isRequired
              />

              <ButtonForm loading={loading} onCancel={() => setIsEdit(false)} />
            </form>
          </Form>
        </>
      ) : (
        <div className="space-y-4">
          <ButtonTitleGroup
            label={'Quotes'}
            buttonGroup={[
              {
                type: 'edit',
                label: 'Edit Data',
                onClick: () => setIsEdit(!isEdit),
              },
            ]}
          />

          <img
            src={quotes?.url_gambar_background}
            alt="quotes"
            className="w-[400px] object-contain h-[250px]"
          />

          <div className="grid grid-cols-[12rem_1fr] gap-4">
            <p className="text-gray-500">Isi</p>
            <p>{quotes?.isi}</p>
            <p className="text-gray-500">Pengarang</p>
            <p>{quotes?.pengarang}</p>
          </div>
        </div>
      )}
    </>
  )
}

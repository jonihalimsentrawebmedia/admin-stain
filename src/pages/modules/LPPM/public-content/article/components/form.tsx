import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadMultipleImages } from '@/pages/modules/website-utama/public-content/news/components/multipleUploadImg.tsx'
import type { IResolverArticleType } from '../data/resolver'

interface Props {
  loading: boolean
  HandleSave: (e: IResolverArticleType) => void
  form: UseFormReturn<IResolverArticleType>
}

export const FormArticleLppm = (props: Props) => {
  const { loading, form, HandleSave } = props
  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-4">
          <ButtonTitleGroup
            label={'Tulis Artikel'}
            buttonGroup={[
              {
                type: 'custom',
                element: <ButtonForm onCancel={() => navigate(-1)} loading={loading} />,
              },
            ]}
          />

          <UploadImageWitAlt
            form={form}
            alt={'keterangan_gambar'}
            label={'Gambar Utama (Ukuran 1280 x 478)'}
            name={'gambar'}
            placeholder={'Gambar Utama'}
            uploadUrl={'/upload'}
            required
          />

          <TextAreaInput
            name={'judul'}
            form={form}
            isRequired
            isRow
            label={'Judul Artikel'}
            className={'items-start'}
            inputClassName={'min-h-[8rem] bg-white'}
            placeholder={'Judul  Artikel'}
          />

          <RichText form={form} name={'isi_artikel'} label={'Isi Artikel'} required />

          <TextInput
            form={form}
            name={'penulis'}
            label={'Penulis'}
            isRequired
            isRow
            placeholder={'Penulis'}
            inputClassName={'bg-white'}
          />

          <UploadMultipleImages
            form={form}
            name={'artikel_gambar_tambahan'}
            label={'Gambar Tambahan (Ukuran 1280 x 478)'}
            uploadUrl={'/upload'}
            placeholder={'Gambar Tambahan'}
            maxFiles={10}
          />

          <ButtonForm onCancel={() => navigate(-1)} loading={loading} />
        </form>
      </Form>
    </>
  )
}

import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import type { IResolverPromotionType } from '@/pages/modules/website-prodi/public-content/promotion/data/resolver.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadMultipleImages } from '@/pages/modules/website-utama/public-content/news/components/multipleUploadImg.tsx'

interface Props {
  loading: boolean
  HandleSave: (e: IResolverPromotionType) => void
  form: UseFormReturn<IResolverPromotionType>
}

export const FormPromotionProdi = (props: Props) => {
  const { loading, form, HandleSave } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-4">
          <ButtonTitleGroup
            label={'Tulis Promosi'}
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
            label={'Judul Promosi'}
            className={'items-start'}
            inputClassName={'min-h-[8rem] bg-white'}
            placeholder={'Judul  Promosi'}
          />

          <RichText form={form} name={'isi_promosi'} label={'Isi Promosi'} required />

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
            name={'promosi_gambar_tambahan'}
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

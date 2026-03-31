import type { UseFormReturn } from 'react-hook-form'
import type { TResolverProduct } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface Props {
  form: UseFormReturn<TResolverProduct>
  loading: boolean
  HandleSave: (e: TResolverProduct) => void
}

export const FormProduct = (props: Props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            buttonGroup={[
              { type: 'cancel', onClick: () => navigate(-1) },
              { type: 'save', onClick: () => {} },
            ]}
            label={'Tambah Produk'}
          />

          <UploadPhotoImage
            className={'w-[420px]'}
            ratio_width={4}
            ratio_height={2}
            name={'url_gambar'}
            form={form}
          />
          <TextInput
            form={form}
            name={'nama_produk'}
            label={'Nama Produk'}
            placeholder={'Nama Produk'}
            inputClassName={'bg-white'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            inputClassName={'w-1/2 bg-white'}
            isNumber
            isRow
            isRequired
          />

          <div className="flex flex-col gap-1">
            <RichText
              form={form}
              name={'deskripsi_lengkap'}
              label={'Deskripsi Lengkap'}
              isRow
              required
            />
            <p className="text-sm text-blue-500 pl-[212px]">
              Jelaskan produk secara mendalam, termasuk tujuan, fitur, dan informasi teknis.
            </p>
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

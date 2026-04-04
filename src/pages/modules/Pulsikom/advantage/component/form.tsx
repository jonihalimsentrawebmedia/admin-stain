import { type UseFormReturn } from 'react-hook-form'
import { type TResolverAdvantage } from '../data/resolver'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface Props {
  form: UseFormReturn<TResolverAdvantage>
  loading: boolean
  HandleSave: (e: TResolverAdvantage) => void
}

export const FormAdvantage = (prop: Props) => {
  const { form, loading, HandleSave } = prop
  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Tambah Keunggulan'}
            isBack
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => navigate(-1) },
              { type: 'save', label: 'Simpan' },
            ]}
          />

          <UploadPhotoImage ratio_width={1} ratio_height={1} name={'url_gambar'} form={form} />
          <TextInput
            form={form}
            name={'nama_keunggulan'}
            label={'Nama Keunggulan'}
            placeholder={'Nama Keunggulan'}
            htmlFor={'nama_keunggulan'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            htmlFor={'urutan'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <TextAreaInput
            name={'deskripsi_singkat'}
            form={form}
            label={'Deskripsi Singkat'}
            placeholder={'Deskripsi Singkat'}
            htmlFor={'deskripsi_singkat'}
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

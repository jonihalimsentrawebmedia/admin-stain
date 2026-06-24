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
  title?: string
}

export const FormAdvantage = (prop: Props) => {
  const { form, loading, HandleSave, title } = prop
  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={title ?? 'Tambah Keunggulan'}
            isBack
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => navigate(-1) },
              { type: 'save', label: 'Simpan' },
            ]}
          />

          <UploadPhotoImage
            label={'Upload Gambar'}
            ratio_width={1}
            ratio_height={1}
            name={'url_gambar'}
            form={form}
          />
          <TextInput
            form={form}
            name={'nama_keunggulan'}
            inputClassName={'bg-white'}
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
            inputClassName={'bg-white'}
            placeholder={'Urutan'}
            htmlFor={'urutan'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <div className="flex flex-col gap-1">
            <TextAreaInput
              name={'deskripsi_singkat'}
              form={form}
              label={'Deskripsi Singkat'}
              inputClassName={'bg-white'}
              placeholder={'Deskripsi Singkat'}
              htmlFor={'deskripsi_singkat'}
              isRow
              isRequired
            />
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <div />
              <p className="text-xs text-blue-500">
                Maksimak 150 Karakter. Text ini akan muncul pada Dekripsi Keunggulan di halaman
                depan.
              </p>
            </div>
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

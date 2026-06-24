import type { UseFormReturn } from 'react-hook-form'
import type { TResolverService } from '@/pages/modules/Pulsikom/services/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface Props {
  form: UseFormReturn<TResolverService>
  loading: boolean
  HandleSave: (e: TResolverService) => void
  title?: string
}

export const FormServicePulsikom = (props: Props) => {
  const { form, loading, HandleSave, title } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            isBack
            buttonGroup={[
              { type: 'cancel', onClick: () => navigate(-1) },
              { type: 'save', label: 'Simpan' },
            ]}
            label={title ?? 'Tambah Layanan'}
          />

          <UploadPhotoImage
            className={'w-[420px]'}
            label={'Upload Gambar'}
            ratio_width={4}
            ratio_height={2}
            name={'url_gambar'}
            form={form}
          />
          <TextInput
            form={form}
            name={'nama_layanan'}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
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
              name={'deskripsi_singkat'}
              label={'Deskripsi Singkat'}
              isRow
              required
            />
            <p className="text-sm text-blue-500 pl-[212px]">
              Maksimal 150 karakter. Teks ini akan muncul pada kartu layanan di halaman depan. Fokus
              pada manfaat utama.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <RichText
              form={form}
              name={'deskripsi_lengkap'}
              label={'Deskripsi Lengkap'}
              isRow
              required
            />
            <p className="text-sm text-blue-500 pl-[212px]">
              Jelaskan layanan secara mendalam, termasuk prosedur, fitur, dan informasi teknis.
              Gunakan heading untuk kerapian.
            </p>
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

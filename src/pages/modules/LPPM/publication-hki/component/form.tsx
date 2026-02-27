import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { UseFormReturn } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { SchemaUserManagement } from '@/pages/modules/LPPM/publication-hki/component/resolver.tsx'
import FormUploadPhotoImage from '@/pages/modules/LPPM/components/common/uploadPhoto.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface FormProps {
  form: UseFormReturn<SchemaUserManagement>
  HandleSave: (data: SchemaUserManagement) => void
  loading: boolean
}

export const FormManagement = (props: FormProps) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Tambah Pengelola'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <TextInput
            form={form}
            name={'context'}
            label={'Kelompok'}
            inputClassName={'bg-white'}
            placeholder={'Kelompok'}
            isRow
            isDisabled
          />

          <div className="w-fit">
            <FormUploadPhotoImage form={form} name={'url_gambar'} />
          </div>

          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            inputClassName={'bg-white'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'nama'}
            inputClassName={'bg-white'}
            label={'Nama'}
            placeholder={'Nama'}
            isRow
            isRequired
          />

          <TextInput
            inputClassName={'bg-white'}
            form={form}
            name={'nip'}
            label={'NIP'}
            placeholder={'NIP'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'nidn'}
            inputClassName={'bg-white'}
            label={'NIDN'}
            placeholder={'NIDN'}
            isRow
            isRequired
          />

          <TextInput
            form={form}
            name={'pangkat'}
            inputClassName={'bg-white'}
            label={'Pangkat'}
            placeholder={'Pangkat'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'golongan'}
            inputClassName={'bg-white'}
            label={'Golongan'}
            placeholder={'Golongan'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'jabatan'}
            label={'Jabatan'}
            placeholder={'Jabatan'}
            inputClassName={'bg-white'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'email'}
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            inputClassName={'bg-white'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'publikasi'}
            inputClassName={'bg-white'}
            label={'Publikasi'}
            placeholder={'Ketik dan gunakan tanda koma (,) untuk memisahkan. Cth: Scholar'}
            isRow
            isRequired
          />

          <InputRadio
            form={form}
            name={'status'}
            label={'Status'}
            isRow
            isRequired
            data={[
              { value: true, label: 'Aktif' },
              { value: false, label: 'Tidak Aktif' },
            ]}
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

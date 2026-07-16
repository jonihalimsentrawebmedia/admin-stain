import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import type { TResolverProfileHospital } from '../data/resolver.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<TResolverProfileHospital>
  HandleSave: (e: TResolverProfileHospital) => void
  setIsEdit: (e: boolean) => void
}

const FormProfileHospital = (props: Props) => {
  const { loading, form, HandleSave, setIsEdit } = props

  return (
    <Form {...form}>
      <form className={'flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <ButtonTitleGroup
          label={'Edit Profil Rumah Sakit'}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setIsEdit(false) },
            { type: 'save', label: 'Simpan', onClick: () => {} },
          ]}
        />
        <div className="mt-5">
          <TitleLine title="Informasi Rumah Sakit" />
          <div className={'lg:grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 space-y-2'}>
            <TextInput
              name={'nama'}
              form={form}
              label={'Nama Rumah Sakit'}
              placeholder={'Masukkan Nama Rumah Sakit'}
              htmlFor={'nama'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'email'}
              form={form}
              label={'Email'}
              placeholder={'Masukkan Email'}
              htmlFor={'email'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'telepon'}
              form={form}
              label={'Telepon'}
              placeholder={'Masukkan Telepon'}
              htmlFor={'telepon'}
              inputClassName={'bg-white'}
              isRequired
            />
            <div className="col-span-2">
              <UploadFileInput
                form={form}
                name={'url_logo'}
                keyname={'url_logo'}
                label={'Logo Rumah Sakit'}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <TitleLine title="Alamat" />
          <div className={'mt-5'}>
            <TextAreaInput
              name={'alamat'}
              form={form}
              label={'Alamat'}
              placeholder={'Masukkan Alamat'}
              isRequired
            />
          </div>
        </div>

        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default FormProfileHospital

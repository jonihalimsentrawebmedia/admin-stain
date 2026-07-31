import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import type { TResolverProfileHospital } from '../data/resolver.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

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
            { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_PROFILE" /> },
            { type: 'cancel', label: 'Batal', onClick: () => setIsEdit(false) },
            { type: 'save', label: 'Simpan', onClick: () => {} },
          ]}
        />
        <div className="mt-5">
          <div className="col-span-2 mb-4">
            <UploadPhotoImage
              name={'url_logo'}
              form={form}
              label={'Logo Rumah Sakit'}
              ratio_width={1}
              ratio_height={1}
            />
          </div>
          <TitleLine title="Identitas Rumah Sakit" />
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
          </div>
          <TextAreaInput
            name={'alamat'}
            form={form}
            label={'Alamat'}
            placeholder={'Masukkan Alamat'}
            className={'mt-5'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default FormProfileHospital

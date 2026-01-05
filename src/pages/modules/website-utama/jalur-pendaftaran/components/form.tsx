import type { UseFormReturn } from 'react-hook-form'
import type { IRegisterPath } from '../data/resolver'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import { SwitchInput } from '@/components/common/form/switchInput.tsx'

interface Props {
  form: UseFormReturn<IRegisterPath>
  handleSave: (value: IRegisterPath) => void
  loading: boolean
}

export const RegistrationPathForm = (props: Props) => {
  const { form, handleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSave)}>
          <ButtonTitleGroup
            isBack
            buttonGroup={[
              {
                isDisabled: loading,
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
            label="Jalur Pendaftaran"
          />

          <TextInput
            form={form}
            name={'nama_jalur_pendaftaran'}
            label={'Nama Jalur Pendaftaran'}
            placeholder={'Nama Jalur Pendaftaran'}
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} isRow required />

          <SwitchInput form={form} name={'status'} label={'Status'} isRow isRequired />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                isDisabled: loading,
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}

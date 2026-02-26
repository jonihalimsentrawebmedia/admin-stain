import { UseGetStaff } from '@/pages/modules/LPPM/about/staff/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormUploadPhotoImage from '@/pages/modules/LPPM/components/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { MemberSchema } from '@/pages/modules/LPPM/about/staff/member/hooks/resolver.tsx'
import { useNavigate } from 'react-router-dom'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

interface FormProps {
  form: UseFormReturn<MemberSchema>
  handleSave: (e: MemberSchema) => void
  loading: boolean
}

export const FormMemberStaff = (props: FormProps) => {
  const { form, loading, handleSave } = props
  const navigate = useNavigate()

  const { staff } = UseGetStaff({
    limit: '0',
    page: '0',
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSave)}>
          <ButtonTitleGroup
            label={'Tambah Anggota'}
            isBack
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
          v
          <SelectBasicInput
            label={'Kelompok Staff'}
            name={'id_staff'}
            form={form}
            placeholder={'id'}
            isDisabled
            isRow
            data={
              staff?.map((row) => ({
                value: row?.id_staff,
                label: row?.nama_kelompok,
              })) ?? []
            }
          />
          
          <div className="w-fit">
            <FormUploadPhotoImage form={form} name={'url_gambar'} />
          </div>
          <TextInput
            form={form}
            name={'nama_anggota'}
            label={'Nama Anggota'}
            placeholder={'Nama Anggota'}
            inputClassName={'bg-white'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'nip'}
            label={'NIP'}
            placeholder={'NIP'}
            inputClassName={'bg-white'}
            type={'number'}
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
          <InputRadio
            form={form}
            name={'status'}
            data={[
              { value: true, label: 'Aktif' },
              { value: false, label: 'Tidak Aktif' },
            ]}
            label={'Status'}
            isRow
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

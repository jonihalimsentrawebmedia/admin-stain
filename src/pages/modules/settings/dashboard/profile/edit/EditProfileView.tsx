import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import EditProfileViewModel from './EditProfileViewModel'
import ImageProfile from '../components/ImageProfile'
import useUpdateProfile from '../controller/useUpdateProfile'
import CardInput from '@/components/common/card/CardInput'
import DetailField from '@/components/common/field/DetailField'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import { InputRadio } from '@/components/common/form/InputRadio'
import { useEffect } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm'

const EditProfileView = () => {
  const { form, field, profile } = EditProfileViewModel()
  const { handleSave, loading, form: formUpdate, goToBack } = useUpdateProfile()

  useEffect(() => {
    if (profile) {
      formUpdate.reset({
        ...profile,
      })
    }
  }, [profile])
  return (
    <div className="w-full flex flex-col">
      <Form {...formUpdate}>
        <form onSubmit={formUpdate.handleSubmit(handleSave)} className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-4">
            <ButtonTitleGroup
              buttonGroup={[
                {
                  label: 'Batal',
                  type: 'cancel',
                  onClick: () => {
                    goToBack()
                  },
                  isDisabled: loading,
                },
                {
                  label: 'simpan',
                  type: 'save',
                  onClick: (e) => {
                    e.preventDefault()
                  },
                },
              ]}
              label="Edit Profil"
              isBack
            />
            <ImageProfile img={profile?.gambar ?? ''} isEdit/>
            <CardInput title="Informasi User">
              <div className="w-full flex flex-col gap-4">
                <InputText
                  form={form}
                  name="nama_lengkap"
                  isRow
                  label="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  isRequired
                />
                <InputText
                  form={form}
                  name="jabatan"
                  isRow
                  label="Jabatan"
                  placeholder="Jabatan"
                  isRequired
                />
                <InputRadio
                  form={form}
                  isRow
                  name="jenis_kelamin"
                  label="Jenis Kelamin"
                  data={[
                    {
                      label: 'Laki-Laki',
                      value: 'L',
                    },
                    {
                      label: 'Perempuan',
                      value: 'P',
                    },
                  ]}
                />
                <InputText
                  form={form}
                  name="telepon"
                  isRow
                  label="Telepon"
                  placeholder="Telepon"
                  type="number"
                  inputClassName="lg:max-w-[300px]"
                />
                <InputText
                  form={form}
                  name="email"
                  isRow
                  label="Email"
                  placeholder="Email"
                  type="email"
                  inputClassName="lg:max-w-[300px]"
                />
              </div>

              <DetailField data={field} form={form} />
            </CardInput>
          </div>
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  )
}

export default EditProfileView

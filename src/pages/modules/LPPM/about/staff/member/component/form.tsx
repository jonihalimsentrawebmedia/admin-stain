import { UseGetStaff } from '@/pages/modules/LPPM/about/staff/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { MemberSchema } from '@/pages/modules/LPPM/about/staff/member/hooks/resolver.tsx'
import { useNavigate } from 'react-router-dom'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'

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
  const { employee } = UseGetEmployee({
    page: '0',
    limit: '0',
    filter: form?.watch('is_dosen') === true ? 'DOSEN' : 'STAFF',
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

          <InputRadio
            form={form}
            name={'is_local_data'}
            label={'Pilih Dari Data Dosen/Staff'}
            data={[
              { label: 'Ya', value: true },
              { label: 'Tidak', value: false },
            ]}
            fx={() => {
              form.setValue('is_dosen', null)
              form.setValue('id_sdm', null)
              form.setValue('nama_anggota', '')
              form.setValue('jabatan', '')
            }}
            isRequired
            isRow
          />

          {!!form?.watch('is_local_data') && (
            <>
              <InputRadio
                form={form}
                name={'is_dosen'}
                label={'Jenis User'}
                data={[
                  { label: 'Dosen', value: true },
                  { label: 'Staff', value: false },
                ]}
                fx={() => {
                  form.setValue('nama_anggota', '')
                  form.setValue('jabatan', '')
                }}
                isRequired
                isRow
              />
            </>
          )}

          {!!form?.watch('is_local_data') && (
            <SelectBasicInput
              isDisabled={loading || !form.watch('is_local_data')}
              fx={(e) => {
                const employeeFind = employee?.find((row) => row?.id_sdm === e.value)
                form.setValue('url_gambar', employeeFind?.gambar_url ?? '')
                form.setValue('nama_anggota', employeeFind?.nama ?? '')
                form.setValue('jabatan', employeeFind?.nama_jabatan_struktural ?? '')
              }}
              name={'id_sdm'}
              form={form}
              label={'Pilih Dosen / Staff'}
              placeholder={'Pilih Dosen / Staff'}
              showNull
              selectClassName={'z-[60]'}
              isRow
              data={
                employee?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_sdm,
                })) ?? []
              }
            />
          )}

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <div />
            <UploadPasPhoto
              label={'Foto Profil (4x6)'}
              name={'gambar_url'}
              form={form}
              required
              placeholder={'Uplaod Foto'}
              canUpload={!form.watch('is_local_data')}
            />
          </div>

          <TextInput
            form={form}
            name="nama_anggota"
            isRow
            label="Nama"
            placeholder="Nama"
            isDisabled={!!form.watch('is_local_data')}
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

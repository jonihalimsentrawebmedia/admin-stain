import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { DivisionTeamResolverType } from '../data/resolver'
import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'

interface Props {
  form: UseFormReturn<DivisionTeamResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleSave: (e: DivisionTeamResolverType) => void
}

export const FormDivisionTeam = (props: Props) => {
  const { form, loading, open, setOpen, handleSave } = props
  const { employee } = UseGetEmployee({
    page: '0',
    limit: '0',
    filter: form?.watch('is_dosen') === true ? 'DOSEN' : 'STAFF',
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(handleSave)}>
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
              form.setValue('nama', '')
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
                  form.setValue('nama', '')
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
                form.setValue('foto_url', employeeFind?.gambar_url ?? '')
                form.setValue('nama', employeeFind?.nama ?? '')
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
              name={'foto_url'}
              form={form}
              required
              placeholder={'Uplaod Foto'}
              canUpload={!form.watch('is_local_data')}
            />
          </div>

          <TextInput
            form={form}
            name="nama"
            isRow
            label="Nama"
            placeholder="Nama"
            isDisabled={!!form.watch('is_local_data')}
          />

          <TextInput name={'nama_unit'} isDisabled isRow label={'Pilih Unit'} form={form} />
          <TextInput name={'nama_divisi'} isDisabled isRow label={'Divisi'} form={form} />

          <TextInput
            name={'jabatan'}
            label={'Jabatan'}
            form={form}
            placeholder={'Jabatan'}
            isRequired
            isRow
          />

          <InputRadio
            label={'Kepala Unit?'}
            form={form}
            name={'is_kepala_unit'}
            data={[
              { label: 'Ya', value: true },
              { label: 'Tidak', value: false },
            ]}
            isRow
            isRequired
          />

          <TextInput
            name={'urutan'}
            label={'Urutan'}
            form={form}
            type={'number'}
            placeholder={'Urutan'}
            isRequired
            isNumber
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

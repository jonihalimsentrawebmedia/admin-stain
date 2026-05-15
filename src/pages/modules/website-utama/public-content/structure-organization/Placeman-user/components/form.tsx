import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { PlacemanType } from '../data/resolver'
import TextInput from '@/components/common/form/TextInput.tsx'
import useGetGroupRank from '@/pages/modules/settings/reference/group-rank/controller/useGetGroupRank.tsx'
import useGetAcademicRank from '@/pages/modules/settings/reference/academic-rank/controller/useGetAcademicRank.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import Checkbox from '@/components/common/form/checkbox.tsx'
import type { Dispatch, SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface Props {
  form: UseFormReturn<PlacemanType>
  loading: boolean
  HandleSave: (e: PlacemanType) => void
  open: Boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormPlacemanUser = (props: Props) => {
  const { form, loading, HandleSave, open, setOpen } = props

  const { loading: load1, groupRank } = useGetGroupRank()
  const { loading: load2, academicRank } = useGetAcademicRank()
  const { employee } = UseGetEmployee({
    page: '0',
    limit: '0',
    filter: form?.watch('is_dosen') === true ? 'DOSEN' : 'STAFF',
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-2'}>
          <UploadPasPhoto
            label={'Foto Profil (4x6)'}
            name={'gambar'}
            form={form}
            required
            placeholder={'Uplaod Foto'}
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
              form.setValue('gambar', '')
              form.setValue('nama_lengkap', '')
              form.setValue('jabatan', '')
              form.setValue('nip', null)
              form.setValue('nidn', null)
              form.setValue('id_pangkat_golongan', null)
              form.setValue('email', '')
              form.setValue('no_hp', '')
            }}
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'is_dosen'}
            label={'Jenis User'}
            data={[
              { label: 'Dosen', value: true },
              { label: 'Staff', value: false },
            ]}
            fx={() => {
              form.setValue('gambar', '')
              form.setValue('nama_lengkap', '')
              form.setValue('jabatan', '')
              form.setValue('nip', null)
              form.setValue('nidn', null)
              form.setValue('id_pangkat_golongan', null)
              form.setValue('email', '')
              form.setValue('no_hp', '')
            }}
            isRequired
            isRow
          />

          <SelectBasicInput
            isDisabled={loading || !form.watch('is_local_data')}
            fx={(e) => {
              const employeeFind = employee?.find((row) => row?.id_sdm === e.value)
              form.setValue('gambar', employeeFind?.gambar_url ?? '')
              form.setValue('nama_lengkap', employeeFind?.nama ?? '')
              form.setValue('jabatan', employeeFind?.nama_jabatan_struktural ?? '')
              form.setValue('nip', employeeFind?.nip ?? '')
              form.setValue('nidn', employeeFind?.nidn ?? '')
              form.setValue('id_pangkat_golongan', employeeFind?.id_pangkat_golongan)
              form.setValue('email', employeeFind?.email ?? '')
              form.setValue('no_hp', employeeFind?.no_hp ?? '')
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

          <TextInput
            name={'nama_lengkap'}
            form={form}
            label={'Nama Lengkap'}
            isDisabled={!!form.watch('is_local_data')}
            placeholder={'Nama Lengkap beserta gelar'}
            isRequired
            isRow
          />
          <TextInput name={'jabatan'} form={form} label={'Jabatan'} placeholder={'Jabatan'} isRow />
          <TextInput name={'nip'} form={form} label={'NIP'} placeholder={'NIP'} isRow />
          {form?.watch('is_dosen') && (
            <TextInput name={'nidn'} form={form} label={'NIDN'} placeholder={'NIDN'} isRow />
          )}

          <SelectBasicInput
            label={'Pangkat Golongan'}
            name={'id_pangkat_golongan'}
            form={form}
            placeholder={'Pilih Pangkat Golongan'}
            isDisabled={load1}
            selectClassName={'w-[20rem]'}
            usePortal
            showNull
            isRow
            data={
              groupRank?.map((row) => ({
                label: row?.nama_golongan,
                value: row?.id_golongan,
              })) ?? []
            }
          />

          <SelectBasicInput
            label={'Pangkat Akademik'}
            name={'id_pangkat_akademik'}
            form={form}
            placeholder={'Pilih Pangkat Akademik'}
            selectClassName={'w-[20rem]'}
            isDisabled={load2}
            usePortal
            showNull
            isRow
            data={
              academicRank?.map((row) => ({
                label: row?.nama_akademik,
                value: row?.id_akademik,
              })) ?? []
            }
          />

          <div className="flex items-center gap-1.5">
            <TextInput
              name={'email'}
              form={form}
              inputClassName={'lg:min-w-[20rem]'}
              label={'Email'}
              placeholder={'Email'}
              isRow
            />
            <Checkbox name={'show_email_public'} label={'Tampilkan ke public'} form={form} />
          </div>
          <div className="flex items-center gap-1.5">
            <TextInput
              name={'no_hp'}
              form={form}
              inputClassName={'lg:min-w-[20rem]'}
              label={'No. HP'}
              placeholder={'No HP'}
              isRow
            />
            <Checkbox name={'show_no_hp_public'} label={'Tampilkan ke public'} form={form} />
          </div>

          <TextInput
            name={'urutan'}
            inputClassName={'lg:w-[20rem]'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            isNumber
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

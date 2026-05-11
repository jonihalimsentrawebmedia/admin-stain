import type { UseFormReturn } from 'react-hook-form'
import type { TEmployeeResolver } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetReFUnit } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface props {
  form: UseFormReturn<TEmployeeResolver>
  loading: boolean
  HandlerSave: (e: TEmployeeResolver) => void
  label: string
}

const FormEmployee = (props: props) => {
  const { form, label, loading, HandlerSave } = props
  const navigate = useNavigate()

  const { workUnit } = UseGetReFUnit()
  const { status } = UseGetStatusEmployee({
    page: '0',
    limit: '0',
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 bg-white'} onSubmit={form.handleSubmit(HandlerSave)}>
          <ButtonTitleGroup
            label={label}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate(-1),
              },
              { type: 'save', label: 'Simpan' },
            ]}
          />

          <p className="text-primary text-xl font-semibold">Informasi Pribadi</p>

          <UploadPhotoImage
            name={'gambar_url'}
            form={form}
            ratio_width={3}
            ratio_height={4}
            className={'max-w-[180px] w-[180px]'}
          />

          <InputRadio
            form={form}
            name={'type_pegawai'}
            label={'Jenis Kepegawaian'}
            isRequired
            isRow
            data={[
              {
                label: 'Dosen',
                value: 'DOSEN',
              },
              {
                label: 'Staff',
                value: 'STAFF',
              },
            ]}
          />

          <TextInput
            form={form}
            name={'nama'}
            label={'Nama'}
            placeholder={'Masukkan Nama'}
            htmlFor={'nama'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'nik'}
            label={'NIK'}
            placeholder={'Masukkan NIK'}
            htmlFor={'nik'}
            type={'number'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'tempat_lahir'}
            label={'Tempat Lahir'}
            placeholder={'Tempat Lahir'}
            htmlFor={'tempat_lahir'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            className={'w-1/2'}
            name={'tanggal_lahir'}
            label={'Tanggal Lahir'}
            type={'date'}
            htmlFor={'tanggal_lahir'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            className={'w-1/2'}
            name={'no_hp'}
            label={'No. HP'}
            placeholder={'Nomor HP'}
            htmlFor={'no_hp'}
            type={'number'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            className={'w-1/2'}
            name={'email'}
            label={'Email'}
            placeholder={'Email'}
            htmlFor={'email'}
            type={'email'}
            isRequired
            isRow
          />

          <p className="text-primary text-xl font-semibold">Informasi Kepegawaian</p>

          <SelectBasicInput
            name={'id_status'}
            form={form}
            placeholder={'Pilih Status'}
            label={'Status'}
            isRequired
            isRow
            usePortal
            fx={() => {
              form.setValue('nidn', '')
            }}
            data={
              status?.map((row) => ({
                label: row?.nama_status,
                value: row?.id_status_sdm,
              })) ?? []
            }
          />

          <TextInput
            form={form}
            name={'nip'}
            label={'NIP'}
            placeholder={'Masukan NIP'}
            htmlFor={'nip'}
            type={'number'}
            isRequired
            isRow
          />

          {status?.find((row) => row.id_status_sdm === form.watch('id_status'))?.is_ada_nidn && (
            <TextInput
              form={form}
              name={'nidn'}
              label={'NIDN'}
              placeholder={'Masukan NIDN'}
              htmlFor={'nip'}
              type={'number'}
              isRequired
              isRow
            />
          )}

          <SelectBasicInput
            name={'id_unit_kerja'}
            form={form}
            placeholder={'Pilih Unit Kerja'}
            label={'Unit Kerja'}
            isRequired
            isRow
            usePortal
            data={
              workUnit?.map((row) => ({
                label: row?.nama_satuan_organisasi,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />

          <TextInput
            form={form}
            name={'golongan'}
            label={'Golongan'}
            placeholder={'Golongan'}
            htmlFor={'golongan'}
            isRequired
            isRow
          />
          <TextInput
            form={form}
            name={'jabatan_struktural'}
            label={'Jabatan Struktural'}
            placeholder={'Jabatan Struktural'}
            htmlFor={'jabatan_struktural'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
export default FormEmployee

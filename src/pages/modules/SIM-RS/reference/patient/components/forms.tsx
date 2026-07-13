import type { UseFormReturn } from 'react-hook-form'
import type { TResolverPatient } from '../data/resolver'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import useGetCountry from '@/pages/modules/settings/reference/country/controller/useGetCountry'
import useGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince'
import useGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency'

interface Props {
  loading: boolean
  form: UseFormReturn<TResolverPatient>
  HandleSave: (e: TResolverPatient) => void
}

const jenisKelaminData = [
  { label: 'Laki-laki', value: 'LAKI_LAKI' },
  { label: 'Perempuan', value: 'PEREMPUAN' },
]

const golonganDarahData = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'O', value: 'O' },
  { label: 'AB', value: 'AB' },
  { label: 'Belum Diketahui', value: 'BELUM_DIKETAHUI' },
]

const agamaData = [
  { label: 'Islam', value: 'ISLAM' },
  { label: 'Kristen', value: 'KRISTEN' },
  { label: 'Katolik', value: 'KATOLIK' },
  { label: 'Hindu', value: 'HINDU' },
  { label: 'Buddha', value: 'BUDDHA' },
  { label: 'Konghucu', value: 'KONGHUCU' },
  { label: 'Lainnya', value: 'LAINNYA' },
]

const statusPerkawinanData = [
  { label: 'Tidak Kawin', value: 'TIDAK_KAWIN' },
  { label: 'Kawin', value: 'KAWIN' },
  { label: 'Cerai Hidup', value: 'CERAI_HIDUP' },
  { label: 'Cerai Mati', value: 'CERAI_MATI' },
]

const FormPatient = (props: Props) => {
  const { loading, form, HandleSave } = props
  const navigate = useNavigate()

  const idNegara = form.watch('id_negara')
  const idProvinsi = form.watch('id_provinsi')

  const { country } = useGetCountry({ isGetAll: true })
  const { province } = useGetProvince({ isGetAll: true, id_negara: idNegara })
  const { regency } = useGetRegency({ isGetAll: true, id_provinsi: idProvinsi })

  return (
    <>
      <Form {...form}>
        <form
          className={'mt-5 w-full flex flex-col gap-6'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          {/* Kelompok 1: Informasi Pasien */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine
                className={'text-2xl font-semibold text-primary'}
                title={'Informasi Pasien'}
              />
            </div>

            <TextInput
              name={'no_rekam_medis'}
              form={form}
              label={'No Rekam Medis'}
              placeholder={'Masukkan No Rekam Medis'}
              htmlFor={'no_rekam_medis'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'nik'}
              form={form}
              label={'NIK'}
              type={'number'}
              placeholder={'Masukkan NIK (16 digit)'}
              htmlFor={'nik'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'nama_lengkap'}
              form={form}
              label={'Nama Lengkap'}
              placeholder={'Masukkan Nama Lengkap'}
              htmlFor={'nama_lengkap'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <SelectBasicInput
              name={'jenis_kelamin'}
              form={form}
              label={'Jenis Kelamin'}
              placeholder={'Pilih Jenis Kelamin'}
              data={jenisKelaminData}
              className={'col-span-1'}
              usePortal
              isRequired
            />
            <TextInput
              name={'tempat_lahir'}
              form={form}
              label={'Tempat Lahir'}
              placeholder={'Masukkan Tempat Lahir'}
              htmlFor={'tempat_lahir'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'tanggal_lahir'}
              form={form}
              label={'Tanggal Lahir'}
              type={'date'}
              htmlFor={'tanggal_lahir'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <SelectBasicInput
              name={'id_golongan_darah'}
              form={form}
              label={'Golongan Darah'}
              placeholder={'Pilih Golongan Darah'}
              data={golonganDarahData}
              className={'col-span-1'}
              usePortal
              isRequired
            />
            <SelectBasicInput
              name={'id_agama'}
              form={form}
              label={'Agama'}
              placeholder={'Pilih Agama'}
              data={agamaData}
              className={'col-span-1'}
              usePortal
              isRequired
            />
            <SelectBasicInput
              name={'id_status_perkawinan'}
              form={form}
              label={'Status Perkawinan'}
              placeholder={'Pilih Status Perkawinan'}
              data={statusPerkawinanData}
              className={'col-span-1'}
              usePortal
              isRequired
            />
            <TextInput
              name={'pekerjaan'}
              form={form}
              label={'Pekerjaan'}
              placeholder={'Masukkan Pekerjaan'}
              htmlFor={'pekerjaan'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
          </div>

          {/* Kelompok 2: Alamat & Kontak */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine
                className={'text-2xl font-semibold text-primary'}
                title={'Alamat & Kontak'}
              />
            </div>

            <SelectBasicInput
              name={'id_negara'}
              form={form}
              label={'Negara'}
              placeholder={'Pilih Negara'}
              data={country?.map((row) => ({ label: row.nama_negara, value: row.id_negara })) ?? []}
              className={'col-span-1'}
              usePortal
              isRequired
              fx={() => {
                form.setValue('id_provinsi', '')
                form.setValue('id_kabupaten', '')
              }}
            />
            <SelectBasicInput
              name={'id_provinsi'}
              form={form}
              label={'Provinsi'}
              placeholder={'Pilih Provinsi'}
              isDisabled={!idNegara}
              data={province?.map((row) => ({ label: row.nama_provinsi, value: row.id_provinsi })) ?? []}
              className={'col-span-1'}
              usePortal
              isRequired
              fx={() => {
                form.setValue('id_kabupaten', '')
              }}
            />
            <SelectBasicInput
              name={'id_kabupaten'}
              form={form}
              label={'Kabupaten'}
              placeholder={'Pilih Kabupaten'}
              isDisabled={!idProvinsi}
              data={regency?.map((row) => ({ label: row.nama_kabupaten, value: row.id_kabupaten })) ?? []}
              className={'col-span-1'}
              usePortal
              isRequired
            />
            <TextInput
              name={'telepon'}
              form={form}
              label={'Telepon'}
              type={'tel'}
              placeholder={'Masukkan Telepon'}
              htmlFor={'telepon'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextAreaInput
              name={'alamat_lengkap'}
              form={form}
              label={'Alamat Lengkap'}
              placeholder={'Masukkan Alamat Lengkap'}
              htmlFor={'alamat_lengkap'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'email'}
              form={form}
              label={'Email'}
              type={'email'}
              placeholder={'Masukkan Email'}
              htmlFor={'email'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
            />
          </div>

          {/* Kelompok 3: Kontak Darurat */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine
                className={'text-2xl font-semibold text-primary'}
                title={'Kontak Darurat'}
              />
            </div>

            <TextInput
              name={'nama_kontak_darurat'}
              form={form}
              label={'Nama Kontak Darurat'}
              placeholder={'Masukkan Nama Kontak Darurat'}
              htmlFor={'nama_kontak_darurat'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'telepon_kontak_darurat'}
              form={form}
              label={'Telepon Kontak Darurat'}
              type={'tel'}
              placeholder={'Masukkan Telepon Kontak Darurat'}
              htmlFor={'telepon_kontak_darurat'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
            <TextInput
              name={'email_kontak_darurat'}
              form={form}
              label={'Email Kontak Darurat'}
              type={'email'}
              placeholder={'Masukkan Email Kontak Darurat'}
              htmlFor={'email_kontak_darurat'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
            />
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

export default FormPatient

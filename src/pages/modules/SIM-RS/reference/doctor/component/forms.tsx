import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { SelectCustom } from '@/components/common/form/SelectCustom.tsx'
import type { TResolverDoctorCreate, TResolverDoctorUpdate } from '../data/resolver.tsx'
import { UseGetSpecialist } from '@/pages/modules/SIM-RS/reference/specialist/hooks/index.tsx'
import { UseGetPoli } from '@/pages/modules/SIM-RS/reference/poli/hooks/index.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

interface PropsCreate {
  loading: boolean
  form: UseFormReturn<TResolverDoctorCreate>
  HandleSave: (e: TResolverDoctorCreate) => void
}

interface PropsUpdate {
  loading: boolean
  form: UseFormReturn<TResolverDoctorUpdate>
  HandleSave: (e: TResolverDoctorUpdate) => void
}

const jenisKelaminData = [
  { label: 'Laki-laki', value: 'L' },
  { label: 'Perempuan', value: 'P' },
]

const statusData = [
  { label: 'Aktif', value: 'true' },
  { label: 'Tidak Aktif', value: 'false' },
]

export const FormDoctorCreate = (props: PropsCreate) => {
  const { loading, form, HandleSave } = props
  const { specialist } = UseGetSpecialist({ limit: '100' })
  const { poli } = UseGetPoli({ limit: '100' })

  const specialistData =
    specialist?.map((row) => ({
      label: row.nama,
      value: row.id_spesialis,
    })) ?? []

  const poliData =
    poli?.map((row) => ({
      label: row.nama,
      value: row.id_poli,
    })) ?? []

  return (
    <Form {...form}>
      <form className={'mt-5 w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Dokter'}
            placeholder={'Masukkan Nama Dokter'}
            htmlFor={'nama'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
          <SelectBasicInput
            name={'id_spesialis'}
            form={form}
            label={'Spesialis'}
            placeholder={'Pilih Spesialis'}
            data={specialistData}
            className={'col-span-1'}
            usePortal
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
          <div className={'col-span-2'}>
            <TextInput
              name={'no_sip'}
              form={form}
              label={'No SIP'}
              placeholder={'Masukkan No SIP'}
              htmlFor={'no_sip'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRequired
            />
          </div>
          <div className="col-span-2">
            <SelectCustom
              name={'id_poli'}
              form={form}
              label={'Poli'}
              placeholder={'Pilih Poli'}
              data={poliData}
              isMulti
              menuPortalTarget={true}
            />
          </div>
          <TextInput
            name={'telepon'}
            form={form}
            label={'Telepon'}
            placeholder={'Masukkan Telepon'}
            htmlFor={'telepon'}
            className={'col-span-1'}
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
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

export const FormDoctorUpdate = (props: PropsUpdate) => {
  const { loading, form, HandleSave } = props
  const { specialist } = UseGetSpecialist({ limit: '100' })
  const { poli } = UseGetPoli({ limit: '100' })

  const specialistData =
    specialist?.map((row) => ({
      label: row.nama,
      value: row.id_spesialis,
    })) ?? []

  const poliData =
    poli?.map((row) => ({
      label: row.nama,
      value: row.id_poli,
    })) ?? []

  return (
    <Form {...form}>
      <form className={'mt-5 w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine
              className={'text-2xl font-semibold text-primary'}
              title={'1. Informasi Dokter'}
            />
          </div>
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Dokter'}
            placeholder={'Masukkan Nama Dokter'}
            htmlFor={'nama'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
          <SelectBasicInput
            name={'id_spesialis'}
            form={form}
            label={'Spesialis'}
            placeholder={'Pilih Spesialis'}
            data={specialistData}
            className={'col-span-1'}
            usePortal
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
            name={'no_sip'}
            form={form}
            label={'No SIP'}
            placeholder={'Masukkan No SIP'}
            htmlFor={'no_sip'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <div className="col-span-2">
            <SelectCustom
              name={'id_poli'}
              form={form}
              label={'Poli'}
              placeholder={'Pilih Poli'}
              data={poliData}
              isMulti
              menuPortalTarget={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine className={'text-2xl font-semibold text-primary'} title={'2. Kontak'} />
          </div>
          <TextInput
            name={'telepon'}
            form={form}
            label={'Telepon'}
            placeholder={'Masukkan Telepon'}
            htmlFor={'telepon'}
            className={'col-span-1'}
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
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine
              className={'text-2xl font-semibold text-primary'}
              title={'3. Informasi Sistem'}
            />
          </div>
          <SelectBasicInput
            name={'is_status'}
            form={form}
            label={'Status'}
            placeholder={'Pilih Status'}
            data={statusData}
            className={'col-span-1'}
            usePortal
            isRequired
          />
          <TextInput
            name={'tanggal'}
            form={form}
            label={'Tanggal Registrasi'}
            type={'datetime-local'}
            htmlFor={'tanggal'}
            className={'col-span-1'}
            inputClassName={'bg-gray-100'}
            isRequired
            isDisabled
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import type { TResolverRoomCreate, TResolverRoomUpdate } from '../data/resolver.tsx'
import { UseGetRoomType } from '@/pages/modules/SIM-RS/reference/room-type/hooks/index.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

interface PropsCreate {
  loading: boolean
  form: UseFormReturn<TResolverRoomCreate>
  HandleSave: (e: TResolverRoomCreate) => void
}

interface PropsUpdate {
  loading: boolean
  form: UseFormReturn<TResolverRoomUpdate>
  HandleSave: (e: TResolverRoomUpdate) => void
}

const statusData = [
  { label: 'Aktif', value: 'true' },
  { label: 'Tidak Aktif', value: 'false' },
]

export const FormRoomCreate = (props: PropsCreate) => {
  const { loading, form, HandleSave } = props
  const { roomType, loading: loadingRoomType } = UseGetRoomType({ limit: '100' })

  const jenisRuanganData =
    roomType?.map((row) => ({
      label: row.nama,
      value: row.id_jenis_ruangan,
    })) ?? []

  return (
    <Form {...form}>
      <form className={'mt-5 w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine
              className={'text-2xl font-semibold text-primary'}
              title={'Informasi Ruangan'}
            />
          </div>
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Ruangan'}
            placeholder={'Masukkan Nama Ruangan'}
            htmlFor={'nama'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <TextInput
            name={'nomor'}
            form={form}
            label={'Nomor Ruangan'}
            placeholder={'Masukkan Nomor Ruangan'}
            htmlFor={'nomor'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <SelectBasicInput
            name={'id_jenis_ruangan'}
            form={form}
            label={'Jenis Ruangan'}
            placeholder={'Pilih Jenis Ruangan'}
            data={jenisRuanganData}
            isLoading={loadingRoomType}
            className={'col-span-1'}
            usePortal
            isRequired
          />
          <TextInput
            name={'jumlah_kasur'}
            form={form}
            label={'Jumlah Kasur'}
            type={'number'}
            placeholder={'Masukkan Jumlah Kasur'}
            htmlFor={'jumlah_kasur'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
            isNumber
          />
          <TextInput
            name={'lokasi'}
            form={form}
            label={'Lokasi'}
            placeholder={'Masukkan Lokasi'}
            htmlFor={'lokasi'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

export const FormRoomUpdate = (props: PropsUpdate) => {
  const { loading, form, HandleSave } = props
  const { roomType, loading: loadingRoomType } = UseGetRoomType({ limit: '100' })

  const jenisRuanganData =
    roomType?.map((row) => ({
      label: row.nama,
      value: row.id_jenis_ruangan,
    })) ?? []

  return (
    <Form {...form}>
      <form className={'mt-5 w-full flex flex-col gap-6'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine
              className={'text-2xl font-semibold text-primary'}
              title={'1. Informasi Ruangan'}
            />
          </div>
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Ruangan'}
            placeholder={'Masukkan Nama Ruangan'}
            htmlFor={'nama'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <TextInput
            name={'nomor'}
            form={form}
            label={'Nomor Ruangan'}
            placeholder={'Masukkan Nomor Ruangan'}
            htmlFor={'nomor'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <SelectBasicInput
            name={'id_jenis_ruangan'}
            form={form}
            label={'Jenis Ruangan'}
            placeholder={'Pilih Jenis Ruangan'}
            data={jenisRuanganData}
            isLoading={loadingRoomType}
            className={'col-span-1'}
            usePortal
            isRequired
          />
          <TextInput
            name={'jumlah_kasur'}
            form={form}
            label={'Jumlah Kasur'}
            type={'number'}
            placeholder={'Masukkan Jumlah Kasur'}
            htmlFor={'jumlah_kasur'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <TextInput
            name={'lokasi'}
            form={form}
            label={'Lokasi'}
            placeholder={'Masukkan Lokasi'}
            htmlFor={'lokasi'}
            className={'col-span-2'}
            inputClassName={'bg-white'}
            isRequired
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine
              className={'text-2xl font-semibold text-primary'}
              title={'2. Informasi Sistem'}
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
            label={'Tanggal & Waktu'}
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

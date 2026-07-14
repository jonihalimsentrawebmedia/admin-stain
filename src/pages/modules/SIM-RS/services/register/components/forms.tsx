import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetPoli } from '@/pages/modules/SIM-RS/reference/poli/hooks/index.tsx'
import { UseGetDoctor } from '@/pages/modules/SIM-RS/reference/doctor/hooks/index.tsx'
import { DialogSelectPatient } from './DialogSelectPatient.tsx'
import type { TResolverRegistration } from '../data/resolver.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<TResolverRegistration>
  HandleSave: (e: TResolverRegistration) => void
  isEdit?: boolean
}

export const FormRegistration = ({ loading, form, HandleSave, isEdit }: Props) => {
  const { poli } = UseGetPoli({ limit: '100' })
  const idPoli = form.watch('id_poli')

  const { doctor } = UseGetDoctor({
    limit: '100',
    id_poli: idPoli,
  })

  const poliData =
    poli?.map((row) => ({
      label: row.nama,
      value: row.id_poli,
    })) ?? []

  const doctorData =
    doctor?.map((row) => ({
      label: row.nama,
      value: row.id_dokter,
    })) ?? []

  return (
    <Form {...form}>
      <form className="mt-5 w-full flex flex-col gap-6" onSubmit={form.handleSubmit(HandleSave)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine className="text-2xl font-semibold text-primary" title="1. Informasi Pendaftaran" />
          </div>
          <TextInput
            name={'no_pendaftaran'}
            form={form}
            label={'No. Pendaftaran'}
            placeholder={'No. Pendaftaran (otomatis)'}
            htmlFor={'no_pendaftaran'}
            className={'col-span-1'}
            inputClassName={'bg-gray-100'}
            isDisabled
          />
          <TextInput
            name={'tanggal_pendaftaran'}
            form={form}
            label={'Tanggal Pendaftaran'}
            type={'date'}
            htmlFor={'tanggal_pendaftaran'}
            className={'col-span-1'}
            inputClassName={'bg-white'}
            isRequired
          />
          <div className="col-span-2">
            <SelectBasicInput
              name={'status'}
              form={form}
              label={'Status'}
              placeholder={'Pilih Status'}
              data={[
                { label: 'Menunggu', value: 'MENUNGGU' },
                { label: 'Dipanggil', value: 'DIPANGGIL' },
                { label: 'Selesai', value: 'SELESAI' },
                { label: 'Dibatalkan', value: 'DIBATALKAN' },
              ]}
              className={'col-span-1'}
              usePortal
              isDisabled={!isEdit}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine className="text-2xl font-semibold text-primary" title="2. Informasi Pasien" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium mb-1 block">Pasien *</label>
            <DialogSelectPatient form={form} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <TitleLine className="text-2xl font-semibold text-primary" title="3. Tujuan Pelayanan" />
          </div>
          <SelectBasicInput
            name={'id_poli'}
            form={form}
            label={'Poli'}
            placeholder={'Pilih Poli'}
            data={poliData}
            className={'col-span-1'}
            usePortal
            isRequired
            fx={() => form.setValue('id_dokter', '')}
          />
          <SelectBasicInput
            name={'id_dokter'}
            form={form}
            label={'Dokter'}
            placeholder={'Pilih Dokter'}
            data={doctorData}
            className={'col-span-1'}
            usePortal
            isRequired
            isDisabled={!idPoli}
          />
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

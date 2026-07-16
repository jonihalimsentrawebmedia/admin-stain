import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SelectCustom } from '@/components/common/form/SelectCustom.tsx'
import type { TResolverEditPemeriksaan } from '../data/resolver.tsx'
import { format } from 'date-fns'
import { UseGetDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/hooks/index.tsx'
import { UseGetProcedure } from '@/pages/modules/SIM-RS/reference/procedure/hooks/index.tsx'
import { BiX } from 'react-icons/bi'
import type { IRegistration } from '@/pages/modules/SIM-RS/services/register/data/types.ts'

interface Props {
  loading: boolean
  form: UseFormReturn<TResolverEditPemeriksaan>
  HandleSave: (e: TResolverEditPemeriksaan) => void
  registration: IRegistration
}

export const FormEditPemeriksaan = ({ loading, form, HandleSave, registration }: Props) => {
  const { diagnosis } = UseGetDiagnosis({ limit: '100' })
  const { procedure } = UseGetProcedure({ limit: '100' })

  const jkLabel = registration.jenis_kelamin_pasien === 'L' ? 'Laki-laki' : 'Perempuan'

  const idDiagnosis = form.watch('id_diagnosis') ?? []
  const idProcedure = form.watch('id_procedure') ?? []

  const diagnosisData =
    diagnosis?.map((row) => ({
      label: `${row.kode} - ${row.nama}`,
      value: row.id_diagnosis,
    })) ?? []

  const procedureData =
    procedure?.map((row) => ({
      label: `${row.kode} - ${row.nama}`,
      value: row.id_procedure,
    })) ?? []

  const selectedDiagnoses = diagnosisData.filter((d) => idDiagnosis.includes(d.value))
  const selectedProcedures = procedureData.filter((p) => idProcedure.includes(p.value))

  const removeDiagnosis = (value: string) => {
    form.setValue(
      'id_diagnosis',
      idDiagnosis.filter((v) => v !== value)
    )
  }

  const removeProcedure = (value: string) => {
    form.setValue(
      'id_procedure',
      idProcedure.filter((v) => v !== value)
    )
  }

  return (
    <Form {...form}>
      <form className="mt-5 w-full flex flex-col gap-6" onSubmit={form.handleSubmit(HandleSave)}>
        <div className="bg-white rounded-lg border p-6">
          <TitleLine
            className="text-2xl font-semibold text-primary"
            title="1. Informasi Registrasi"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500">No. Pendaftaran</p>
              <p className="text-base font-medium">{registration.no_pendaftaran}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No. Rekam Medis</p>
              <p className="text-base font-medium">{registration.no_rekam_medis_pasien}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Registrasi</p>
              <p className="text-base font-medium">
                {format(new Date(registration.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Pasien</p>
              <p className="text-base font-medium">{registration.nama_pasien}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="text-base font-medium">{jkLabel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Poli</p>
              <p className="text-base font-medium">{registration.nama_poli}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dokter</p>
              <p className="text-base font-medium">{registration.nama_dokter}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <TitleLine className="text-2xl font-semibold text-primary" title="2. Hasil Pemeriksaan" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <TextAreaInput
              name={'keluhan_utama'}
              form={form}
              label={'Keluhan Utama'}
              placeholder={'Masukkan keluhan utama'}
              className={'col-span-2'}
              isRequired
            />
            <div className="col-span-1 flex flex-col gap-2">
              <SelectCustom
                name={'id_diagnosis'}
                form={form}
                label={'Diagnosa'}
                placeholder={'Pilih Diagnosa'}
                data={diagnosisData}
                isMulti
                menuPortalTarget
              />
              {selectedDiagnoses.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {selectedDiagnoses.map((item) => (
                    <li
                      key={item.value}
                      className="flex items-center justify-between bg-gray-100 rounded px-3 py-1.5 text-sm"
                    >
                      <span>{item.label}</span>
                      <button
                        type="button"
                        onClick={() => removeDiagnosis(item.value)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <BiX className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <SelectCustom
                name={'id_procedure'}
                form={form}
                label={'Rencana Tindakan'}
                placeholder={'Pilih Rencana Tindakan'}
                data={procedureData}
                isMulti
                menuPortalTarget
              />
              {selectedProcedures.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {selectedProcedures.map((item) => (
                    <li
                      key={item.value}
                      className="flex items-center justify-between bg-gray-100 rounded px-3 py-1.5 text-sm"
                    >
                      <span>{item.label}</span>
                      <button
                        type="button"
                        onClick={() => removeProcedure(item.value)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <BiX className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <TextAreaInput
              name={'catatan'}
              form={form}
              label={'Catatan'}
              placeholder={'Masukkan catatan (opsional)'}
              className={'col-span-2'}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <TitleLine
            className="text-2xl font-semibold text-primary"
            title="3. Keputusan Perawatan"
          />
          <div className="mt-4">
            <InputRadio
              form={form}
              name="keputusan"
              label="Keputusan Perawatan"
              isRequired
              data={[
                { value: 'RAWAT_JALAN', label: 'Rawat Jalan' },
                { value: 'RAWAT_INAP', label: 'Rawat Inap' },
              ]}
            />
          </div>
        </div>

        <ButtonForm loading={loading} onCancel={() => window.history.back()} />
      </form>
    </Form>
  )
}

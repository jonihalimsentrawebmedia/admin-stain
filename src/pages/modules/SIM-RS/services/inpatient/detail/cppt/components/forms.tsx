import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { SelectCustom } from '@/components/common/form/SelectCustom.tsx'
import { BiX } from 'react-icons/bi'
import { UseGetDoctor } from '@/pages/modules/SIM-RS/reference/doctor/hooks/index.tsx'
import { UseGetDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/hooks/index.tsx'
import { UseGetProcedure } from '@/pages/modules/SIM-RS/reference/procedure/hooks/index.tsx'
import { MedicineSelectCPPT } from './MedicineSelect.tsx'
import type { TResolverCreateCPPT } from '../data/resolver.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<TResolverCreateCPPT>
  HandleSave: (e: TResolverCreateCPPT) => void
  onCancel: () => void
  buttonLabel?: string
}

export const FormCPPT = ({ loading, form, HandleSave, onCancel, buttonLabel }: Props) => {
  const { doctor } = UseGetDoctor({ limit: '0' })
  const { diagnosis } = UseGetDiagnosis({ limit: '100' })
  const { procedure } = UseGetProcedure({ limit: '100' })

  const idDiagnosis = form.watch('id_diagnosis') ?? []
  const idProcedure = form.watch('id_procedure') ?? []

  const doctorData =
    doctor?.map((d) => ({
      label: `${d.nama} - ${d.nama_spesialis ?? '-'}`,
      value: d.id_dokter,
    })) ?? []

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
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(HandleSave)}>
        <div className="bg-white rounded-lg border p-6">
          <TitleLine className="text-lg font-semibold text-primary" title="1. Informasi Catatan" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <SelectBasicInput
              name="id_dokter"
              form={form}
              label="Dokter"
              placeholder="Pilih Dokter"
              data={doctorData}
              usePortal
              isRequired
            />
            <TextInput
              name="tanggal_catat"
              form={form}
              label="Tanggal Catat"
              type="datetime-local"
              isRequired
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <TitleLine className="text-lg font-semibold text-primary" title="2. Keluhan & Catatan" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <TextAreaInput
              name="keluhan"
              form={form}
              label="Keluhan"
              placeholder="Masukkan keluhan pasien"
              className="col-span-2"
              isRequired
            />
            <TextAreaInput
              name="catatan"
              form={form}
              label="Catatan (Opsional)"
              placeholder="Masukkan catatan"
              className="col-span-2"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <TitleLine className="text-lg font-semibold text-primary" title="3. Diagnosa & Tindakan" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <div className="flex flex-col gap-2">
              <SelectCustom
                name="id_diagnosis"
                form={form}
                label="Diagnosa"
                placeholder="Pilih Diagnosa"
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
            <div className="flex flex-col gap-2">
              <SelectCustom
                name="id_procedure"
                form={form}
                label="Rencana Tindakan"
                placeholder="Pilih Rencana Tindakan"
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
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <TitleLine className="text-lg font-semibold text-primary" title="4. Resep Obat" />
          <div className="mt-3">
            <MedicineSelectCPPT form={form} />
          </div>
        </div>

        <ButtonForm loading={loading} onCancel={onCancel} label={buttonLabel} />
      </form>
    </Form>
  )
}

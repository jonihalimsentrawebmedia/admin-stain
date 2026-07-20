import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { UseGetPatientResourceTreatmentPrice } from '@/pages/modules/SIM-RS/reference/patient/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { FaTrash } from 'react-icons/fa'
import { useEffect, useRef } from 'react'

interface Props {
  form: UseFormReturn<any>
  name?: string
  isDisabled?: boolean
}

export const SumberBiayaRegistrasi = ({ form, name = 'sumber_biaya', isDisabled }: Props) => {
  const idPasien = form.watch('id_pasien')
  const { PriceTreatment } = UseGetPatientResourceTreatmentPrice(idPasien ?? '')

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name,
  })

  const prevIdPasien = useRef<string | undefined>(idPasien)

  useEffect(() => {
    if (prevIdPasien.current !== undefined && prevIdPasien.current !== idPasien) {
      replace([])
    }
    prevIdPasien.current = idPasien
  }, [idPasien])

  const sumberBiayaData =
    PriceTreatment?.map((row) => ({
      label: row.nama,
      value: row.id_pasien_sumber_pembiayaan,
    })) ?? []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Sumber Biaya Pengobatan</label>
        <button
          type="button"
          onClick={() => append({ id_pasien_sumber_pembiayaan: '', persentase: 0 })}
          disabled={isDisabled}
          className="px-3 py-1.5 text-sm rounded border border-primary text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
        >
          + Tambah
        </button>
      </div>
      {fields.length === 0 && (
        <p className="text-sm text-gray-400">Belum ada sumber biaya ditambahkan</p>
      )}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start p-4 border rounded-lg bg-gray-50"
        >
          <SelectBasicInput
            name={`${name}.${index}.id_pasien_sumber_pembiayaan`}
            form={form}
            label="Sumber Biaya Pengobatan"
            placeholder="Pilih Sumber Biaya"
            data={sumberBiayaData}
            usePortal
            isRequired
            isDisabled={isDisabled}
          />
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <TextInput
                inputClassName={'bg-white'}
                name={`${name}.${index}.persentase`}
                form={form}
                label="Persentase (%)"
                placeholder="Masukkan persentase"
                htmlFor={`${name}.${index}.persentase`}
                type="number"
                max={100}
                isRequired
                isNumber
                isDisabled={isDisabled}
              />
            </div>
            {fields.length > 1 && !isDisabled && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                title="Hapus"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

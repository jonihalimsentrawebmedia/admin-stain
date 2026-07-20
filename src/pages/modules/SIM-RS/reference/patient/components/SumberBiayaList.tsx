import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { UseGetSumberBiaya } from '@/pages/modules/SIM-RS/reference/source-medical-treatment/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  form: UseFormReturn<any>
  name?: string
  showPersentase?: boolean
}

export const SumberBiayaList = ({ form, name = 'sumber_biaya', showPersentase = true }: Props) => {
  const { sumberBiaya } = UseGetSumberBiaya({ limit: '100' })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  })

  const sumberBiayaData =
    sumberBiaya?.map((row) => ({
      label: row.nama,
      value: row.id_sumber_biaya,
    })) ?? []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Sumber Biaya Pengobatan</label>
        {showPersentase ? (
          <button
            type="button"
            onClick={() => append({ id_sumber_biaya: '', persentase: 0 })}
            className="px-3 py-1.5 text-sm rounded border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            + Tambah
          </button>
        ) : (
          <button
            type="button"
            onClick={() => append({ id_sumber_biaya: '', no_peserta: '' })}
            className="px-3 py-1.5 text-sm rounded border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            + Tambah
          </button>
        )}
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
            name={`${name}.${index}.id_sumber_biaya`}
            form={form}
            label="Sumber Biaya Pengobatan"
            placeholder="Pilih Sumber Biaya"
            data={sumberBiayaData}
            usePortal
            isRequired
          />
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              {showPersentase ? (
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
                />
              ) : (
                <TextInput
                  inputClassName={'bg-white'}
                  name={`${name}.${index}.no_peserta`}
                  form={form}
                  label="No. Peserta"
                  placeholder="Masukkan No. Peserta"
                  htmlFor={`${name}.${index}.no_peserta`}
                />
              )}
            </div>
            {fields.length > 1 && (
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

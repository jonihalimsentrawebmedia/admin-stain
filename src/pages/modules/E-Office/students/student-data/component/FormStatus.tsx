import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { ResolverFormStatus, type TResolverFormStatus } from '../data/resolver.tsx'
import { UseGetStudentStatus } from '@/pages/modules/E-Office/students/student-status/hooks'

interface Props {
  list_id?: string[]
  loading: boolean
  HandleSave: (value: any) => void
  HandleCancel: () => void
}

export const FormStatus = (props: Props) => {
  const { list_id, loading, HandleSave, HandleCancel } = props
  const { studentStatus } = UseGetStudentStatus({ page: '0', limit: '0' })

  const form = useForm<TResolverFormStatus>({
    resolver: zodResolver(ResolverFormStatus),
  })

  const selectedStatus = form.watch('id_mahasiswa_status')
  const selectedStatusData = studentStatus?.find((s) => s.id_mahasiswa_status === selectedStatus)
  const isLulus =
    selectedStatusData?.kode?.toUpperCase() === 'LULUS' ||
    selectedStatusData?.nama?.toUpperCase().includes('LULUS')

  const onSubmit = (value: TResolverFormStatus) => {
    HandleSave({
      ...value,
      list_mahasiswa: list_id ?? [],
      periode_lulus: value?.periode_lulus ? Number(value?.periode_lulus) : null,
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <SelectBasicInput
          name={'id_mahasiswa_status'}
          form={form}
          label={'Status Mahasiswa'}
          placeholder={'Pilih Status Mahasiswa'}
          data={
            studentStatus?.map((row) => ({
              label: row.nama,
              value: row.id_mahasiswa_status,
            })) ?? []
          }
          isRequired
          usePortal
        />

        {isLulus && (
          <>
            <TextInput
              name={'tahun_lulus'}
              form={form}
              label={'Tahun Lulus'}
              placeholder={'Masukkan Tahun Lulus'}
              htmlFor={'tahun_lulus'}
              isRequired
            />
            <TextInput
              name={'tanggal_lulus'}
              form={form}
              label={'Tanggal Lulus'}
              type={'date'}
              htmlFor={'tanggal_lulus'}
              isRequired
            />
            <InputRadio
              name={'periode_lulus'}
              form={form}
              label={'Periode Lulus'}
              data={[
                { label: 'Ganjil', value: '1' },
                { label: 'Genap', value: '2' },
              ]}
              isRequired
            />
          </>
        )}

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            onClick={HandleCancel}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </Form>
  )
}

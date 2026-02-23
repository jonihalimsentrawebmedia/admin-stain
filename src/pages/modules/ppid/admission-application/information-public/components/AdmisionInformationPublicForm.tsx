import { InputRadio } from '@/components/common/form/InputRadio'
import TextAreaInput from '@/components/common/form/textAreaInput'
import TextInput from '@/components/common/form/TextInput'
import type { UseFormReturn } from 'react-hook-form'
import { FileInput } from './FileInput'
import { Separator } from '@/components/ui/separator'

interface Props {
  form: UseFormReturn<any>
}

const AdmisionInformationPublicForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden">
      <InputRadio
        data={[
          {
            label: 'Keseluruhan',
            value: 'KESELURUHAN',
          },
          {
            label: 'Sebagian',
            value: 'SEBAGIAN',
          },
          {
            label: 'Ditolak',
            value: 'DITOLAK',
          },
        ]}
        form={form}
        name="status_permohonan"
        label="Status Permohonan Yang Diberikan"
        isRow
      />
      {form.watch('status_permohonan') == 'DITOLAK' && (
        <InputRadio
          data={[
            {
              label: 'Tidak Dikuasai',
              value: 'TIDAK_DIKUASAI',
            },
            {
              label: 'Persyaratan Tidak Lengkap',
              value: 'PERSYARATAN_TIDAK_LENGKAP',
            },
            {
              label: 'Tidak Ada Konfirmasi Lebih Lanjut',
              value: 'TIDAK_ADA_KONFIRMASI_LEBIH_LANJUT',
            },
          ]}
          form={form}
          name="alasan_penolakan"
          label="Alasan Penolakan"
          isRow
        />
      )}

      <div className="flex text-primary gap-2 relative items-center">
        <p className="bg-white whitespace-nowrap">Tulis Pesan Email</p>
        <Separator className='w-full'/>
      </div>
      <TextInput
        form={form}
        name="subjek"
        placeholder="Balasan untuk permohonan informasi publik"
        label="Subjek"
        isRow
      />
      <TextAreaInput
        form={form}
        name="pesan"
        placeholder="berikut dilampirkan file sesuai dengan yang anda minta sebelumnya"
        label="Pesan"
        isRow
      />
      <FileInput keyname="file_lampiran" form={form} name="file_lampiran" isRow label="Lampiran" />
    </div>
  )
}

export default AdmisionInformationPublicForm

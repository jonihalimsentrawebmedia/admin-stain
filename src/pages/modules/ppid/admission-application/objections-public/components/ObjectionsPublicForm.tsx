import TextAreaInput from '@/components/common/form/textAreaInput'
import TextInput from '@/components/common/form/TextInput'
import { Separator } from '@/components/ui/separator'
import type { UseFormReturn } from 'react-hook-form'
import { FileInput } from '../../information-public/components/FileInput'
import type { ObjectionPublicType } from '../model/resolver'

interface Props {
  form: UseFormReturn<ObjectionPublicType>
}
const ObjectionsPublicForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden">
      <TextInput
        form={form}
        name="no_registrasi"
        placeholder="No. Registrasi"
        label="No. Registrasi*"
        isRow
      />
      <TextInput
        form={form}
        name="tanggal_tanggapan"
        placeholder="dd-mm-yyyy"
        label="Hari / Tanggal tanggapan atas keberatan akan diberikan*"
        isRow
        type='date'

      />

      <div className="flex text-primary gap-2 relative items-center">
        <p className="bg-white whitespace-nowrap">Tulis Pesan Email</p>
        <Separator className="w-full" />
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

export default ObjectionsPublicForm

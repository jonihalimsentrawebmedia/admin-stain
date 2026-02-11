import { InputText } from '@/components/common/form/InputText'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<any>
}
const TemplateAimForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <InputText form={form} name="nama_dokumen" isRow label="Judul*" placeholder="Judul" />
      <InputText form={form} name="urutan" isRow label="Urutan*" placeholder="Urutan" />
    </div>
  )
}

export default TemplateAimForm

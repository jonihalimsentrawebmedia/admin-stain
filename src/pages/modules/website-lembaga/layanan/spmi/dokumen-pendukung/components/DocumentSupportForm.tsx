import { InputText } from '@/components/common/form/InputText'
import type { UseFormReturn } from 'react-hook-form'
import type { DocumentSupportInstutationType } from '../model/resolver'

interface Props {
  form: UseFormReturn<DocumentSupportInstutationType>
}
const DocumentSupportForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <InputText form={form} name="judul" isRow label="Judul*" placeholder="Judul" />
      <InputText form={form} name="urutan" isRow label="Urutan*" placeholder="Urutan" />
    </div>
  )
}

export default DocumentSupportForm

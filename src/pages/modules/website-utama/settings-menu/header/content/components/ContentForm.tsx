import type { UseFormReturn } from 'react-hook-form'
import type { IContentTypeForm } from '../model/resolver'

import TextInput from '@/components/common/form/TextInput'
import { RichText } from '@/components/common/richtext'


interface Props {
  form: UseFormReturn<IContentTypeForm>
}
const ContentForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <TextInput
        form={form}
        name="urutan"
        placeholder="Urutan"
        label="Urutan*"
        isRow
        type="number"
        isNumber
      />
      <TextInput form={form} name="judul" placeholder="Judul" label="Judul*" isRow />
      <RichText form={form} name="isi" label="Isi *"   />
    </div>
  )
}

export default ContentForm

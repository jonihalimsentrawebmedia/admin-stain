import type { UseFormReturn } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput'
import { RichText } from '@/components/common/richtext'
import type { VisiMisiUnitType } from '../model/resolver'

interface Props {
  form: UseFormReturn<VisiMisiUnitType>
}

const VisiMisiUnitForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <TextInput form={form} name="nama" isRow label="Nama* " placeholder="Nama " />
      <TextInput form={form} name="urutan" isRow label="Urutan* " placeholder="Urutan " />
      <RichText form={form} isRow name="isi" label="Isi" />
    </div>
  )
}

export default VisiMisiUnitForm

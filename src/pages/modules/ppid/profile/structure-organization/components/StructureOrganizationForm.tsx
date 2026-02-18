import type { UseFormReturn } from 'react-hook-form'
import type { StructureOrganizationType } from '../model/resolver'
import { RichText } from '@/components/common/richtext'
import ImageUpload from './ImageUpload'
import TextInput from '@/components/common/form/TextInput'
import TextAreaInput from '@/components/common/form/textAreaInput'

interface Props {
  form: UseFormReturn<StructureOrganizationType>
}

const StructureOrganizationForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-primary text-xl font-medium">Profil</div>
        <RichText label='' isRow={false} form={form} name="isi_profil" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-primary text-xl font-medium">Atasan Pejabat Pengelola Informasi & Dokumentasi</div>
        <div className="flex flex-col lg:flex-row gap-4">
          <ImageUpload form={form} name="atasan.url_gambar" />
          <div className="flex flex-col gap-2">
            <TextInput inputClassName='w-full' form={form} name="atasan.nama" label="Nama" isRow={false} />
            <TextAreaInput inputClassName='w-full' form={form} name="atasan.deskripsi" label="Deskripsi" isRow={false} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-primary text-xl font-medium">Pejabat Pengelola Informasi & Dokumentasi Utama</div>
        <div className="flex flex-col lg:flex-row gap-4">
          <ImageUpload form={form} name="pejabat.url_gambar" />
          <div className="flex flex-col gap-2">
            <TextInput inputClassName='w-full' form={form} name="pejabat.nama" label="Nama" isRow={false} />
            <TextAreaInput inputClassName='w-full' form={form} name="pejabat.deskripsi" label="Deskripsi" isRow={false} />
          </div>
        </div>
      </div>
        <div className="flex flex-col gap-2">
        <div className="text-primary text-xl font-medium">Struktur</div>
        <RichText label='' isRow={false} form={form} name="isi_struktur" />
      </div>
    </div>
  )
}

export default StructureOrganizationForm

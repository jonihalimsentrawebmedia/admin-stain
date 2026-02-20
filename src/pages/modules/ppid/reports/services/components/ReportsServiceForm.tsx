import { InputRadio } from '@/components/common/form/InputRadio'
import { InputText } from '@/components/common/form/InputText'
import type { UseFormReturn } from 'react-hook-form'
import ImageUpload from './ImageUpload'
import { UploadFileInput } from '@/components/common/form/uploadFileInput'

interface Props {
  form: UseFormReturn<any>
}
const ReportsServiceForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <ImageUpload form={form} name="url_gambar" label="Gambar" />
       <InputText
             form={form}
             name="nama_laporan"
             isRow
             label="Nama Laporan*"
             placeholder="Nama Laporan"
           />
           <InputRadio
             data={[
               {
                 label: 'URL',
                 value: 'URL',
               },
               {
                 label: 'DOKUMEN',
                 value: 'DOKUMEN',
               },
             ]}
             label="Jenis*"
             isRow
             name="jenis"
             form={form}
           />
           {form.watch('jenis') == 'URL' ? (
             <InputText
               isDisabled={!form.watch('jenis')}
               form={form}
               name="url"
               isRow
               label="URL*"
               placeholder="URL"
               type="url"
             />
           ) : (
             <UploadFileInput
               form={form}
               name="url_file"
               isRow
               label="Upload File*"
               keyname="url_dokumen"
             />
           )}
     
           <InputRadio
             data={[
               {
                 label: 'Public',
                 value: true,
               },
               {
                 label: 'Tidak Public',
                 value: false,
               },
             ]}
             label="Public / Tidak*"
             isRow
             name="public"
             form={form}
           />
           <InputText form={form} name="urutan" isRow label="Urutan*" placeholder="Urutan" />
    </div>
  )
}

export default ReportsServiceForm

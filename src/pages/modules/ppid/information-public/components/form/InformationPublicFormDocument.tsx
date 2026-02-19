import { InputRadio } from '@/components/common/form/InputRadio'
import { InputText } from '@/components/common/form/InputText'
import { UploadFileInput } from '@/components/common/form/uploadFileInput'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<any>
  showTitle?: boolean
}
const InformationPublicFormDocument = ({ form, showTitle = true }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {showTitle && (
        <InputText form={form} name="judul" isDisabled isRow label="Judul*" placeholder="Judul" />
      )}
      <InputText
        form={form}
        name="nama_dokumen"
        isRow
        label="Nama Dokumen*"
        placeholder="Nama Dokumen"
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

export default InformationPublicFormDocument

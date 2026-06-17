import type { UseFormReturn } from 'react-hook-form'
import type { TResolverTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface props {
  form: UseFormReturn<TResolverTypeLetter>
  loading: boolean
  HandleSave: (value: TResolverTypeLetter) => void
  open: boolean
  setOpen: (value: boolean) => void
}

const FormLetterTpeCode = (props: props) => {
  const { form, loading, HandleSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_jenis_surat'}
            label={'Nama Jenis Surat'}
            placeholder={'Nama Jenis Surat'}
            htmlFor={'nama_jenis_surat'}
            isRequired
          />
          <SelectBasicInput
            form={form}
            label={'Kategori Jenis Surat'}
            placeholder={'Kategori Jenis Surat'}
            name={'kategori_jenis_surat'}
            data={['DOSEN', 'PEGAWAI', 'MAHASISWA', 'UMUM', 'LAINNYA']?.map((row) => ({
              label: row?.toUpperCase(),
              value: row,
            }))}
            usePortal
            isRequired
          />
          <TextInput
            form={form}
            name={'kode_surat'}
            label={'Kode Surat'}
            placeholder={'Kode Surat'}
            htmlFor={'kode_nomor_surat'}
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default FormLetterTpeCode

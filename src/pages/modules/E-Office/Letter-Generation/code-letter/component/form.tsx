import { type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import type { TResolverCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UseGetUnitActive } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'

interface props {
  form: UseFormReturn<TResolverCodeLetter>
  loading: boolean
  HandleSave: (value: TResolverCodeLetter) => void
}

const FormCodeLetterGenerated = (props: props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  const { institution } = UseGetUnitActive()
  return (
    <>
      <Form {...form}>
        <form
          className={'mt-8 w-full flex flex-col gap-4'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <CheckboxInputBasic name={'is_otomatis'} form={form} label={'Isi Urutan otomatis'} />
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              className={'col-span-2'}
              form={form}
              name={'nama_kode_nomor_surat'}
              label={'Nama Kode Nomor Surat'}
              placeholder={'Masukan Nama Kode Nomor Surat'}
              htmlFor={'nama_kode_nomor_surat'}
              isRow
              isRequired
            />
            <SelectBasicInput
              form={form}
              className={'col-span-2'}
              name={'id_satuan_organisasi'}
              label={'Satuan Kerja'}
              placeholder={'Pilih Satuan Kerja / Tidak Dipilih / NULL'}
              data={
                institution?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
              showNull
              isRow
              isRequired
            />

            <TextInput
              form={form}
              name={'kode_depan'}
              label={'Kode Depan'}
              htmlFor={'kode_depan'}
              placeholder={'Masukan Kode Depan'}
              isRequired
            />
            <TextInput
              form={form}
              name={'urutan_kode_depan'}
              label={'Urutan Kode Depan'}
              htmlFor={'urutankode_depan'}
              placeholder={'Urutan Kode Depan'}
              type={'number'}
              isNumber
              isRequired
            />
            <InputRadio
              className={'flex flex-col gap-3'}
              form={form}
              label={'Pengisian No. Surat'}
              name={'nomor_surat'}
              isRequired
              data={['OTOMATIS', 'MANUAL']?.map((row) => ({
                label: row?.toLowerCase(),
                value: row,
              }))}
            />
            <TextInput
              form={form}
              name={'urutan_nomor_surat'}
              label={'Posisi Urutan No. Surat'}
              htmlFor={'urutan_nomor_surat'}
              placeholder={'Posisi Urutan No. Surat'}
              type={'number'}
              isNumber
              isRequired
            />
            <TextInput
              form={form}
              name={'kode_belakang'}
              label={'Kode Belakang'}
              htmlFor={'kode_belakang'}
              placeholder={'Masukan Kode Belakang'}
              isRequired
            />
            <TextInput
              form={form}
              name={'urutan_kode_belakang'}
              label={'Urutan Kode Belakang'}
              htmlFor={'urutan_kode_belakang'}
              placeholder={'Urutan Kode Belakang'}
              type={'number'}
              isNumber
              isRequired
            />
            <InputRadio
              form={form}
              name={'is_bulan'}
              label={'Apakah Perlu Bulan ?'}
              isRequired
              data={[
                { value: true, label: 'Ya' },
                { value: false, label: 'Tidak' },
              ]}
            />
            <TextInput
              form={form}
              name={'urutan_bulan'}
              label={'Urutan Bulan'}
              htmlFor={'urutan_bulan'}
              placeholder={'Urutan Bulan'}
              type={'number'}
              isNumber
              isRequired
            />
            <InputRadio
              form={form}
              className={'col-span-2'}
              name={'is_bulan_romawi'}
              label={'Apakah Bulan Romawi ?'}
              isRequired
              data={[
                { value: true, label: 'Ya' },
                { value: false, label: 'Tidak' },
              ]}
            />
            <InputRadio
              form={form}
              name={'is_tahun'}
              label={'Apakah Perlu Tahun ?'}
              isRequired
              data={[
                { value: true, label: 'Ya' },
                { value: false, label: 'Tidak' },
              ]}
            />
            <TextInput
              form={form}
              name={'urutan_tahun'}
              label={'Urutan Tahun'}
              htmlFor={'urutan_tahun'}
              placeholder={'Urutan Tahun'}
              type={'number'}
              isNumber
              isRequired
            />
          </div>
          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

export default FormCodeLetterGenerated

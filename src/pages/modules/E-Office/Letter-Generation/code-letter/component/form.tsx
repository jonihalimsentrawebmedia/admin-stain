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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'

interface props {
  form: UseFormReturn<TResolverCodeLetter>
  loading: boolean
  HandleSave: (value: TResolverCodeLetter) => void
}

const FormCodeLetterGenerated = (props: props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  const { institution } = UseGetUnitActive()

  const result = GenerateLetterCodeNumber({
    kode_depan: form.watch('kode_depan'),
    urutan_kode_depan: form.watch('urutan_kode_depan'),
    kode_belakang: form.watch('kode_belakang'),
    urutan_kode_belakang: form.watch('urutan_kode_belakang'),
    is_bulan: form.watch('is_perlu_bulan'),
    is_bulan_romawi: form.watch('is_bulan_romawi'),
    is_tahun: form.watch('is_perlu_tahun'),
    urutan_bulan: form.watch('urutan_bulan'),
    urutan_nomor_surat: form.watch('urutan_posisi_utama_no_surat'),
    urutan_tahun: form.watch('urutan_tahun'),
  })

  return (
    <>
      <Form {...form}>
        <form
          className={'mt-8 w-full flex flex-col gap-4'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <CheckboxInputBasic
            name={'isi_surat_otomatis'}
            form={form}
            label={'Isi Urutan otomatis'}
            fx={(e) => {
              if (e) {
                form.setValue('urutan_kode_depan', 1)
                form.setValue('urutan_posisi_utama_no_surat', 2)
                form.setValue('urutan_kode_belakang', 3)
                form.setValue('urutan_bulan', 4)
                form.setValue('urutan_tahun', 5)
              }
            }}
          />
          <div className="grid grid-cols-2 gap-5">
            <TextInput
              className={'col-span-2'}
              form={form}
              name={'nama_nomor_surat'}
              label={'Nama Kode Nomor Surat'}
              placeholder={'Masukan Nama Kode Nomor Surat'}
              htmlFor={'nama_kode_nomor_surat'}
              isRequired
            />
            <SelectBasicInput
              form={form}
              className={'col-span-2'}
              name={'id_unit'}
              label={'Satuan Kerja'}
              placeholder={'Pilih Satuan Kerja / Tidak Dipilih / NULL'}
              data={
                institution?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
              showNull
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
              isDisabled={!!form.watch('isi_surat_otomatis')}
              isNumber
              isRequired
            />
            <InputRadio
              className={'flex flex-col gap-3'}
              form={form}
              label={'Pengisian No. Surat'}
              name={'pengisian_no_surat'}
              isRequired
              data={['OTOMATIS', 'MANUAL']?.map((row) => ({
                label: row?.toLowerCase(),
                value: row,
              }))}
            />
            <TextInput
              form={form}
              name={'urutan_posisi_utama_no_surat'}
              label={'Posisi Urutan No. Surat'}
              htmlFor={'urutan_nomor_surat'}
              placeholder={'Posisi Urutan No. Surat'}
              type={'number'}
              isDisabled={!!form.watch('isi_surat_otomatis')}
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
              isDisabled={!!form.watch('isi_surat_otomatis')}
              type={'number'}
              isNumber
              isRequired
            />
            <InputRadio
              form={form}
              name={'is_perlu_bulan'}
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
              isDisabled={!!form.watch('isi_surat_otomatis')}
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
              name={'is_perlu_tahun'}
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
              isDisabled={!!form.watch('isi_surat_otomatis')}
              isNumber
              isRequired
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contoh Nomor Surat</CardTitle>
            </CardHeader>
            <CardContent>
              {/*{result ?? 'Belum Ada Nomor Surat'}*/}
              <div dangerouslySetInnerHTML={{ __html: result ?? 'Belum Ada Nomor Surat' }} />
            </CardContent>
          </Card>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

export default FormCodeLetterGenerated

import type { UseFormReturn } from 'react-hook-form'
import type { IAcreditationTypeForm } from '../model/resolver'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import TextAreaInput from '@/components/common/form/textAreaInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import InputImage3 from '@/components/common/form/InputImage3'

interface Props {
  form: UseFormReturn<IAcreditationTypeForm>
  handleSave: (value: IAcreditationTypeForm) => void
  handleCancel: () => void
  loading: boolean,
  optionsSatuanOrganisasi?: {
    value: string
    label: string
  }[]
}
const AcreditationForm = ({ form, handleCancel, handleSave, loading ,optionsSatuanOrganisasi}: Props) => {
  // const { satuanOrganisasi, loading: loadingUniv } = useGetSatuanOrganisasi({
  //   kelompok: 'UNIVERSITAS',
  // })
  // const { satuanOrganisasi: satuanOrganisasiProdi, loading: loadingProd } = useGetSatuanOrganisasi({
  //   kelompok: 'PRODI',
  // })
  // const optionsSatuanOrganisasi = [
  //   ...satuanOrganisasi.map((item) => {
  //     return {
  //       value: item.id_satuan_organisasi,
  //       label: item.nama,
  //       key: item.id_satuan_organisasi,
  //     }
  //   }),
  //   ...satuanOrganisasiProdi.map((item) => {
  //     return {
  //       value: item.id_satuan_organisasi,
  //       label: item.nama,
  //       key: item.id_satuan_organisasi,
  //     }
  //   }),
  // ]
  // console.log(optionsSatuanOrganisasi)

  const optionsAcreditationValue = [
    {
      value: 'UNGGUL',
      label: 'UNGGUL',
    },
    {
      value: 'BAIK_SEKALI',
      label: 'BAIK SEKALI',
    },
    {
      value: 'BAIK',
      label: 'BAIK',
    },
    {
      value: 'TIDAK_TERAKREDITASI',
      label: 'TIDAK TERAKREDITASI',
    },
  ]
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <InputImage3 form={form} name="gambar" isRow label="Gambar*" />
        <SelectBasicInput
          data={optionsSatuanOrganisasi ?? []}
          form={form}
          name="id_satuan_organisasi_akreditas"
          placeholder="Pilih"
          label="Pilih Universitas / Prodi*"
          isRow
          selectClassName="z-50"
       
        />
        <TextAreaInput isRow form={form} name="uraian" label="Uraian" placeholder="Uraian" />
        <SelectBasicInput
          data={optionsAcreditationValue}
          form={form}
          name="nilai_akreditas"
          placeholder="Pilih"
          label="Nilai Akreditasi*"
          isRow
        />
        <TextInput
          form={form}
          name="lembaga_penilaian"
          placeholder="Nama Lembaga Penilai"
          isRow
          label="Lembaga Penilai*"
        />
        <TextInput
          form={form}
          name="no_surat_keputusan"
          placeholder="No. Surat Keputusan"
          isRow
          label="No. Surat Keputusan*"
        />
        <TextInput
          form={form}
          type="date"
          inputClassName="max-w-[150px]"
          name="mulai_berlaku"
          placeholder="Mulai Berlaku*"
          isRow
          label="Mulai Berlaku*"
        />
        <TextInput
          form={form}
          min={form.watch('mulai_berlaku')}
          type="date"
          inputClassName="max-w-[150px]"
          name="akhir_berlaku"
          placeholder="Akhir Berlaku*"
          isRow
          label="Akhir Berlaku*"
        />
        <ButtonForm
          loading={loading}
          onCancel={() => {
            handleCancel()
          }}
        />
      </form>
    </Form>
  )
}

export default AcreditationForm

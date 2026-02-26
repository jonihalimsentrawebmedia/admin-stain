import InputImage2 from '@/components/common/form/InputImage2'
import { InputText } from '@/components/common/form/InputText'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<any>
}
const ModuleForm = ({ form }: Props) => {
  // PENGATURAN
  // WEBSITE_UTAMA
  // WEBSITE_PRODI
  // WEBSITE_UNIT
  // WEBSITE_LEMBAGA
  // MANAJEMEN_EDITOR
  // LAPORAN_STATISTIK
  // WEBSITE_FAKULTAS

  const optionsCategory = [
    {
      label: 'PENGATURAN',
      value: 'PENGATURAN',
    },
    {
      label: 'WEBSITE UTAMA',
      value: 'WEBSITE_UTAMA',
    },
    {
      label: 'WEBSITE FAKULTAS',
      value: 'WEBSITE_FAKULTAS',
    },
    {
      label: 'WEBSITE PRODI',
      value: 'WEBSITE_PRODI',
    },
    {
      label: 'WEBSITE UNIT',
      value: 'WEBSITE_UNIT',
    },
    {
      label: 'WEBSITE LEMBAGA',
      value: 'WEBSITE_LEMBAGA',
    },
    {
      label: 'MANAJEMEN EDITOR',
      value: 'MANAJEMEN_EDITOR',
    },
    {
      label: 'LAPORAN STATISTIK',
      value: 'LAPORAN_STATISTIK',
    },
  ]

  return (
    <>
      <div className="max-w-[300px]">
        <InputImage2 label="" description="icon" form={form} name="gambar" maxSizeMB={2} />
      </div>
      <InputText form={form} name="nama_module" isRow label="Nama Modul" placeholder="Nama Modul" />
      <InputText
        form={form}
        name="controller"
        isRow
        label="Controller "
        placeholder="Controller "
      />
      <SelectCustom
        data={optionsCategory}
        name="kategori"
        label="Kategori"
        placeholder="Pilih"
        form={form}
        isRow
        level1
      />
      <InputText
        type="number"
        form={form}
        name="urutan"
        isRow
        label="Urutan "
        placeholder="Urutan "
      />
    </>
  )
}

export default ModuleForm

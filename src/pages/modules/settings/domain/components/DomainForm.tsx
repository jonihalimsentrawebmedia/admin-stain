import { InputText } from '@/components/common/form/InputText'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import type { UseFormReturn } from 'react-hook-form'
import useGetSatuanOrganisasi from '../../controller/useGetSatuanOrganisasi'

interface Props {
  form: UseFormReturn<any>
}
const DomainForm = ({ form }: Props) => {
  const optionsGroup = [
    {
      label: 'Universitas',
      value: 'UNIVERSITAS',
    },
    {
      label: 'Fakultas',
      value: 'FAKULTAS',
    },
    {
      label: 'Program Studi',
      value: 'PRODI',
    },
    {
      label: 'Unit',
      value: 'UNIT',
    },
    {
      label: 'Lembaga',
      value: 'LEMBAGA',
    },
    {
      label: 'Unit Kegiatan Khusus / Unit Kegiatan Mahasiswa',
      value: 'UKK_UKM',
    },
    {
      label: 'Rektorat',
      value: 'REKTORAT',
    },
    {
      label: 'Biro',
      value: 'BIRO',
    },
    {
      label: 'Unit Pelaksana Teknis',
      value: 'UPT',
    },
  ]
  const { satuanOrganisasi } = useGetSatuanOrganisasi({
    kelompok: form.watch('kelompok'),
    isGetAll: true,
  })

  return (
    <>
      <SelectCustom
        data={optionsGroup}
        name="kelompok"
        label="Kelompok"
        placeholder="Pilih"
        form={form}
        isRow
        level1
      />
      <SelectCustom
        isDisabled={!form.watch('kelompok')}
        data={satuanOrganisasi.map((item) => {
          return {
            label: item.nama,
            value: item.id_satuan_organisasi,
          }
        })}
        name="id_satuan_organisasi"
        label="Nama"
        placeholder="Pilih"
        form={form}
        isRow
        level2
      />

      <InputText form={form} name="domain" isRow label="Domain   " placeholder="Domain " />
      <InputText form={form} name="ip" isRow label="IP Server" placeholder="IP Server" />
      <InputText
        form={form}
        name="endpoint_be"
        isRow
        label="Endpoint BE"
        placeholder="Endpoint BE"
      />
    </>
  )
}

export default DomainForm

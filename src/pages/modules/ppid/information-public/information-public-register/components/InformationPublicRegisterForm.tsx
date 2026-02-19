import type { UseFormReturn } from 'react-hook-form'
import type { InformationPublicRegisterType } from '../model/resolver'
import TextInput from '@/components/common/form/TextInput'
import { useGetOrganizationGroup, useGetPejabat } from '../controller'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import { InputCheckbox } from '@/components/common/form/InputCheckbox'

interface Props {
  form: UseFormReturn<InformationPublicRegisterType>
}
const InformationPublicRegisterForm = (props: Props) => {
  const { form } = props
  const { loading: loadingPejabat, pejabat } = useGetPejabat()
  const { loading: loadingOrganizationGroup, organizationGroup } = useGetOrganizationGroup()
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        form={form}
        name="ringkasan_isi_informasi"
        isRow
        label="Ringkasan Isi Informasi*"
        placeholder="Ringkasan Isi Informasi"
      />
      <SelectBasicInput
        isLoading={loadingOrganizationGroup}
        data={
          organizationGroup?.map((item) => ({
            label: item.nama_kelompok,
            value: item.id_kelompok_organisasi,
          })) ?? []
        }
        usePortal
        form={form}
        name="id_kelompok_organisasi"
        isRow
        label="Pejabat / Unit /Fakultas yang menguasai*"
        placeholder="Cth: Direktorat Pendidikan"
      />
      <SelectBasicInput
        isLoading={loadingPejabat}
        data={
          pejabat?.map((item) => ({
            label: item.nama_lengkap,
            value: item.id_pejabat,
          })) ?? []
        }
        form={form}
        name="id_pejabat"
        isRow
        label="Penanggung jawab Pembuatan / Penerbitan  Informasi*"
        placeholder="Cth: Rektor"
      />

      <TextInput
        form={form}
        name="waktu_dan_tempat_pembuatan_informasi"
        isRow
        label="Waktu dan Tempat Pembuatan Informasi*"
        placeholder="Cth: Maret 2025, Medan"
      />
      <InputCheckbox
        isRow
        label="Format Informasi yang Tersedia*"
        form={form}
        name="format_informasi_tersedia"
        data={[
          {
            label: 'HARDCOPY',
            value: 'HARDCOPY',
          },
          {
            label: 'SOFTCOPY',
            value: 'SOFTCOPY',
          },
        ]}
      />
      <p>Jangka dan Waktu Penyimpanan</p>
      <TextInput
        form={form}
        name="jangka_aktif"
        isRow
        label="Aktif*"
        placeholder="Cth: 1 Tahun / 1 tahun setelah tahun anggaran berakhir"
      />
      <TextInput
        form={form}
        name="jangka_inaktif"
        isRow
        label="Inaktif*"
        placeholder="Cth: 5 Tahun / 5 tahun setelah tahun anggaran berakhir"
      />
    </div>
  )
}

export default InformationPublicRegisterForm

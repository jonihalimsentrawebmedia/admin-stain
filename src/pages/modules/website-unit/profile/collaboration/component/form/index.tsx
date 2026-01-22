import type { UseFormReturn } from 'react-hook-form'
import CardInput from '@/components/common/card/CardInput'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import useGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi'
import TextInput from '@/components/common/form/TextInput'
import useGetCountry from '@/pages/modules/settings/reference/country/controller/useGetCountry'
import useGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince'
import useGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency'
import TextAreaInput from '@/components/common/form/textAreaInput'
import {
  UseGetAreaCollaboration,
  UseGetCategoryCollaboration,
  UseGetSubCategoryCollaboration,
  UseGetTypeCollaboration,
} from '@/pages/modules/website-unit/profile/collaboration/hooks'

interface Props {
  form: UseFormReturn<any>
}

const CollaborationFormUnit = ({ form }: Props) => {
  const optionKelompok = [
    {
      value: 'UNIVERSITAS',
      label: 'Universitas',
    },
    {
      value: 'FAKULTAS',
      label: 'Fakultas',
    },
    {
      value: 'PRODI',
      label: 'Prodi',
    },
    {
      value: 'UNIT',
      label: 'Unit',
    },
    {
      value: 'LEMBAGA',
      label: 'Lembaga',
    },
    {
      value: 'UKK_UKM',
      label: 'Ukk_ukm',
    },
    {
      value: 'REKTORAT',
      label: 'Rektorat',
    },
    {
      value: 'BIRO',
      label: 'Biro',
    },
    {
      value: 'UPT',
      label: 'Upt',
    },
  ]
  const { satuanOrganisasi, loading: loadingSatuanOrganisasi } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: form.watch('kelompok'),
  })

  const { country, loading: loadingCountry } = useGetCountry()
  const { province, loading: loadingProvince } = useGetProvince({
    isGetAll: true,
    id_negara: form.watch('id_negara'),
  })
  const { regency, loading: loadingRegency } = useGetRegency({
    isGetAll: true,
    id_provinsi: form.watch('id_provinsi'),
  })

  const { typeCollaboration, loading: load1 } = UseGetTypeCollaboration({
    isGetAll: true,
  })
  const { areaCollaboration, loading: load2 } = UseGetAreaCollaboration({
    isGetAll: true,
  })
  const { categoryCollaboration, loading: load3 } = UseGetCategoryCollaboration({
    isGetAll: true,
  })
  const { subCategoryCollaboration, loading: load4 } = UseGetSubCategoryCollaboration({
    isGetAll: true,
    categoryId: form.watch('id_kategori_kerjasama'),
  })

  return (
    <div className="flex flex-col gap-4">
      <CardInput title="Unit Yang Melakukan Kerjasama">
        <div className="flex flex-col gap-4">
          <SelectBasicInput
            data={optionKelompok}
            form={form}
            name="kelompok"
            placeholder="Pilih"
            isRow
            isDisabled
            label="Kelompok*"
            usePortal
          />
          <SelectBasicInput
            label="Unit*"
            data={satuanOrganisasi.map((item) => {
              return {
                label: item.nama,
                value: item.id_satuan_organisasi,
              }
            })}
            isLoading={form.watch('kelompok') == undefined ? false : loadingSatuanOrganisasi}
            form={form}
            name="id_unit"
            placeholder="Pilih"
            isDisabled
            isRow
            usePortal
          />
        </div>
      </CardInput>

      <CardInput title="Identitas Mitra">
        <div className="flex flex-col gap-4">
          <TextInput
            label="Nama Mitra"
            form={form}
            name="nama_mitra"
            placeholder="Nama Mitra"
            isRow
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectBasicInput
              usePortal
              isLoading={loadingCountry}
              data={country.map((item) => {
                return {
                  label: item.nama_negara,
                  value: item.id_negara,
                }
              })}
              form={form}
              name="id_negara"
              placeholder="Pilih"
              isRow
              label="Negara*"
            />
            <div></div>
            <SelectBasicInput
              isLoading={loadingProvince}
              data={province.map((item) => {
                return {
                  label: item.nama_provinsi,
                  value: item.id_provinsi,
                }
              })}
              usePortal
              form={form}
              name="id_provinsi"
              placeholder="Pilih"
              isRow
              label="Provinsi*"
            />
            <SelectBasicInput
              isLoading={loadingRegency}
              data={regency.map((item) => {
                return {
                  label: item.nama_kabupaten,
                  value: item.id_kabupaten,
                }
              })}
              form={form}
              name="id_kabupaten"
              placeholder="Pilih"
              isRow
              label="Kabupaten*"
            />
            <TextAreaInput
              form={form}
              name="alamat_mitra"
              isRow
              placeholder="Alamat Mitra"
              label="Alamat Mitra*"
            />
          </div>
        </div>
      </CardInput>

      <CardInput title="Legalitas  & Klasifikasi">
        <div className="flex flex-col gap-4">
          <TextInput
            form={form}
            name="no_kerjasama"
            placeholder="No. Kerjasama"
            isRow
            label="No. Kerjasama*"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectBasicInput
              isLoading={load1 || load2 || load3 || load4}
              data={typeCollaboration.map((item) => {
                return {
                  value: item.id_jenis_kerjasama,
                  label: item.nama_jenis_kerjasama,
                }
              })}
              usePortal
              form={form}
              name="id_jenis_kerjasama"
              placeholder="Pilih"
              isRow
              label="Jenis*"
            />
            <SelectBasicInput
              isLoading={load1 || load2 || load3 || load4}
              data={areaCollaboration.map((item) => {
                return {
                  value: item.id_bidang_kerjasama,
                  label: item.nama_bidang_kerjasama,
                }
              })}
              form={form}
              name="id_bidang_kerjasama"
              placeholder="Pilih"
              isRow
              label="Bidang*"
            />
            <SelectBasicInput
              isLoading={load1 || load2 || load3 || load4}
              data={categoryCollaboration.map((item) => {
                return {
                  value: item.id_kategori_kerjasama,
                  label: item.nama_kategori_kerjasama,
                }
              })}
              usePortal
              form={form}
              name="id_kategori_kerjasama"
              placeholder="Pilih"
              isRow
              label="Kategori*"
            />
            <SelectBasicInput
              isLoading={load1 || load2 || load3 || load4}
              data={subCategoryCollaboration.map((item) => {
                return {
                  value: item.id_sub_kategori_kerjasama,
                  label: item.nama_sub_kategori,
                }
              })}
              usePortal
              isDisabled={form.watch('id_kategori_kerjasama') == undefined}
              form={form}
              name="id_sub_kategori_kerjasama"
              placeholder="Pilih"
              isRow
              label="Sub Kategori"
            />
          </div>
        </div>
      </CardInput>
      <CardInput title="Masa Berlaku">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="Tanggal Mulai" form={form} name="tanggal_mulai" type="date" isRow />
            <TextInput
              label="Tanggal Selesai"
              form={form}
              name="tanggal_selesai"
              type="date"
              isRow
            />
          </div>
          <TextInput label="Periode" form={form} name="periode" type="number" isRow />
        </div>
      </CardInput>
      <CardInput title="Substansi & Manfaat">
        <TextAreaInput
          form={form}
          name="detail_kerjasama"
          isRow
          placeholder="Detail Kerjasama"
          label="Detail Kerjasama*"
        />
        <TextAreaInput
          form={form}
          name="manfaat_untuk_mitra"
          isRow
          placeholder="Manfaat Untuk Mitra*"
          label="Manfaat Untuk Mitra**"
        />
        <TextAreaInput
          form={form}
          name="manfaat_untuk_univ"
          isRow
          placeholder="Manfaat Untuk [Nama Universitas]*"
          label="Manfaat Untuk [Nama Universitas]**"
        />
      </CardInput>
    </div>
  )
}

export default CollaborationFormUnit

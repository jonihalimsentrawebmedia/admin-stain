import type { UseFormReturn } from 'react-hook-form'
import CardInput from '@/components/common/card/CardInput'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import type { ICollaborationTypeForm } from '../model/resolver'
import TextInput from '@/components/common/form/TextInput'
import useGetCountry from '@/pages/modules/settings/reference/country/controller/useGetCountry'
import useGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince'
import useGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency'
import TextAreaInput from '@/components/common/form/textAreaInput'
import useGetTypeOfCalloboration from '../../jenis-kerjasama/controller/useGetTypeOfCalloboration'
import useGetFieldOfCooperation from '../../bidang-kerjasama/controller/useGetFieldOfCooperation'
import useGetCalloborationCategory from '../../kategori-kerjasama/controller/useGetCalloborationCategory'
import useGetSubCalloborationCategory from '../../sub-kategori-kerjasama/controller/useGetSubCalloborationCategory'
import Cookies from 'js-cookie'
import useGetGroup from '../controller/useGetGroup'
import useGetGroupUnit from '../controller/useGetUnitGroup'

interface Props {
  form: UseFormReturn<ICollaborationTypeForm>
}

const CalloborationForm = ({ form }: Props) => {
  const isSatuanOrganisasi = Cookies.get('id_satuan_organisasi')
  const { groups, loading: loadingGroups } = useGetGroup({
    id_universitas: isSatuanOrganisasi,
  })

  const { groupUnit, loading: loadingGroupUnit } = useGetGroupUnit({
    kelompok: form.watch('kelompok'),
  })

  const { country, loading: loadingCountry } = useGetCountry({
    isGetAll: true,
  })
  const { province, loading: loadingProvince } = useGetProvince({
    isGetAll: true,
    id_negara: form.watch('id_negara'),
  })
  const { regency, loading: loadingRegency } = useGetRegency({
    isGetAll: true,
    id_provinsi: form.watch('id_provinsi'),
  })

  const { typeOfCalloboration, loading: loadingTypeCalloboration } = useGetTypeOfCalloboration({
    isGetAll: true,
  })
  const { fieldOfCooperation, loading: loadingFieldCooperation } = useGetFieldOfCooperation({
    isGetAll: true,
  })
  const { calloborationCategory, loading: loadingCalloborationCategory } =
    useGetCalloborationCategory({
      isGetAll: true,
    })
  const { subCalloborationCategory, loading: loadingSubCalloborationCategory } =
    useGetSubCalloborationCategory({
      isGetAll: true,
      id_kategori_kerjasama: form.watch('id_kategori_kerjasama'),
    })

  return (
    <div className="flex flex-col gap-4">
      <CardInput title="Unit Yang Melakukan Kerjasama">
        <div className="flex flex-col gap-4">
          <SelectBasicInput
            data={groups.map((item) => {
              return {
                value: item,
                label: item.split('_').join(' '),
              }
            })}
            form={form}
            name="kelompok"
            placeholder="Pilih"
            isRow
            label="Kelompok*"
            usePortal
            isLoading={loadingGroups}
          />
          <SelectBasicInput
            label="Unit*"
            data={groupUnit.map((item) => {
              return {
                label: item.nama_satuan_organisasi,
                value: item.id_satuan_organisasi,
              }
            })}
            isLoading={form.watch('kelompok') == undefined ? false : loadingGroupUnit}
            form={form}
            name="id_unit"
            placeholder="Pilih"
            isRow
            usePortal
            isDisabled={form.watch('kelompok') == undefined}
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
              apiValue={form.watch('id_negara')}
              fx={(e) => {
                console.log(e)
                const find = country?.find((item) => item.id_negara == e.value)
                console.log(find?.nama_negara.toLowerCase().includes('indonesia'))
                if (find?.nama_negara.toLowerCase().includes('indonesia')) {
                  form.setValue('id_provinsi', '')
                  form.setValue('id_kabupaten', '')
                }
              }}
            />
            <div></div>

            {country
              ?.find((row) => row?.id_negara === form.watch('id_negara'))
              ?.nama_negara.toLowerCase()
              .includes('indonesia') && (
              <>
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
              </>
            )}
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
              isLoading={loadingTypeCalloboration}
              data={typeOfCalloboration.map((item) => {
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
              isLoading={loadingFieldCooperation}
              data={fieldOfCooperation.map((item) => {
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
              isLoading={loadingCalloborationCategory}
              data={calloborationCategory.map((item) => {
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
              isLoading={loadingSubCalloborationCategory}
              data={subCalloborationCategory.map((item) => {
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

export default CalloborationForm

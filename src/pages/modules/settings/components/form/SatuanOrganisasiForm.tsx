import CardInput from '@/components/common/card/CardInput'
import InputImage from '@/components/common/form/InputImage'
import { InputText } from '@/components/common/form/InputText'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { UseFormReturn } from 'react-hook-form'
import useGetSatuanOrganisasi from '../../controller/useGetSatuanOrganisasi'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useGetEducationalLevel from '../../reference/educational-level/controller/useGetEducationalLevel'
import useGetListDikti from '../../controller/useGetListDikti'

interface Props {
  form: UseFormReturn<any>
  kelompok: string
}
const SatuanOrganisasiForm = ({ form, kelompok }: Props) => {
  const { satuanOrganisasi } = useGetSatuanOrganisasi({
    kelompok: 'UNIVERSITAS',
    isFilter: kelompok == 'PRODI' ? true : false,
    isGetAll: true,
  })
  const { satuanOrganisasi: fakultas } = useGetSatuanOrganisasi({
    kelompok: 'FAKULTAS',
    isGetAll: true,
  })
  const { dikti } = useGetListDikti(
    kelompok == 'PRODI' ? form.watch('parent_id_temp') : form.watch('parent_id')
  )
  const [searchParams, setSearchParams] = useSearchParams()
  let educationalLevelOption: any = []

  if (kelompok == 'PRODI') {
    const { educationalLevel } = useGetEducationalLevel({
      isGetAll: true,
    })

    educationalLevelOption = educationalLevel.map((item) => {
      return {
        value: item.id_jenjang,
        label: `${item.kode_jenjang} - ${item.nama_jenjang}`,
      }
    })
  }
  useEffect(() => {
    if (kelompok) {
      form.setValue('kelompok', kelompok)
    }
  }, [kelompok])

  const labelName =
    kelompok == 'PRODI'
      ? 'Nama Program Studi'
      : kelompok == 'UNIT'
        ? 'Nama Unit'
        : kelompok == 'FAKULTAS'
          ? 'Nama Fakultas'
          : kelompok == 'LEMBAGA'
            ? 'Nama Lembaga'
            : 'Nama Universitas / Perguruan Tinggi'
  const placeHolderName =
    kelompok == 'PRODI'
      ? 'Nama Program Studi'
      : kelompok == 'UNIT'
        ? 'Nama Unit'
        : kelompok == 'FAKULTAS'
          ? 'Nama Fakultas'
          : kelompok == 'LEMBAGA'
            ? 'Nama Lembaga'
            : 'Nama Universitas / Perguruan Tinggi'
  const placeHolderNameUniv = kelompok == 'PRODI' ? 'Pilih' : 'Pilih Universitas/PT Asal'
  const labelNameUniv = kelompok == 'PRODI' ? 'Universitas Asal' : 'Universitas/PT Asal'

  function getTitle() {
    switch (kelompok) {
      case 'PRODI':
        return 'Identitas Program Studi'
      case 'UNIT':
        return 'Identitas Unit '
      case 'FAKULTAS':
        return 'Identitas Fakultas'
      case 'UNIVERSITAS':
        return 'Identitas Institusi'
      case 'LEMBAGA':
        return 'Identitas Lembaga'
      default:
        return ''
    }
  }
  const valuesFakultas = satuanOrganisasi.filter(
    (item) =>
      item.id_satuan_organisasi == form.watch(kelompok == 'PRODI' ? 'parent_id_temp' : 'parent_id')
  )[0]
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <InputImage form={form} name="logo" label="Logo" />
        <InputImage form={form} name="favicon" label="Favicon" />
      </div>
      <CardInput title={getTitle()}>
        {kelompok === 'PRODI' && (
          <InputText
            name="kelompok"
            label="Kelompok"
            placeholder="Pilih Kelompok"
            form={form}
            isRow
            isDisabled
          />
        )}
        {kelompok !== 'UNIVERSITAS' && (
          <SelectCustom
            data={satuanOrganisasi.map((item) => {
              return {
                label: item.nama,
                value: item.id_satuan_organisasi,
              }
            })}
            fx={(e) => {
              if (kelompok == 'PRODI') {
                const newParams = new URLSearchParams(searchParams.toString())
                newParams.set('id_parent', e.value)
                if (e.value === '') newParams.delete('id_parent')
                setSearchParams(newParams)
              }
            }}
            name={kelompok == 'PRODI' ? 'parent_id_temp' : 'parent_id'}
            label={labelNameUniv}
            placeholder={placeHolderNameUniv}
            form={form}
            isRow
            level1
          />
        )}
        {kelompok == 'PRODI' && (
          <SelectCustom
            isDisabled={form.watch('parent_id_temp') == undefined}
            data={fakultas.map((item) => {
              return {
                label: item.nama,
                value: item.id_satuan_organisasi,
              }
            })}
            name="parent_id"
            label={'Fakultas Asal'}
            placeholder={'Pilih Universitas terlebih dahulu'}
            form={form}
            isRow
            level2
          />
        )}
        {kelompok !== 'PRODI' && (
          <InputText
            name="kelompok"
            label="Kelompok"
            placeholder="Pilih Kelompok"
            form={form}
            isRow
            isDisabled
          />
        )}

        <InputText form={form} name="nama" isRow label={labelName} placeholder={placeHolderName} />
        {kelompok == 'PRODI' && (
          <SelectCustom
            data={educationalLevelOption}
            name="id_jenjang_pendidikan"
            label={'Jenjang Pendidikan'}
            placeholder={'Pilih '}
            form={form}
            isRow
            level3
          />
        )}
        {kelompok !== 'PRODI' && kelompok !== 'UNIT' && (
          <InputText
            form={form}
            name="singkatan"
            isRow
            label="Singkatan "
            placeholder="Singkatan Nama Universitas / Perguruan Tinggi"
          />
        )}
        <InputText
          form={form}
          name="keyword"
          isRow
          label="Keyword"
          placeholder="Gunakan tanda koma (,) untuk memisahkan keyword"
        />
      </CardInput>
      <CardInput title="Alamat Lengkap">
        {kelompok !== 'UNIVERSITAS' && (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={form.watch('is_alamat_sama_parent')}
              disabled={!form.watch('parent_id')}
              id="isSome"
              onCheckedChange={(e) => {
                const temp = form.watch()
                if (e) {
                  form.reset({
                    ...temp,
                    alamat: valuesFakultas.alamat,
                    provinsi: valuesFakultas.provinsi,
                    kabupaten_kota: valuesFakultas.kabupaten_kota,
                    kecamatan: valuesFakultas.kecamatan,
                    kelurahan: valuesFakultas.kelurahan,
                    kode_pos: valuesFakultas.kode_pos,
                    is_alamat_sama_parent: e,
                  })
                } else {
                  form.reset({
                    ...temp,
                    alamat: '',
                    provinsi: '',
                    kabupaten_kota: '',
                    kecamatan: '',
                    kelurahan: '',
                    kode_pos: '',
                    is_alamat_sama_parent: e,
                  })
                }
              }}
            />
            <Label htmlFor="isSome" className="text-neutral font-normal">
              Gunakan alamat universitas sebagai alamat fakultas
            </Label>
          </div>
        )}
        <InputText
          form={form}
          name="alamat"
          isRow
          label="Alamat"
          placeholder="Alamat lengkap Nama Universitas / Perguruan Tinggi"
        />
        <InputText
          name="provinsi"
          label="Provinsi"
          placeholder="Masukkan Provinsi"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          name="kabupaten_kota"
          label="Kabupaten/Kota"
          placeholder="Masukkan Kabupaten/Kota"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          name="kecamatan"
          label="Kecamatan"
          placeholder="Masukkan Kecamatan"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />

        <InputText
          name="kelurahan"
          label="Kelurahan / Desa"
          placeholder="Masukkan Kelurahan / Desa"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          form={form}
          name="kode_pos"
          isRow
          label="Kode Pos"
          placeholder="Kode Pos"
          type="number"
          inputClassName="lg:max-w-[300px]"
        />
      </CardInput>
      <CardInput title="Kontak Resmi">
        <InputText
          form={form}
          name="telepon"
          isRow
          label="Telepon"
          placeholder="Telepon"
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          form={form}
          name="fax"
          isRow
          label="Fax "
          placeholder="Fax"
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          form={form}
          name="email"
          isRow
          label="Email"
          placeholder="email"
          inputClassName="lg:max-w-[300px]"
        />
      </CardInput>
      <CardInput title="Media Sosial">
        <InputText
          form={form}
          name="facebook"
          isRow
          label="Facebook"
          placeholder="Masukkan link disini"
          //   inputClassName="lg:max-w-[300px]"
        />

        <InputText
          form={form}
          name="twitter"
          isRow
          label="Twitter"
          placeholder="Masukkan link disini"
        />
        <InputText
          form={form}
          name="instagram"
          isRow
          label="Instagram"
          placeholder="Masukkan link disini"
        />
        <InputText
          form={form}
          name="youtube"
          isRow
          label="Youtube"
          placeholder="Masukkan link disini"
        />
      </CardInput>
      {kelompok == 'UNIVERSITAS' ? (
        <>
          <CardInput title="API KEY DIKTI">
            <InputText
              form={form}
              name="api_dikti_id_pengguna"
              isRow
              label="API DIKTI ID PENGGUNA"
              placeholder="Masukkan API DIKTI ID PENGGUNA"
              //   inputClassName="lg:max-w-[300px]"
            />

            <InputText
              form={form}
              name="api_dikti_username"
              isRow
              label="API DIKTI USERNAME"
              placeholder="Masukan API DIKTI USERNAME"
            />
            <InputText
              form={form}
              name="api_dikti_password"
              isRow
              label="API DIKTI PASSWORD"
              placeholder="Masukkan API DIKTI PASSWORD"
            />
          </CardInput>
        </>
      ) : (
        <CardInput title="Unit Kerja Dikti">
          <SelectCustom
            data={dikti.map((item) => {
              return {
                value: item.id,
                label: item.nama,
              }
            })}
            name={'id_unit_kerja_dikti'}
            label={'Unit Kerja Dikti'}
            placeholder={'Unit Kerja Dikti'}
            form={form}
            isRow
            level1
          />
        </CardInput>
      )}
    </>
  )
}

export default SatuanOrganisasiForm

'use client'

import { useForm, useWatch } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInCalendarYears, format } from 'date-fns'
import AxiosClient from '@/provider/axios'
import { UseGetDetailJobsSeekers } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { ResolverProfileUser, type ResolverProfileUserType } from '../data/resolver'
import UseGetCountry from '@/pages/modules/settings/reference/country/controller/useGetCountry.tsx'
import UseGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince.tsx'
import UseGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency.tsx'
import UseGetFaculty from '@/pages/modules/website-utama/fakultas/controller/useGetFaculty.tsx'
import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import { toast } from 'react-toastify'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { NewMultipleSelectCategory } from '@/pages/modules/pusat-karir/service/job-vacancy/component/newMultiple.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'

export const FormUserProfile = () => {
  const { id } = useParams()
  const { detail: userPersonalInfo } = UseGetDetailJobsSeekers((id as string) ?? '')
  const navigate = useNavigate()

  const form = useForm<ResolverProfileUserType>({
    resolver: zodResolver(ResolverProfileUser),
  })

  const [loading, setLoading] = useState(false)

  const { country, loading: load1 } = UseGetCountry()
  const { province, loading: load2 } = UseGetProvince({
    id_negara: form.watch('data_diri.kewarganegaraan'),
    isGetAll: true,
  })
  const { regency: city, loading: load3 } = UseGetRegency({
    id_provinsi: form.watch('alamat.id_provinsi') ?? '',
    isGetAll: true,
  })

  const { regency: city_ktp, loading: load4 } = UseGetRegency({
    id_provinsi: form.watch('alamat_ktp.id_provinsi') ?? '',
    isGetAll: true,
  })

  const { faculty, loading: load5 } = UseGetFaculty({ isGetAll: true })

  const { satuanOrganisasi: prodi, loading: load6 } = UseGetSatuanOrganisasi({
    kelompok: 'PRODI',
    isGetAll: true,
    idParent: form.watch('pendidikan_terakhir.id_fakultas') ?? '',
  })

  const tanggal = useWatch({
    control: form.control,
    name: 'data_diri.tanggal_lahir',
  })

  useEffect(() => {
    if (!tanggal) return

    const tanggal_lahir = new Date(tanggal)
    const usia = differenceInCalendarYears(new Date(), tanggal_lahir)

    form.setValue('data_diri.usia', usia)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tanggal])

  useEffect(() => {
    if (userPersonalInfo) {
      const temp = userPersonalInfo?.sub_spesialis.map((row) => row.id_sub_spesialis)

      form.reset({
        ...(userPersonalInfo as unknown as ResolverProfileUserType),
        pendidikan_terakhir: {
          ...(userPersonalInfo?.pendidikan_terakhir as unknown as ResolverProfileUserType['pendidikan_terakhir']),
          nama_universitas:
            userPersonalInfo?.pendidikan_terakhir?.universitas_asal === 'DALAM_UNIVERSITAS'
              ? 'Universitas STAIN MADINA'
              : userPersonalInfo?.pendidikan_terakhir?.universitas_asal_luar_universitas,
        },
        sub_spesialis: temp ?? [],
        data_diri: {
          ...(userPersonalInfo?.data_diri as unknown as ResolverProfileUserType['data_diri']),
          tanggal_lahir: format(userPersonalInfo?.data_diri.tanggal_lahir as string, 'yyyy-MM-dd'),
        },
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPersonalInfo])

  const HandleSave = async (value: ResolverProfileUserType) => {
    setLoading(true)
    await AxiosClient.put(`pusat-karir/pencari-kerja/${id}`, {
      ...value,
      data_diri: {
        ...value.data_diri,
        tanggal_lahir: new Date(value?.data_diri?.tanggal_lahir).toISOString(),
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res?.data?.message || 'Berhasil menyimpan data')
          navigate(-1)
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal menyimpan data')
        setLoading(false)
      })
  }

  console.log(form.formState.errors)

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 bg-white'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Edit User - Pencari Kerja'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate(-1),
              },
              {
                type: 'save',
                label: 'Simpan',
                isDisabled: !userPersonalInfo?.is_verified,
              },
            ]}
          />

          {!userPersonalInfo?.is_verified && (
            <div
              className={
                'border text-sm p-1.5 border-blue-500 text-blue-500 flex  gap-1.5 w-fit items-center rounded-full px-3'
              }
            >
              <MdInfo className={'size-5'} />
              Belum melakukan verifikasi email
            </div>
          )}

          <UploadPhotoImage form={form} name={'data_diri.url_foto_profil'} />

          <TitleLine title={'Data Diri'} />

          <div className="flex flex-col lg:grid grid-cols-3 gap-4">
            <TextInput
              name={'data_diri.nama_lengkap'}
              form={form}
              className={'col-span-3'}
              label={'Nama Lengkap'}
              placeholder={'Nama Lengkap'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />

            <TextInput
              name={'data_diri.tempat_lahir'}
              form={form}
              label={'Tempat Lahir'}
              placeholder={'Tempat Lahir'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />

            <TextInput
              name={'data_diri.tanggal_lahir'}
              form={form}
              label={'Tanggal Lahir'}
              placeholder={'Tanggal Lahir'}
              type={'date'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />

            <TextInput
              name={'data_diri.usia'}
              form={form}
              label={'Usia (Tahun)'}
              placeholder={'Usia (Tahun)'}
              isDisabled
              isRequired
            />

            <InputRadio
              form={form}
              className={'gap-y-4 w-fit'}
              name={'data_diri.jenis_kelamin'}
              label={'Jenis Kelamin'}
              data={['L', 'P'].map((row) => ({
                label: row === 'L' ? 'Laki Laki' : 'Perempuan',
                value: row,
              }))}
              isRequired
            />

            <SelectBasicInput
              form={form}
              label={'Agama'}
              placeholder={'Agama'}
              isDisabled={!userPersonalInfo?.is_verified}
              name={'data_diri.agama'}
              isRequired
              usePortal
              data={['ISLAM', 'KRISTEEN', 'KATOLIK', 'HINDU', 'BUDDHA', 'KONGHUCU', 'LAINNYA'].map(
                (row) => ({
                  label: row.toLowerCase(),
                  value: row,
                })
              )}
            />

            <SelectBasicInput
              form={form}
              label={'Status Pernikahan'}
              placeholder={'Status Pernikahan'}
              name={'data_diri.status_pernikahan'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
              usePortal
              data={['BELUM_MENIKAH', 'MENIKAH', 'JANDA', 'DUDA'].map((row) => ({
                label: row.toLowerCase(),
                value: row.split(' ').join('_'),
              }))}
            />

            <SelectBasicInput
              form={form}
              label={'Kewarganegaraan'}
              placeholder={'Kewarganegaraan'}
              name={'data_diri.kewarganegaraan'}
              isLoading={load1}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
              usePortal
              data={
                country?.map((row) => ({
                  label: row.nama_negara,
                  value: row?.id_negara,
                })) ?? []
              }
              fx={() => {
                form.setValue('alamat.provinsi', '')
                form.setValue('alamat.id_provinsi', '')
                form.setValue('alamat.kabupaten_kota', '')
                form.setValue('alamat.id_kabupaten_kota', '')
                form.setValue('alamat_ktp.provinsi', '')
                form.setValue('alamat_ktp.id_provinsi', '')
                form.setValue('alamat_ktp.kabupaten_kota', '')
                form.setValue('alamat_ktp.id_kabupaten_kota', '')
              }}
            />

            <TextInput
              name={'data_diri.nik'}
              isDisabled={!userPersonalInfo?.is_verified}
              label={'NIK/No. Paspor'}
              placeholder={'NIK/No. Paspor'}
              form={form}
              type={'number'}
              isRequired
            />

            <div className="" />

            <TextInput
              name={'data_diri.no_handphone'}
              isDisabled={!userPersonalInfo?.is_verified}
              form={form}
              label={'No Handphone 1'}
              placeholder={'No Handphone Utama'}
              type={'number'}
              isRequired
            />

            <TextInput
              name={'data_diri.no_handphone_2'}
              isDisabled={!userPersonalInfo?.is_verified}
              form={form}
              label={'No Handphone 2'}
              placeholder={'No Handphone 2'}
              type={'number'}
            />

            <TextInput
              name={'data_diri.no_telepon'}
              form={form}
              label={'No. Telepon'}
              placeholder={'No. Telepon'}
              isDisabled={!userPersonalInfo?.is_verified}
              type={'number'}
            />

            <TextInput
              name={'data_diri.email'}
              form={form}
              label={'Email'}
              placeholder={'Email Utama'}
              isDisabled={!userPersonalInfo?.is_verified}
              type={'email'}
              isRequired
            />
            <TextInput
              name={'data_diri.email_alternatif'}
              form={form}
              label={'Email Alternatif'}
              placeholder={'Email Alternatif (Optional)'}
              type={'email'}
              isDisabled={!userPersonalInfo?.is_verified}
            />
            <TextInput
              name={'data_diri.website'}
              form={form}
              label={'Website'}
              placeholder={'Website (Optional)'}
              type={'url'}
              isDisabled={!userPersonalInfo?.is_verified}
            />
          </div>

          <TitleLine title={'Alamat Domisili'} />

          <div className="flex flex-col lg:grid grid-cols-3 gap-4">
            <TextInput
              name={'alamat.alamat_lengkap'}
              placeholder={'Alamat Lengkap'}
              label={'Alamat Lengkap'}
              form={form}
              className={'col-span-3'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />

            {form.watch('data_diri.kewarganegaraan') &&
            country
              .find((row) => row.id_negara === form.watch('data_diri.kewarganegaraan'))
              ?.nama_negara.toLowerCase() === 'indonesia' ? (
              <>
                <SelectBasicInput
                  form={form}
                  name={'alamat.id_provinsi'}
                  label={'Provinsi'}
                  isDisabled={
                    !form.watch('data_diri.kewarganegaraan') || !userPersonalInfo?.is_verified
                  }
                  isLoading={load2}
                  usePortal
                  placeholder={'Provinsi'}
                  data={province?.map((row) => ({
                    label: row?.nama_provinsi,
                    value: row?.id_provinsi,
                  }))}
                  isRequired
                />

                <SelectBasicInput
                  form={form}
                  name={'alamat.id_kabupaten_kota'}
                  label={'Kab/Kota'}
                  placeholder={'Kab/Kota'}
                  isDisabled={!form.watch('alamat.id_provinsi') || !userPersonalInfo?.is_verified}
                  usePortal
                  isLoading={load3}
                  data={
                    city?.map((row) => ({
                      label: row?.nama_kabupaten,
                      value: row?.id_kabupaten,
                    })) ?? []
                  }
                  isRequired
                />
              </>
            ) : (
              <>
                <TextInput
                  name={'alamat.provinsi'}
                  form={form}
                  label={'Provinsi'}
                  placeholder={'Provinsi'}
                  isDisabled={!userPersonalInfo?.is_verified}
                  isRequired
                />
                <TextInput
                  name={'alamat.kabupaten_kota'}
                  form={form}
                  label={'Kabupaten/Kota'}
                  placeholder={'Kabupaten/Kota'}
                  isDisabled={!userPersonalInfo?.is_verified}
                  isRequired
                />
              </>
            )}

            <TextInput
              name={'alamat.kode_pos'}
              label={'Kode Pos'}
              placeholder={'Kode Pos'}
              form={form}
              type={'number'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />
          </div>

          <TitleLine title={'Alamat KTP'} />

          <div className="flex flex-col lg:grid grid-cols-3 gap-4">
            <TextInput
              name={'alamat_ktp.alamat_lengkap'}
              placeholder={'Alamat Lengkap'}
              label={'Alamat Lengkap'}
              form={form}
              className={'col-span-3'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />

            {form.watch('data_diri.kewarganegaraan') &&
            country
              .find((row) => row.id_negara === form.watch('data_diri.kewarganegaraan'))
              ?.nama_negara.toLowerCase() === 'indonesia' ? (
              <>
                <SelectBasicInput
                  form={form}
                  name={'alamat_ktp.id_provinsi'}
                  label={'Provinsi'}
                  isLoading={load2}
                  isDisabled={
                    !form.watch('data_diri.kewarganegaraan') || !userPersonalInfo?.is_verified
                  }
                  usePortal
                  placeholder={'Provinsi'}
                  data={province?.map((row) => ({
                    label: row?.nama_provinsi,
                    value: row?.id_provinsi,
                  }))}
                  isRequired
                />

                <SelectBasicInput
                  form={form}
                  name={'alamat_ktp.id_kabupaten_kota'}
                  label={'Kab/Kota'}
                  usePortal
                  isLoading={load4}
                  isDisabled={
                    !form.watch('alamat_ktp.id_provinsi') || !userPersonalInfo?.is_verified
                  }
                  placeholder={'Kab/Kota'}
                  data={city_ktp?.map((row) => ({
                    label: row?.nama_kabupaten,
                    value: row?.id_kabupaten,
                  }))}
                  isRequired
                />
              </>
            ) : (
              <>
                <TextInput
                  name={'alamat_ktp.provinsi'}
                  form={form}
                  label={'Provinsi'}
                  placeholder={'Provinsi'}
                  isDisabled={!userPersonalInfo?.is_verified}
                  isRequired
                />
                <TextInput
                  name={'alamat_ktp.kabupaten_kota'}
                  form={form}
                  label={'Kabupaten/Kota'}
                  placeholder={'Kabupaten/Kota'}
                  isDisabled={!userPersonalInfo?.is_verified}
                  isRequired
                />
              </>
            )}

            <TextInput
              name={'alamat_ktp.kode_pos'}
              label={'Kode Pos'}
              placeholder={'Kode Pos'}
              form={form}
              type={'number'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
            />
          </div>

          <TitleLine title={'Pendidikan Terakhir'} />

          <div className="flex flex-col gap-y-4">
            <SelectBasicInput
              isDisabled={true}
              name={'pendidikan_terakhir.universitas_asal'}
              form={form}
              label={'Universitas Asal'}
              placeholder={'Universitas Asal'}
              usePortal
              data={
                ['DALAM_UNIVERSITAS', 'LUAR_UNIVERSITAS'].map((row) => ({
                  label: row === 'DALAM_UNIVERSITAS' ? 'STAIN MADINA' : 'Luar STAIN MADINA',
                  value: row,
                })) ?? []
              }
              isRequired
              isRow
            />

            <TextInput
              name={'pendidikan_terakhir.nama_universitas'}
              form={form}
              isDisabled={
                form.watch('pendidikan_terakhir.universitas_asal') === 'DALAM_UNIVERSITAS' ||
                !userPersonalInfo?.is_verified
              }
              label={'Universitas'}
              placeholder={'Nama Universitas'}
              isRequired
              isRow
            />

            {form.watch('pendidikan_terakhir.universitas_asal') === 'DALAM_UNIVERSITAS' ? (
              <>
                <SelectBasicInput
                  form={form}
                  name={'pendidikan_terakhir.id_fakultas'}
                  label={'Fakultas'}
                  placeholder={'Fakultas'}
                  isDisabled={load5 || !userPersonalInfo?.is_verified}
                  data={
                    faculty?.map((row) => ({
                      label: row.nama,
                      value: row.id_satuan_organisasi,
                    })) ?? []
                  }
                  isRequired
                  isRow
                  usePortal
                />
                <SelectBasicInput
                  form={form}
                  name={'pendidikan_terakhir.id_prodi'}
                  selectClassName={'z-10'}
                  label={'Program Studi'}
                  placeholder={'Program Studi'}
                  isLoading={load6}
                  isDisabled={
                    !form.watch('pendidikan_terakhir.id_fakultas') || !userPersonalInfo?.is_verified
                  }
                  data={
                    prodi?.map((row) => ({
                      label: row.nama,
                      value: row.id_satuan_organisasi,
                    })) ?? []
                  }
                  isRequired
                  isRow
                  usePortal
                />
              </>
            ) : (
              <>
                <TextInput
                  name={'pendidikan_terakhir.fakultas'}
                  form={form}
                  label={'Fakultas'}
                  placeholder={'Fakultas'}
                  isDisabled={!userPersonalInfo?.is_verified}
                  isRequired
                  isRow
                />

                <TextInput
                  name={'pendidikan_terakhir.prodi'}
                  form={form}
                  label={'Program Studi'}
                  isDisabled={!userPersonalInfo?.is_verified}
                  placeholder={'Program Studi'}
                  isRequired
                  isRow
                />
              </>
            )}

            <InputRadio
              form={form}
              className={'w-fit'}
              name={'pendidikan_terakhir.status_mahasiswa'}
              isDisabled={!userPersonalInfo?.is_verified}
              isRequired
              isRow
              label={'Status Mahasiswa'}
              data={['AKTIF', 'ALUMNI'].map((row) => ({
                label: row === 'ALUMNI' ? 'Alumni' : 'Mahasiswa Aktif',
                value: row,
              }))}
            />
          </div>

          <TitleLine title={'Bidang / Spesialisasi Pekerjaan Yang Diminati'} />

          <NewMultipleSelectCategory form={form} name={'sub_spesialis'} />

          <TitleLine title={'CV / Resume'} />

          <div className="flex flex-col gap-y-4">
            <ul className={'text-sm text-blue-500 list-disc pl-5'}>
              <li>harap upload cv / resume yang terbaru.</li>
              <li>Jenis file yang diterima : .pdf.</li>
              <li>Max 2 MB</li>
            </ul>

            <UploadFileInput
              form={form}
              name={'files.url_cv'}
              keyname={'files.key_url_cv'}
              label={'CV / Resume'}
              accept={'application/pdf'}
              innerClassName={'rounded'}
              disabled={!userPersonalInfo?.is_verified}
              required
              isRow
            />
          </div>

          <ButtonForm
            loading={loading || !userPersonalInfo?.is_verified}
            onCancel={() => navigate(-1)}
          />
        </form>
      </Form>
    </>
  )
}

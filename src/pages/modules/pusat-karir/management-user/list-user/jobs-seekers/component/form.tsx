'use client'

import { useForm } from 'react-hook-form'
import {
  JobSeekersResolver,
  type JobSeekersResolverType,
} from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import UseGetFaculty from '@/pages/modules/website-utama/fakultas/controller/useGetFaculty.tsx'
import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

export const FormJobSeekers = () => {
  const form = useForm<JobSeekersResolverType>({
    resolver: zodResolver(JobSeekersResolver),
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { faculty, loading: load1 } = UseGetFaculty({ isGetAll: true })
  const { satuanOrganisasi: prodi, loading: load2 } = UseGetSatuanOrganisasi({
    kelompok: 'PRODI',
    isGetAll: true,
    idParent: form.watch('id_fakultas') ?? '',
  })

  const HandleRegister = async (value: JobSeekersResolverType) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/pencari-kerja', {
      ...value,
      password: value.no_handphone,
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Berhasil mendaftar')
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'flex flex-col gap-5 w-full bg-white p-5'}
          onSubmit={form.handleSubmit(HandleRegister)}
        >
          <ButtonTitleGroup
            label={'Tambah User - Pencari Kerja'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate(-1),
              },
              {
                type: 'save',
                label: 'Simpan',
                isDisabled: loading,
              },
            ]}
          />
          <TextInput
            name={'nama_lengkap'}
            form={form}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            isRequired
            isRow
          />

          <SelectBasicInput
            form={form}
            name={'pendidikan_terakhir'}
            label={'Pendidikan Terakhir'}
            placeholder={'Pendidikan Terakhir'}
            data={
              ['UNDERGRADUATE', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3']?.map((row) => ({
                label: row,
                value: row,
              })) ?? []
            }
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'universitas_asal'}
            className={'w-fit'}
            label={'Universitas Asal'}
            data={['DALAM_UNIVERSITAS', 'LUAR_UNIVERSITAS'].map((row) => ({
              label: row === 'DALAM_UNIVERSITAS' ? 'STAIN MADINA' : 'Luar STAIN MADINA',
              value: row,
            }))}
            fx={() => {
              form.setValue('id_fakultas', '')
              form.setValue('fakultas', '')
              form.setValue('id_prodi', '')
              form.setValue('prodi', '')
            }}
            isRequired
            isRow
          />

          {form.watch('universitas_asal') === 'DALAM_UNIVERSITAS' ? (
            <>
              <SelectBasicInput
                form={form}
                name={'id_fakultas'}
                label={'Fakultas'}
                isLoading={load1}
                placeholder={'Fakultas'}
                data={
                  faculty?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                isRequired
                isRow
                usePortal
                fx={() => {
                  form.setValue('id_prodi', '')
                }}
              />
              <SelectBasicInput
                form={form}
                name={'id_prodi'}
                isLoading={load2}
                selectClassName={'z-10'}
                isDisabled={!form.watch('id_fakultas')}
                label={'Program Studi'}
                placeholder={'Program Studi'}
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
                name={'fakultas'}
                form={form}
                label={'Fakultas'}
                placeholder={'Fakultas'}
                isRequired
                isRow
              />

              <TextInput
                name={'prodi'}
                form={form}
                label={'Program Studi'}
                placeholder={'Program Studi'}
                isRequired
                isRow
              />
            </>
          )}

          <TextInput
            name={'nim'}
            form={form}
            label={'NIM'}
            placeholder={'NIM'}
            isRequired
            type={'number'}
            isRow
          />

          <UploadFileInput
            form={form}
            name={'url_ktm'}
            keyname={'key_url_ktm'}
            label={'Upload SCAN KTM'}
            accept={'application/pdf'}
            required
            isRow
          />

          <InputRadio
            form={form}
            label={'Status Mahaiswa'}
            className={'w-fit'}
            isRequired
            isRow
            name={'status_mahasiswa'}
            data={['ALUMNI', 'AKTIF'].map((row) => ({
              label: row === 'ALUMNI' ? 'Alumni' : 'Mahasiwa Aktif',
              value: row,
            }))}
          />

          <TextInput
            name={'no_handphone'}
            form={form}
            label={'No. Handphone'}
            placeholder={'No. Handphone*'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            name={'email'}
            form={form}
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            isRequired
            isRow
          />

          <TextInput
            name={'password'}
            form={form}
            label={'password'}
            placeholder={'No. Handphone adalah password default akun'}
            type={'password'}
            isDisabled
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

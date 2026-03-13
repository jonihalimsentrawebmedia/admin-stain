import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios'
import { ResolverCompanyInformation, type TypeCompanyInformation } from '../data/resolver'
import UseGetCountry from '@/pages/modules/settings/reference/country/controller/useGetCountry.tsx'
import UseGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince.tsx'
import UseGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency.tsx'
import { toast } from 'react-toastify'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { ICompanyProfile } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/data/types.tsx'

interface Props {
  setTemp_id: Dispatch<SetStateAction<string>>
  detail?: ICompanyProfile
  setTabActive: Dispatch<SetStateAction<string>>
  id_tmp: string
}

export const FormCompanyInformation = (props: Props) => {
  const { setTemp_id, detail, setTabActive, id_tmp } = props

  const [loading, setLoading] = useState(false)

  const form = useForm<TypeCompanyInformation>({
    resolver: zodResolver(ResolverCompanyInformation),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        ...detail?.informasi_perusahaan,
      })
    }
  }, [detail])

  const { country, loading: load1 } = UseGetCountry()
  const { province, loading: load2 } = UseGetProvince({
    isGetAll: true,
    id_negara: form.watch('id_negara') ?? '',
  })

  const { regency: city, loading: load3 } = UseGetRegency({
    isGetAll: true,
    id_provinsi: form?.watch('id_provinsi') ?? '',
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: TypeCompanyInformation) => {
    setLoading(true)
    if (!detail) {
      await AxiosClient.post('/pusat-karir/mitra-kerja/mitra-kerja-tmp/informasi-perusahaan', value)
        .then((res) => {
          if (res?.data?.status) {
            setLoading(false)
            queryClient.invalidateQueries({ queryKey: ['detail-status-form'] })
            window.localStorage.setItem('temp_id', res?.data?.data?.id)
            setTemp_id(res?.data?.data?.id)
            toast.success(res?.data?.message || 'Berhasil menyimpan data')
            setTabActive('step_2')
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
        })
    } else {
      await AxiosClient.put(
        `/pusat-karir/mitra-kerja/mitra-kerja-tmp/${id_tmp}/informasi-perusahaan`,
        value
      )
        .then((res) => {
          if (res?.data?.status) {
            setLoading(false)
            queryClient.invalidateQueries({ queryKey: ['detail-status-form'] })
            window.localStorage.setItem('temp_id', res?.data?.data?.id)
            setTemp_id(res?.data?.data?.id)
            toast.success(res?.data?.message || 'Berhasil menyimpan data')
            setTabActive('step_2')
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
        })
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'mt-8 flex flex-col gap-4 w-full'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <TextInput
            name={'nama_perusahaan'}
            form={form}
            label={'Nama Perusahaan'}
            placeholder={'Nama Perusahaan'}
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'lokasi'}
            className={'w-fit'}
            data={['DALAM_NEGERI', 'LUAR_NEGERI'].map((row) => ({
              label: row === 'DALAM_NEGERI' ? 'Dalam Negeri' : 'Luar Negeri',
              value: row,
            }))}
            label={'Lokasi'}
            fx={() => {
              if (form.watch('lokasi') === 'DALAM_NEGERI') {
                const Indo = country.find(
                  (row) => row?.nama_negara.toLowerCase() === 'indonesia'
                )?.id_negara
                form.setValue('id_negara', Indo)
                form.setValue('negara', '')
              } else {
                form.setValue('negara', '')
              }
            }}
            isRequired
            isRow
          />

          {form.watch('lokasi') === 'DALAM_NEGERI' ? (
            <>
              <SelectBasicInput
                name={'id_negara'}
                form={form}
                isLoading={load1}
                label={'Negara'}
                placeholder={'Negara'}
                data={
                  country?.map((row) => ({
                    label: row?.nama_negara,
                    value: row?.id_negara,
                  })) ?? []
                }
                isRequired
                isRow
                isDisabled
              />

              <SelectBasicInput
                form={form}
                name={'id_provinsi'}
                label={'Provinsi'}
                placeholder={'Provinsi'}
                isDisabled={!form.watch('id_negara') || load2}
                data={
                  province?.map((row) => ({
                    label: row?.nama_provinsi,
                    value: row?.id_provinsi,
                  })) ?? []
                }
                usePortal
                isRequired
                isRow
              />

              <SelectBasicInput
                form={form}
                name={'id_kabupaten_kota'}
                label={'Kabupaten/Kota'}
                placeholder={'Kabupaten/Kota'}
                isDisabled={!form.watch('id_provinsi') || load3}
                data={city?.map((row) => ({
                  label: row?.nama_kabupaten,
                  value: row?.id_kabupaten,
                }))}
                usePortal
                isRequired
                isRow
              />
            </>
          ) : (
            <>
              <TextInput
                name={'negara'}
                label={'Negara'}
                form={form}
                placeholder={'Negara'}
                isRequired
                isRow
              />
              <TextInput
                name={'provinsi'}
                label={'Provinsi'}
                form={form}
                placeholder={'Provinsi'}
                isRequired
                isRow
              />
              <TextInput
                name={'kabupaten_kota'}
                label={'Kabupaten/Kota'}
                form={form}
                placeholder={'Kabupaten/Kota'}
                isRequired
                isRow
              />
            </>
          )}

          <TextInput
            name={'kode_pos'}
            label={'Kode Pos'}
            form={form}
            placeholder={'Kode Pos'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            name={'no_telepon'}
            label={'No. Telepon Kantor'}
            form={form}
            placeholder={'No. Telepon Kantor'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'url_website'}
            label={'URL Website'}
            placeholder={'URL Website'}
            type={'url'}
            isRequired
            isRow
          />

          <UploadFileInput
            form={form}
            name={'url_file_permohonan'}
            keyname={'key_url_file_permohonan'}
            label={'Upload Surat Permohonan'}
            accept={'application/pdf'}
            required
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setTabActive('step_1')} />
        </form>
      </Form>
    </>
  )
}

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverCompanyInformation, type TypeCompanyInformation } from './resolver.tsx'
import { UseGetCompanyInformation } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import { useParams } from 'react-router-dom'
import UseGetCountry from '@/pages/modules/settings/reference/country/controller/useGetCountry.tsx'
import UseGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince.tsx'
import UseGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency.tsx'
import { toast } from 'react-toastify'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  setValue: Dispatch<SetStateAction<string>>
}

export const FormCompanyInformation = (prop: Props) => {
  const { setValue } = prop
  const { id } = useParams()

  const [loading, setLoading] = useState(false)

  const form = useForm<TypeCompanyInformation>({
    resolver: zodResolver(ResolverCompanyInformation),
  })

  const { information } = UseGetCompanyInformation((id as string) ?? '')
  const { country, loading: load1 } = UseGetCountry({
    isGetAll: true,
  })
  const { province, loading: load2 } = UseGetProvince({
    isGetAll: true,
    id_negara: form.watch('id_negara') ?? '',
  })
  const { regency: city, loading: load3 } = UseGetRegency({
    id_provinsi: form.watch('id_provinsi') ?? '',
    isGetAll: true,
  })

  useEffect(() => {
    if (information) {
      form.reset({
        ...information,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TypeCompanyInformation, is_step: boolean) => {
    setLoading(true)
    await AxiosClient.post(`/pusat-karir/mitra-kerja/${id}/profile/informasi-perusahaan`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Update Company Information')
          queryClient.invalidateQueries({ queryKey: ['status-step'] })
          if (is_step) {
            setValue('2')
          }
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Failed Update Company Information')
        setLoading(false)
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'flex flex-col gap-4 w-full'}
          onSubmit={form.handleSubmit((e) => HandleSave(e, true))}
        >
          <ButtonTitleGroup
            label={'Edit User - Mitra Kerja'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Button
                    variant={'outline'}
                    className={'border-primary text-primary hover:text-primary'}
                    onClick={(e) => {
                      e.preventDefault()
                      const data = form.getValues()
                      console.log(data)
                      toast.info('Coming Soon...')
                    }}
                  >
                    Simpan & Keluar
                  </Button>
                ),
              },
              {
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

          <div
            className={
              'text-blue-700 border border-blue-500 p-1.5 px-3 rounded-full w-fit flex gap-2 items-center'
            }
          >
            <MdInfo className={'text-primary-500  size-4'} />
            Silahkan lakukan perubahan informasi User
          </div>

          <TitleLine title={'Informasi Perusahaan'} />
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
            label={'Lokasi'}
            className={'w-fit'}
            isRequired
            isRow
            data={['DALAM_NEGERI', 'LUAR_NEGERI'].map((row) => ({
              label: row === 'DALAM_NEGERI' ? 'Dalam Negeri' : 'Luar Negeri',
              value: row,
            }))}
          />

          {form.watch('lokasi') === 'DALAM_NEGERI' ? (
            <>
              <SelectBasicInput
                form={form}
                name={'id_negara'}
                label={'Negara'}
                placeholder={'Negara'}
                usePortal
                isRequired
                isDisabled={load1 || true}
                isRow
                data={
                  country?.map((row) => ({
                    label: row?.nama_negara,
                    value: row?.id_negara,
                  })) ?? []
                }
              />

              <SelectBasicInput
                form={form}
                name={'id_provinsi'}
                label={'Provinsi'}
                placeholder={'Provinsi'}
                isDisabled={!form.watch('id_negara') || load2}
                usePortal
                isRequired
                isRow
                data={
                  province?.map((row) => ({
                    label: row?.nama_provinsi,
                    value: row?.id_provinsi,
                  })) ?? []
                }
              />

              <SelectBasicInput
                form={form}
                name={'id_kabupaten_kota'}
                label={'Kabupaten/Kota'}
                placeholder={'Kabupaten/Kota'}
                isDisabled={load3 || !form.watch('id_provinsi')}
                usePortal
                isRequired
                isRow
                data={
                  city?.map((row) => ({
                    label: row?.nama_kabupaten,
                    value: row?.id_kabupaten,
                  })) ?? []
                }
              />
            </>
          ) : (
            <>
              <TextInput
                name={'negara'}
                form={form}
                label={'Negara'}
                placeholder={'Negara'}
                isRequired
                isRow
              />

              <TextInput
                name={'provinsi'}
                form={form}
                label={'Provinsi'}
                placeholder={'Provinsi'}
                isRequired
                isRow
              />

              <TextInput
                name={'kabupaten_kota'}
                form={form}
                label={'Kabupaten/Kota'}
                placeholder={'Kabupaten/Kota'}
                isRequired
                isRow
              />
            </>
          )}

          <TextInput
            form={form}
            name={'kode_pos'}
            label={'Kode Pos'}
            placeholder={'Kode Pos'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'no_telepon'}
            label={'No. Telepon Kantor'}
            placeholder={'No Telepon Kantor'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'url_website'}
            label={'Website Perusahaan'}
            placeholder={'Website Perusahaan'}
            type={'url'}
            isRequired
            isRow
          />

          <UploadFileInput
            form={form}
            name={'url_file_permohonan'}
            keyname={'key_url_file_permohonan'}
            label={'Surat Permohonan Kerjasama'}
            accept={'application/pdf'}
            required
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setValue('1')} />
        </form>
      </Form>
    </>
  )
}

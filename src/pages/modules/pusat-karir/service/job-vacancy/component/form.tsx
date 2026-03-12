import type { UseFormReturn } from 'react-hook-form'
import type { JobVacancyType } from '@/pages/modules/pusat-karir/service/job-vacancy/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import UseGetProvince from '@/pages/modules/settings/reference/province/controller/useGetProvince.tsx'
import useGetRegency from '@/pages/modules/settings/reference/regency/controller/useGetRegency.tsx'
import { RichText } from '@/components/common/richtext'
import { NewMultipleSelectCategory } from '@/pages/modules/pusat-karir/service/job-vacancy/component/newMultiple.tsx'

interface Props {
  form: UseFormReturn<JobVacancyType>
  loading: boolean
  HandleSave: (e: JobVacancyType) => void
}

export const FormJobVacancy = (props: Props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  const { province, loading: load1 } = UseGetProvince({ isGetAll: true })

  const { regency, loading: load2 } = useGetRegency({
    isGetAll: true,
    id_provinsi: form.watch('id_provinsi'),
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Buka Lowongan Pekerjaan'}
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
          {form.watch('lowongan_internal') && (
            <TextInput
              form={form}
              name={'id_mitra_kerja'}
              label={'Pembuka Lowongan'}
              placeholder={'Pembuka Lowongan'}
              className={'bg-white'}
              isDisabled
              isRow
            />
          )}
          <TextInput
            name={'nama_pekerjaan'}
            form={form}
            label={'Nama Pekerjaan'}
            placeholder={'Nama Pekerjaan'}
            htmlFor={'nama_pekerjaan'}
            className={'bg-white'}
            isRequired
            isRow
          />

          {/*<MultipleSelectCategory form={form} name={'list_spesialisasi'} />*/}

          <NewMultipleSelectCategory form={form} name={'list_spesialisasi'} />

          <TextInput
            form={form}
            name={'kouta_pekerjaan'}
            label={'Kouta Pekerjaan'}
            placeholder={'Kouta Pekerjaan'}
            className={'bg-white w-1/2'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <SelectBasicInput
            name={'jenis_lokasi_kerja'}
            form={form}
            placeholder={'Jenis Lokasi Pekerjaan'}
            label={'Jenis Lokasi Pekerjaan'}
            className={'w-1/2'}
            isRequired
            isRow
            usePortal
            data={['ONSITE', 'REMOTE', 'HYBRID'].map((row) => ({
              label: row,
              value: row,
            }))}
          />

          <SelectBasicInput
            name={'id_provinsi'}
            form={form}
            placeholder={'Provinsi'}
            label={'Provinsi'}
            className={'w-1/2'}
            isLoading={load1}
            isRequired
            isRow
            usePortal
            data={province.map((row) => ({
              label: row.nama_provinsi,
              value: row.id_provinsi,
            }))}
            fx={() => {
              form.setValue('id_kabupaten', '')
            }}
          />

          <SelectBasicInput
            name={'id_kabupaten'}
            form={form}
            placeholder={'Kabupaten / Kota'}
            isLoading={load2}
            label={'Kabupaten / Kota'}
            className={'w-1/2'}
            isDisabled={!form.watch('id_provinsi')}
            isRequired
            isRow
            usePortal
            data={regency.map((row) => ({
              label: row.nama_kabupaten,
              value: row.id_kabupaten,
            }))}
          />

          <SelectBasicInput
            name={'jenis_pekerjaan'}
            form={form}
            placeholder={'Jenis Pekerjaan'}
            label={'Jenis Pekerjaan'}
            className={'w-1/2'}
            isRequired
            isRow
            usePortal
            data={['FULLTIME', 'PARTTIME', 'FREELANCE', 'CONTRACT', 'MAGANG'].map((row) => ({
              label: row,
              value: row,
            }))}
          />

          <TextInput
            form={form}
            name={'tgl_buka_pekerjaan'}
            label={'Tanggal Buka Pekerjaan'}
            placeholder={'Tanggal Buka Pekerjaan'}
            className={'bg-white w-1/2'}
            type={'date'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'tgl_tutup_pekerjaan'}
            label={'Tanggal Tutup Pekerjaan'}
            placeholder={'Tanggal Tutup Pekerjaan'}
            className={'bg-white w-1/2'}
            type={'date'}
            isRequired
            isRow
          />

          <RichText
            form={form}
            name={'deskripsi_pekerjaan'}
            label={'Deskripsi Pekerjaan'}
            isRow
            required
          />

          <RichText
            form={form}
            name={'tugas_dan_tanggung_jawab'}
            label={'Tugas dan Tanggung Jawab'}
            isRow
            required
          />

          <RichText form={form} name={'persyaratan'} label={'Persyaratan'} isRow required />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

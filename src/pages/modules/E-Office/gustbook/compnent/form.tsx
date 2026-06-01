import type { UseFormReturn } from 'react-hook-form'
import type { TResolverGuestBook } from '@/pages/modules/E-Office/gustbook/data/resolver.tsx'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { UseGetPurposeType } from '@/pages/modules/E-Office/reference/purpose-type/hooks'
import { UseGetPurposeGuest } from '@/pages/modules/E-Office/reference/purpose-guest/hooks'

interface props {
  loading: boolean
  form: UseFormReturn<TResolverGuestBook>
  HandleSave: (e: TResolverGuestBook) => void
}

const FormGustBook = (props: props) => {
  const { loading, form, HandleSave } = props
  const navigate = useNavigate()
  const { institution } = UseGetUnitInstitution()
  const { purposeType } = UseGetPurposeType({ page: '0', limit: '0' })
  const { purposeGuest } = UseGetPurposeGuest({ page: '0', limit: '0' })

  return (
    <>
      <Form {...form}>
        <form
          className={'mt-8 w-full flex flex-col gap-4'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <div className="grid grid-cols-2 gap-5 bg-white p-6 rounded shadow drop-shadow">
            <p className="col-span-2 text-2xl font-semibold">Informasi Pengunjung</p>
            <SelectBasicInput
              form={form}
              name={'id_unit'}
              placeholder={'Pilih Asal/ Institusi'}
              label={'Asal / Institusi'}
              isRequired
              data={
                institution?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
              className={'col-span-2'}
              selectClassName={'z-40'}
            />

            <TextInput
              name={'tanggal_kunjungan'}
              form={form}
              label={'Tanggal Kunjungan'}
              type={'date'}
              htmlFor={'tanggal_kunjungan'}
              className={'col-span-1 bg-white'}
              isRequired
            />

            <TextInput
              name={'nik'}
              form={form}
              label={'NIK'}
              type={'number'}
              htmlFor={'nik'}
              className={'col-span-1 bg-white'}
              placeholder={'Masukkan NIK'}
              isRequired
            />
            <TextInput
              name={'nama_lengkap'}
              form={form}
              label={'Nama Lengkap'}
              htmlFor={'nama_lengkap'}
              className={'col-span-1 bg-white'}
              placeholder={'Masukkan Nama Lengkap'}
              isRequired
            />
            <TextInput
              name={'no_hp'}
              form={form}
              label={'No.HP'}
              type={'number'}
              htmlFor={'no_np'}
              className={'col-span-1 bg-white'}
              placeholder={'Masukkan No.HP'}
              isRequired
            />
            <TextInput
              name={'kota'}
              form={form}
              label={'Kota/Lembaga Asal'}
              htmlFor={'kota_asal'}
              className={'col-span-2 bg-white'}
              placeholder={'Masukkan Kota / Lembaga Asal'}
              isRequired
            />
            <TextAreaInput
              name={'alamat_lengkap'}
              form={form}
              label={'Alamat Lengkap'}
              htmlFor={'alamat_lengkap'}
              className={'col-span-2 bg-white'}
              placeholder={'Masukan Alamat Lengkap'}
              isRequired
            />
          </div>

          <div className="grid grid-cols-2 gap-5 bg-white p-6 rounded shadow drop-shadow">
            <p className="col-span-2 text-2xl font-semibold">Informasi Kunjungan</p>
            <SelectBasicInput
              name={'id_jenis_keperluan'}
              form={form}
              placeholder={'Jenis Keperluar'}
              label={'Jenis Keperluan'}
              isRequired
              className={'col-span-1 bg-white'}
              data={
                purposeType?.map((row) => ({
                  label: row?.jenis_keperluan,
                  value: row?.id_jenis_keperluan,
                })) ?? []
              }
            />
            <SelectBasicInput
              name={'id_tujuan_bertamu'}
              form={form}
              placeholder={'Tujuan Bertamu'}
              label={'Tujuan Bertamu'}
              isRequired
              className={'col-span-1 bg-white'}
              data={
                purposeGuest?.map((row) => ({
                  label: row?.tujuan_bertamu,
                  value: row?.id_tujuan_bertamu,
                })) ?? []
              }
            />
            <TextAreaInput
              name={'keterangan_bertamu'}
              form={form}
              label={'Keterangan'}
              className={'col-span-2 bg-white'}
              htmlFor={'keterangan'}
              placeholder={'Masukan Keterangan Kegiatan'}
              isRequired
            />

            <UploadPhotoImage
              label={'Foto Tamu'}
              name={'url_foto'}
              ratio_width={1}
              ratio_height={1}
              form={form}
              className={'max-w-[250px]'}
            />
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

export default FormGustBook

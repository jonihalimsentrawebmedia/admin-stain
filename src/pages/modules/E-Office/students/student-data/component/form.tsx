import type { UseFormReturn } from 'react-hook-form'
import type { TResolverStudentData } from '../data/resolver'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetStudyProgram } from '@/pages/modules/E-Office/students/study-program/hooks'
import { UseGetStudentStatus } from '@/pages/modules/E-Office/students/student-status/hooks'
import { UseGetAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/hooks'
import { UseGetReligion } from '@/pages/modules/E-Office/students/religion/hooks'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface props {
  loading: boolean
  form: UseFormReturn<TResolverStudentData>
  HandleSave: (e: TResolverStudentData) => void
}

const FormStudentData = (props: props) => {
  const { loading, form, HandleSave } = props
  const navigate = useNavigate()

  const { studyProgram } = UseGetStudyProgram({ page: '0', limit: '0' })
  const { studentStatus } = UseGetStudentStatus({ page: '0', limit: '0' })
  const { admissionProcess } = UseGetAdmissionProcess({ page: '0', limit: '0' })
  const { religion } = UseGetReligion({ page: '0', limit: '0' })

  const jenisKelaminData = [
    { label: 'Laki-laki', value: 'LAKI_LAKI' },
    { label: 'Perempuan', value: 'PEREMPUAN' },
  ]

  const semesterData = [
    { label: 'Pendek', value: '0' },
    { label: 'Ganjil', value: '1' },
    { label: 'Genap', value: '2' },
  ]

  console.log(form.formState.errors)

  return (
    <>
      <Form {...form}>
        <form
          className={'mt-5 w-full flex flex-col gap-6'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <div className="grid grid-cols-2 gap-4">
            <p className="col-span-2 text-2xl font-semibold">Foto</p>
            <div className="col-span-2">
              <UploadPhotoImage
                form={form}
                name={'url_foto_mahasiswa'}
                label={'Foto Mahasiswa'}
                ratio_width={3}
                ratio_height={4}
                className={'max-w-[240px]'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine
                className={'text-2xl font-semibold text-primary'}
                title={'Data Akademik'}
              />
            </div>

            <TextInput
              name={'nim'}
              form={form}
              label={'NIM'}
              placeholder={'Masukkan NIM'}
              htmlFor={'nim'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
            <TextInput
              name={'nama_mahasiswa'}
              form={form}
              label={'Nama Mahasiswa'}
              placeholder={'Masukkan Nama Mahasiswa'}
              htmlFor={'nama_mahasiswa'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
            <SelectBasicInput
              name={'id_mahasiswa_unit'}
              form={form}
              label={'Program Studi'}
              placeholder={'Pilih Program Studi'}
              data={
                studyProgram?.map((row) => ({
                  label: row.nama_prodi,
                  value: row.id_satuan_organisasi,
                })) ?? []
              }
              className={'col-span-2'}
              usePortal
              isRequired
              isRow
            />
            <SelectBasicInput
              name={'id_mahasiswa_status'}
              form={form}
              label={'Status Mahasiswa'}
              placeholder={'Pilih Status Mahasiswa'}
              data={
                studentStatus?.map((row) => ({
                  label: row.nama,
                  value: row.id_mahasiswa_status,
                })) ?? []
              }
              className={'col-span-1'}
              isRequired
              usePortal
              isRow
            />
            <SelectBasicInput
              name={'angkatan'}
              form={form}
              label={'Angkatan/Tahun Masuk'}
              placeholder={'Masukkan Tahun Angkatan'}
              className={'col-span-1'}
              data={
                Array.from({ length: 10 }, (_, i) => ({
                  label: `${new Date().getFullYear() - i}`,
                  value: `${new Date().getFullYear() - i}`,
                })) ?? []
              }
              isRequired
              usePortal
              isRow
            />
            <SelectBasicInput
              name={'semester_masuk'}
              form={form}
              label={'Semester Masuk'}
              placeholder={'Pilih Semester Masuk'}
              data={semesterData}
              className={'col-span-1'}
              usePortal
              isRequired
              isRow
            />
            <SelectBasicInput
              name={'id_mahasiswa_jalur_masuk'}
              form={form}
              label={'Jalur Masuk'}
              placeholder={'Pilih Jalur Masuk'}
              data={
                admissionProcess?.map((row) => ({
                  label: row.nama,
                  value: row.id_mahasiswa_jalur_masuk,
                })) ?? []
              }
              className={'col-span-1'}
              isRequired
              usePortal
              isRow
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine title={'Data Pribadi'} className={'text-2xl font-semibold text-primary'} />
            </div>

            <TextInput
              name={'nik'}
              form={form}
              label={'NIK'}
              type={'number'}
              placeholder={'Masukkan NIK (16 digit)'}
              htmlFor={'nik'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
            <InputRadio
              name={'jenis_kelamin'}
              form={form}
              label={'Jenis Kelamin'}
              data={jenisKelaminData}
              className={'col-span-2'}
              heightInput={'h-8'}
              isRequired
              isRow
            />

            <SelectBasicInput
              name={'id_mahasiswa_agama'}
              form={form}
              label={'Agama'}
              placeholder={'Pilih Agama'}
              data={
                religion?.map((row) => ({ label: row.nama, value: row.id_mahasiswa_agama })) ?? []
              }
              className={'col-span-2'}
              isRequired
              usePortal
              isRow
            />
            <TextInput
              name={'tempat_lahir'}
              form={form}
              label={'Tempat Lahir'}
              placeholder={'Masukkan Tempat Lahir'}
              htmlFor={'tempat_lahir'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRow
              isRequired
            />

            <TextInput
              name={'tanggal_lahir'}
              form={form}
              label={'Tanggal Lahir'}
              type={'date'}
              htmlFor={'tanggal_lahir'}
              className={'col-span-1'}
              inputClassName={'bg-white'}
              isRow
              isRequired
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine
                title={'Informasi Kontak'}
                className={'text-2xl font-semibold text-primary'}
              />
            </div>
            <TextInput
              name={'no_hp'}
              form={form}
              label={'No Handphone'}
              type={'number'}
              placeholder={'Masukkan No HP'}
              htmlFor={'no_hp'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />

            <TextInput
              name={'email'}
              form={form}
              label={'Email'}
              type={'email'}
              placeholder={'Masukkan Email'}
              htmlFor={'email'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
            <TextAreaInput
              name={'alamat'}
              form={form}
              label={'Alamat'}
              placeholder={'Masukkan Alamat Lengkap'}
              htmlFor={'alamat'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TitleLine
                title={'Informasi Orang Tua & Wali'}
                className={'text-2xl font-semibold text-primary'}
              />
            </div>

            <TextInput
              name={'nama_ayah'}
              form={form}
              label={'Nama Ayah'}
              placeholder={'Masukkan Nama Ayah'}
              htmlFor={'nama_ayah'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
            <TextInput
              name={'nama_ibu'}
              form={form}
              label={'Nama Ibu'}
              placeholder={'Masukkan Nama Ibu'}
              htmlFor={'nama_ibu'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />

            <TextInput
              name={'nama_wali'}
              form={form}
              label={'Nama Wali'}
              placeholder={'Masukkan Nama Wali (opsional)'}
              htmlFor={'nama_wali'}
              className={'col-span-2'}
              inputClassName={'bg-white'}
              isRequired
              isRow
            />
          </div>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

export default FormStudentData

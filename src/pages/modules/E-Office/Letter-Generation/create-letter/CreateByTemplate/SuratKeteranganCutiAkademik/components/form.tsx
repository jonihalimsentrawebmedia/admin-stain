import type { UseFormReturn } from 'react-hook-form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { FaRegEye, FaRegFileAlt } from 'react-icons/fa'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { FiHash } from 'react-icons/fi'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import { Form } from '@/components/ui/form.tsx'
import DialogHumanResources from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectSDM.tsx'
import DialogSelectStudents from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectStudent.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import SelectTemplateText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectTemplate.tsx'
import { RichText } from '@/components/common/richtext'
import type { TResolverSKCAM } from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganCutiAkademik/data/resolver.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import {
  type ILetterTemplateType,
  UseGetPeriodeCuti,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useEffect } from 'react'

interface Props {
  loading: boolean
  HandleSave: (e: TResolverSKCAM) => void
  HandlePreview?: (e: TResolverSKCAM) => void
  form: UseFormReturn<TResolverSKCAM>
  template?: ILetterTemplateType
}

const FormSuratKeteranganCutiAkademik = (props: Props) => {
  const { id } = useParams()
  const { loading, HandleSave, HandlePreview, form, template } = props
  const navigate = useNavigate()
  const formValues = form.watch()
  const isValid = !!(
    formValues.id_nomor_surat_otomatis &&
    formValues.tempat_surat &&
    formValues.tanggal_surat &&
    formValues.id_kop_surat &&
    formValues.id_jenis_template_surat &&
    formValues.id_mahasiswa &&
    formValues.semester_cuti &&
    formValues.tahun_akademik &&
    formValues.periode_cuti !== undefined &&
    formValues.periode_cuti !== null &&
    String(formValues.periode_cuti) !== '' &&
    formValues.alasan_cuti &&
    formValues.penutup &&
    formValues.id_penandatangan &&
    formValues.nama_penandatangan &&
    formValues.jabatan_penandatangan &&
    formValues.id_satuan_kerja_penandatangan
  )
  const { letterHeader } = UseGetLetterHeaderRef()
  const { periode } = UseGetPeriodeCuti({
    periode: form.watch('periode_cuti') ? form.watch('periode_cuti').toString() : '',
    semester_cuti: form.watch('semester_cuti'),
    tahun_pengajuan: form.watch('tahun_pengajuan'),
  })
  const { letterNumber } = UseGetLetterNumberAutomatic({
    page: '0',
    limit: '0',
  })
  const { institution } = UseGetUnitInstitution({
    page: '0',
    limit: '0',
  })

  useEffect(() => {
    if (periode) {
      console.log(periode)
      form.setValue(
        'tahun_akademik',
        `${periode.tahun_akademik_mulai} s.d ${periode.tahun_akademik_selesai}`
      )
    }
  }, [periode])

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={`${template?.nama_jenis_template}`}
            isBack
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () =>
                  navigate(`/modules/e-office/letter-generation/create-letter/create/${id}`),
              },
              ...(HandlePreview
                ? [
                    {
                      type: 'custom' as const,
                      element: (
                        <Button
                          key="preview"
                          type="button"
                          disabled={!isValid}
                          onClick={form.handleSubmit(HandlePreview)}
                          variant={'outline'}
                          className="border-primary text-primary bg-white hover:text-primary"
                        >
                          <FaRegEye />
                          Preview
                        </Button>
                      ),
                    },
                  ]
                : []),
              {
                type: 'save',
                label: 'Simpan',
                isDisabled: loading,
              },
            ]}
          />

          <div className={'space-y-5'}>
            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle className={'text-xl flex items-center gap-1.5'}>
                  <div className="p-1.5 bg-primary text-white rounded">
                    <FaRegFileAlt className={'size-5'} />
                  </div>
                  Kop Surat
                </CardTitle>
                <SelectBasicInput
                  form={form}
                  name={'id_kop_surat'}
                  label={'Pilih Kop Surat'}
                  placeholder={'Pilih Kop Surat'}
                  className={'w-full md:w-1/2'}
                  usePortal
                  data={
                    letterHeader?.map((row) => ({
                      label: row?.nama_unit,
                      value: row?.id_kop_surat,
                    })) ?? []
                  }
                  isRequired
                />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4 w-full'}>
                <CardTitle className={'text-xl flex items-center gap-1.5'}>
                  <div className="p-1.5 rounded bg-primary text-white">
                    <FiHash className={'size-5'} />
                  </div>
                  Penomoran Surat
                </CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SelectBasicInput
                    form={form}
                    name={'id_nomor_surat_otomatis'}
                    placeholder={'Pilih Kode Nomor Surat'}
                    label={'Pilih Kode Nomor Surat'}
                    usePortal
                    isRequired
                    fx={() => {
                      form.setValue('nomor_urut_manual', null)
                    }}
                    data={
                      letterNumber?.map((row) => ({
                        label: row?.nama_nomor_surat,
                        value: row?.id_nomor_surat_otomatis,
                      })) ?? []
                    }
                  />
                  <TextInput
                    form={form}
                    name={'tempat_surat'}
                    label={'Tempat Surat'}
                    placeholder={'Tempat Surat'}
                    htmlFor={'tempat_surat'}
                    isRequired
                  />
                  <TextInput
                    form={form}
                    name={'tanggal_surat'}
                    label={'Tanggal Surat'}
                    type={'date'}
                    htmlFor={'tanggal_surat'}
                    isRequired
                  />
                </div>

                <ReturnOrderData
                  form={form}
                  date={form.watch('tanggal_surat')}
                  name={'nomor_urut_manual'}
                  id={form.watch('id_nomor_surat_otomatis')}
                />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4 w-full'}>
                <CardTitle className={'text-xl flex items-center gap-1.5'}>
                  1. Penandatangan
                </CardTitle>
                <DialogHumanResources form={form} />
                <div className="space-y-4">
                  <TextInput
                    name={'nama_penandatangan'}
                    form={form}
                    label={'Nama'}
                    placeholder={`Nama Penandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'nama_penandatangan'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    name={'nip_penandatangan'}
                    form={form}
                    label={'NIP'}
                    placeholder={`NIP Penandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'nip'}
                    type={'number'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    name={'nidn_penandatangan'}
                    form={form}
                    label={'NIDN'}
                    placeholder={`NIDN Penandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'NIDN'}
                    type={'number'}
                    isRow
                    isRequired
                  />

                  <TextInput
                    name={'jabatan_penandatangan'}
                    form={form}
                    label={'Jabatan'}
                    placeholder={`jabatan Penandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'jabatan'}
                    isRow
                    isRequired
                  />

                  <SelectBasicInput
                    name={'id_satuan_kerja_penandatangan'}
                    form={form}
                    placeholder={`Satuan Kerja Penandatangan ${template?.nama_jenis_template ?? ''}`}
                    label={'Satuan Kerja'}
                    data={
                      institution?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                    isRequired
                    isRow
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4 w-full'}>
                <CardTitle className={'text-xl flex items-center gap-1.5'}>2. Mahasiswa</CardTitle>
                <DialogSelectStudents form={form} />
                <div className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-5">
                  <p>Nama *</p>
                  {form.watch('nama_mahasiswa') ?? '-'}
                  <p>NPM/NIM *</p>
                  {form.watch('nim') ?? '-'}
                  <p>Program Studi *</p>
                  {form.watch('prodi') ?? '-'}
                  <p>Fakultas *</p>
                  {form.watch('Fakultas') ?? '-'}
                  <p>Jenjang *</p>
                  {form.watch('jenjang') ?? '-'}
                </div>
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>3. Informasi Cuti</CardTitle>
                <div className="space-y-4">
                  <TextInput
                    name={'tahun_pengajuan'}
                    form={form}
                    className={'w-full md:w-1/2'}
                    label={'Tahun Pengajuan'}
                    placeholder={'Tahun Pengajuan'}
                    type={'number'}
                    isRow
                    isRequired
                  />
                  <InputRadio
                    form={form}
                    name={'semester_cuti'}
                    label={'Semester Cuti'}
                    data={[
                      { label: 'Ganjil', value: 'Ganjil' },
                      { label: 'Genap', value: 'Genap' },
                    ]}
                    isRow
                    isRequired
                  />
                  <div className={'flex items-center gap-2'}>
                    <TextInput
                      name={'periode_cuti'}
                      form={form}
                      label={'Periode Cuti'}
                      type={'number'}
                      className={'w-full md:w-[360px]'}
                      placeholder={'Periode Cuti'}
                      htmlFor={'periode_cuti'}
                      isNumber
                      isRow
                      isRequired
                    />
                    <p>Semester</p>
                  </div>
                  <TextInput
                    form={form}
                    isDisabled
                    name={'tahun_akademik'}
                    label={'Tahun Akademik'}
                    placeholder={'Tahun Akademik'}
                    htmlFor={'tahun_akademik'}
                    isRequired
                    isRow
                  />
                  <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-5'}>
                    <div />
                    <div className={'flex items-center gap-2 text-sm text-gray-500'}>
                      {periode &&
                        periode?.semester_list &&
                        periode?.semester_list?.map((row, k) => <p key={k}>{row?.label}</p>)}
                    </div>
                  </div>

                  <TextAreaInput
                    form={form}
                    name={'alasan_cuti'}
                    label={'Alasan Cuti'}
                    placeholder={'Alasan Cuti'}
                    htmlFor={'alasan_cuti'}
                    isRequired
                    isRow
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>4. Penutup</CardTitle>
                <div className="relative">
                  <SelectTemplateText kode={'SKCA-1'} form={form} name={'penutup'} />
                  <RichText
                    form={form}
                    name={'penutup'}
                    label={'Penutup'}
                    placeholder={'Tuliskan Penutup'}
                    showLabel={true}
                    required
                    isRow
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () =>
                  navigate(`/modules/e-office/letter-generation/create-letter/create/${id}`),
              },
              ...(HandlePreview
                ? [
                    {
                      type: 'custom' as const,
                      element: (
                        <Button
                          key="preview"
                          type="button"
                          disabled={!isValid}
                          onClick={form.handleSubmit(HandlePreview)}
                          variant={'outline'}
                          className="border-primary text-primary bg-white hover:text-primary"
                        >
                          <FaRegEye />
                          Preview
                        </Button>
                      ),
                    },
                  ]
                : []),
              {
                type: 'save',
                label: 'Simpan',
                isDisabled: loading,
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
export default FormSuratKeteranganCutiAkademik

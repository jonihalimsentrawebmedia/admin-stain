import type { ILetterTemplateType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import type { UseFormReturn } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { FaRegEye, FaRegFileAlt } from 'react-icons/fa'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FiHash } from 'react-icons/fi'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { Form } from '@/components/ui/form.tsx'
import DialogSelectStudents from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectStudent.tsx'
import DialogHumanResources from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectSDM.tsx'
import SelectTemplateText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectTemplate.tsx'
import { RichText } from '@/components/common/richtext'
import type { TResolverSRB } from '../data/resolver.tsx'

interface Props {
  loading: boolean
  HandleSave: (value: TResolverSRB) => void
  HandlePreview?: (e: TResolverSRB) => void
  template?: ILetterTemplateType
  form: UseFormReturn<TResolverSRB>
}

const FormSuratRekomendasiBeasiswa = (props: Props) => {
  const { id } = useParams()
  const { loading, HandleSave, HandlePreview, template, form } = props
  const navigate = useNavigate()
  const formValues = form.watch()
  const isValid = !!(
    formValues.id_nomor_surat_otomatis &&
    formValues.tempat_surat &&
    formValues.tanggal_surat &&
    formValues.id_kop_surat &&
    formValues.id_jenis_template_surat &&
    formValues.id_mahasiswa &&
    formValues.ipk &&
    formValues.penutup &&
    formValues.id_penandatangan &&
    formValues.nama_penandatangan &&
    formValues.jabatan_penandatangan &&
    formValues.id_satuan_kerja_penandatangan
  )
  const { letterHeader } = UseGetLetterHeaderRef()
  const { letterNumber } = UseGetLetterNumberAutomatic({
    page: '0',
    limit: '0',
  })
  const { institution } = UseGetUnitInstitution({
    page: '0',
    limit: '0',
  })

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
                  className={'w-1/2'}
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
                <div className="grid grid-cols-3 gap-4">
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
                <CardTitle className={'text-xl flex items-center gap-1.5'}>1. Mahasiswa</CardTitle>
                <DialogSelectStudents form={form} />
                <div className="grid grid-cols-[12rem_1fr] gap-5">
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
                  <p>Semester *</p>
                  {form.watch('semester') ?? '-'}
                </div>
                <TextInput
                  form={form}
                  name={'ipk'}
                  label={'IPK'}
                  placeholder={'IPK Mahasiswa. Max 4,00'}
                  max={4}
                  type={'number'}
                  isNumber
                  isRequired
                  isRow
                />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>2. Penutup</CardTitle>
                <div className="relative">
                  <SelectTemplateText
                    id_jenis_surat={template?.id_jenis_surat}
                    kode={'SKBA-1'}
                    form={form}
                    name={'penutup'}
                  />
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

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4 w-full'}>
                <CardTitle className={'text-xl flex items-center gap-1.5'}>
                  3. Penandatangan
                </CardTitle>
                <DialogHumanResources form={form} />
                <div className="space-y-4">
                  <TextInput
                    name={'nama_penandatangan'}
                    form={form}
                    label={'Nama'}
                    placeholder={`Nama Penandatangan ${template?.nama_jenis_template}`}
                    htmlFor={'nama_penandatangan'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    name={'nip_penandatangan'}
                    form={form}
                    label={'NIP'}
                    placeholder={`NIP Penandatangan ${template?.nama_jenis_template}`}
                    htmlFor={'nip'}
                    type={'number'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    name={'nidn_penandatangan'}
                    form={form}
                    label={'NIDN'}
                    placeholder={`NIDN Penandatangan ${template?.nama_jenis_template}`}
                    htmlFor={'NIDN'}
                    type={'number'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    name={'jabatan_penandatangan'}
                    form={form}
                    label={'Jabatan'}
                    placeholder={`Jabatan Penandatangan ${template?.nama_jenis_template}`}
                    htmlFor={'jabatan'}
                    isRow
                    isRequired
                  />
                  <SelectBasicInput
                    name={'id_satuan_kerja_penandatangan'}
                    form={form}
                    placeholder={`Pilih Satuan Kerja ${template?.nama_jenis_template}`}
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
          </div>

          <ButtonTitleGroup
            label={``}
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

export default FormSuratRekomendasiBeasiswa

import type { UseFormReturn } from 'react-hook-form'
import type { ILetterTemplateType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { FaRegEye, FaRegFileAlt } from 'react-icons/fa'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { FiHash } from 'react-icons/fi'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { RichText } from '@/components/common/richtext'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import SelectTemplateText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectTemplate.tsx'
import { Form } from '@/components/ui/form.tsx'
import DialogHumanResources from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectSDM.tsx'
import type { TResolverKKN } from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarKKN/data/resolver.tsx'
import SelectMultiStudent from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL/components/SelectMultiStudent.tsx'
import SelectMultiDosen from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarKKN/components/SelectMultiDosen.tsx'

interface Props {
  loading: boolean
  HandleSave: (e: TResolverKKN) => void
  HandlePreview?: (e: TResolverKKN) => void
  form: UseFormReturn<TResolverKKN>
  template?: ILetterTemplateType
}

const FormSuratPengantarKKN = (props: Props) => {
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
    formValues.lampiran !== undefined &&
    formValues.lampiran !== null &&
    String(formValues.lampiran) !== '' &&
    formValues.perihal &&
    formValues.nama_desa &&
    formValues.kecamatan &&
    formValues.kabupaten &&
    formValues.masukan_di &&
    formValues.pembuka &&
    formValues.id_mahasiswa?.length &&
    formValues.tanggal_mulai &&
    formValues.tanggal_selesai &&
    formValues.id_dpl?.length &&
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
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>1. Pembuka</CardTitle>
                <div className="flex items-center gap-1.5">
                  <TextInput
                    form={form}
                    label={'Lampiran'}
                    placeholder={'Jumlah Lampiran'}
                    className={'w-full md:w-1/2'}
                    htmlFor={'lampiran'}
                    name={'lampiran'}
                    type={'number'}
                    isNumber
                    isRequired
                    isRow
                  />
                  <p>Lembar</p>
                </div>

                {form.watch('lampiran') > 0 && (
                  <>
                    {Array.from({ length: form.watch('lampiran') }).map((_, index) => (
                      <RichText
                        key={index}
                        form={form}
                        name={`detail_lampiran.${index}`}
                        label={`Detail Lampiran ${index + 1}`}
                        placeholder={`Isi Lampiran ${index + 1}`}
                        isRow
                        showLabel
                        required
                      />
                    ))}
                  </>
                )}

                <TextAreaInput
                  form={form}
                  name={'perihal'}
                  label={'Perihal'}
                  placeholder={'Perihal'}
                  htmlFor={'perihal'}
                  inputClassName={'rounded'}
                  isRow
                  isRequired
                />
                <TextInput
                  form={form}
                  name={'nama_desa'}
                  label={'Nama Desa'}
                  placeholder={'Nama Desa'}
                  htmlFor={'nama_desa'}
                  inputClassName={'rounded'}
                  isRow
                  isRequired
                />

                <TextInput
                  form={form}
                  name={'kecamatan'}
                  label={'Kecamatan'}
                  placeholder={'Nama Kecamatan'}
                  htmlFor={'kecamatan'}
                  inputClassName={'rounded'}
                  isRow
                  isRequired
                />

                <TextInput
                  form={form}
                  name={'kabupaten'}
                  label={'Kabupaten/Kota'}
                  placeholder={'Nama Kabupaten/Kota'}
                  htmlFor={'kabupaten_kota'}
                  inputClassName={'rounded'}
                  isRow
                  isRequired
                />

                <TextInput
                  name={'masukan_di'}
                  form={form}
                  label={'Di '}
                  placeholder={'Cth: Ditempat'}
                  htmlFor={'di'}
                  className={'w-full md:w-1/2'}
                  isRequired
                  isRow
                />
                <div className="relative">
                  <SelectTemplateText kode={'SPK-1'} form={form} name={'pembuka'} />
                  <RichText
                    form={form}
                    name={'pembuka'}
                    label={'Pembuka'}
                    placeholder={'Tuliskan Pembuka'}
                    showLabel={true}
                    required
                    isRow
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>2. Informasi KKN</CardTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mt-5">
                  <TextInput
                    name={'tanggal_mulai'}
                    form={form}
                    label={'Tanggal Mulai'}
                    htmlFor={'tanggal_mulai'}
                    type={'date'}
                    isRequired
                    isRow
                  />
                  <TextInput
                    min={form.watch('tanggal_mulai')}
                    name={'tanggal_selesai'}
                    form={form}
                    label={'Tanggal Selesai'}
                    htmlFor={'tanggal_selesai'}
                    type={'date'}
                    isRequired
                    isRow
                  />
                </div>

                <p className="text-lg font-semibold">Dosen Pembimbing Lapanga (DPL)</p>
                <SelectMultiDosen form={form} />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>3. Mahasiswa</CardTitle>
                <SelectMultiStudent form={form} />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>4. Penutup</CardTitle>
                <div className="relative">
                  <SelectTemplateText kode={'SPK-1'} form={form} name={'penutup'} />
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
                  5. Penandatangan
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
                    usePortal
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

export default FormSuratPengantarKKN

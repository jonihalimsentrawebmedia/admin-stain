import type { UseFormReturn } from 'react-hook-form'
import type { ILetterTemplateType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { FaRegEye, FaRegFileAlt } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { FiHash } from 'react-icons/fi'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { Form } from '@/components/ui/form.tsx'
import SelectTemplateText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectTemplate.tsx'
import { RichText } from '@/components/common/richtext'
import DialogHumanResources from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectSDM.tsx'
import SelectMultiStudent from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL/components/SelectMultiStudent.tsx'
import type { TResolverSPO } from '../data/resolver.tsx'

interface props {
  loading: boolean
  HandleSave: (e: TResolverSPO) => void
  HandlePreview?: (e: TResolverSPO) => void
  form: UseFormReturn<TResolverSPO>
  template?: ILetterTemplateType
}

const FormSuratPengantarObservasi = (props: props) => {
  const { loading, HandleSave, HandlePreview, form, template } = props
  const { id } = useParams()
  const navigate = useNavigate()
  const formValues = form.watch()
  const isValid = !!(
    formValues.id_nomor_surat_otomatis &&
    formValues.tempat_surat &&
    formValues.tanggal_surat &&
    formValues.id_kop_surat &&
    formValues.id_jenis_template_surat &&
    formValues.id_mahasiswa?.length &&
    formValues.id_fakultas &&
    formValues.id_prodi &&
    formValues.tanggal_observasi &&
    formValues.waktu_observasi &&
    formValues.tempat_observasi &&
    formValues.topik_observasi &&
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
  const { institution: Faculty } = UseGetUnitInstitution({
    page: '0',
    limit: '0',
    kelompok: 'FAKULTAS',
  })
  const { institution: prodi } = UseGetUnitInstitution({
    page: '0',
    limit: '0',
    kelompok: 'PRODI',
    parent_id: form.watch('id_fakultas'),
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
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>1. Mahasiswa</CardTitle>
                <SelectMultiStudent form={form} />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>2. Prodi & Fakultas</CardTitle>
                <div className="flex flex-col gap-5">
                  <SelectBasicInput
                    name={'id_fakultas'}
                    form={form}
                    placeholder={'Pilih Fakultas'}
                    label={'Fakultas'}
                    usePortal
                    isRow
                    isRequired
                    data={
                      Faculty?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                  />
                  <SelectBasicInput
                    name={'id_prodi'}
                    form={form}
                    placeholder={'Pilih Program studi'}
                    label={'Program studi'}
                    isDisabled={!form.watch('id_fakultas')}
                    usePortal
                    isRow
                    isRequired
                    data={
                      prodi?.map((row) => ({
                        label: row?.nama,
                        value: row?.id_satuan_organisasi,
                      })) ?? []
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>3. Informasi Pelaksanaan Observasi</CardTitle>
                <TextInput
                  name={'tanggal_observasi'}
                  form={form}
                  label={'Tanggal Observasi'}
                  type={'date'}
                  htmlFor={'tanggal_observasi'}
                  isRequired
                  isRow
                />
                <TextInput
                  name={'waktu_observasi'}
                  form={form}
                  label={'Waktu Observasi'}
                  placeholder={'Contoh: 08.00 - 10.00'}
                  htmlFor={'Waktu_observasi'}
                  isRequired
                  isRow
                />
                <TextInput
                  name={'tempat_observasi'}
                  form={form}
                  label={'Tempat Observasi'}
                  placeholder={'Tempat Observasi'}
                  htmlFor={'Tempat_observasi'}
                  isRequired
                  isRow
                />
                <TextInput
                  name={'topik_observasi'}
                  form={form}
                  label={'Topik Observasi'}
                  placeholder={'Topik Observasi'}
                  htmlFor={'topik_observasi'}
                  isRequired
                  isRow
                />
              </CardContent>
            </Card>

            <Card className={'p-2'}>
              <CardContent className={'p-2 space-y-4'}>
                <CardTitle>4. Penutup</CardTitle>
                <div className="relative">
                  <SelectTemplateText kode={'SPO-1'} form={form} name={'penutup'} />
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
                    placeholder={`Nama Penaandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'nama_penandatangan'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    name={'nidn_penandatangan'}
                    form={form}
                    label={'NIDN'}
                    placeholder={`NIDN Penaandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'NIDN'}
                    type={'number'}
                    isRow
                    isRequired
                  />

                  <TextInput
                    name={'jabatan_penandatangan'}
                    form={form}
                    label={'Jabatan'}
                    placeholder={`jabatan Penaandatangan ${template?.nama_jenis_template ?? ''}`}
                    htmlFor={'jabatan'}
                    isRow
                    isRequired
                  />

                  <SelectBasicInput
                    name={'id_satuan_kerja_penandatangan'}
                    form={form}
                    placeholder={`Pilih Satuan Kerja ${template?.nama_jenis_template ?? ''}`}
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

export default FormSuratPengantarObservasi

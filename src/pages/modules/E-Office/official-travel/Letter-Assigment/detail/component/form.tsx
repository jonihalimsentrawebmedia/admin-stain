import type { UseFormReturn } from 'react-hook-form'
import { type Dispatch, type SetStateAction } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { Form } from '@/components/ui/form.tsx'
import type { TResolverSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/resolver.tsx'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { UseGetTransportType } from '@/pages/modules/E-Office/reference/transport-type/hooks'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { IDetailSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'

interface props {
  form: UseFormReturn<TResolverSPPD>
  loading: boolean
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: TResolverSPPD) => void
  data?: IDetailSPPD
}

const FormSPPDLetterAssigment = (props: props) => {
  const { form, loading, isEdit, setIsEdit, HandleSave, data } = props
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution()
  const { letterNumber } = UseGetLetterNumberAutomatic({
    page: '0',
    limit: '0',
  })
  const { humanResource } = UseGetHumanResource({
    page: '0',
    limit: '0',
  })
  const { transportType } = UseGetTransportType({
    page: '0',
    limit: '0',
  })

  return (
    <>
      <Form {...form}>
        <form className={'space-y-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <Card className={'rounded shadow-none border'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>Informasi SPPD</CardTitle>
              <Card className={'bg-blue-100 rounded shadow-none'}>
                <CardContent className={'space-y-4'}>
                  <CardTitle>Kop Surat</CardTitle>
                  <SelectBasicInput
                    form={form}
                    name={'id_kop_surat'}
                    label={'Pilih Kop Surat'}
                    placeholder={'Pilih Kop Surat'}
                    className={'w-1/3'}
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
              <Card className={'bg-blue-100 rounded shadow-none'}>
                <CardContent className={'space-y-4'}>
                  <CardTitle>Penomoran Surat</CardTitle>
                  <div className="flex gap-4 items-center max-w-2/3">
                    <SelectBasicInput
                      form={form}
                      name={'id_nomor_surat_otomatis'}
                      label={'Pilih Kode Nomor Surat*'}
                      placeholder={'Pilih Kode Nomor Surat*'}
                      className={'w-full'}
                      usePortal
                      data={
                        letterNumber?.map((row) => ({
                          label: row?.nama_nomor_surat,
                          value: row?.id_nomor_surat_otomatis,
                        })) ?? []
                      }
                      isRequired
                    />
                    <TextInput
                      name={'tanggal_surat'}
                      form={form}
                      label={'Tanggal Surat'}
                      type={'date'}
                      className={'w-full'}
                      inputClassName={'bg-white'}
                      htmlFor={'tanggal_surat'}
                      isRequired
                    />
                  </div>
                  <ReturnOrderData
                    form={form}
                    name={'nomor_urut_manual'}
                    id={form.watch('id_nomor_surat_otomatis')}
                  />
                </CardContent>
              </Card>
              <div className={'space-y-4'}>
                <SelectBasicInput
                  form={form}
                  name={'id_unit'}
                  label={'Instansi / Satuan Kerja'}
                  placeholder={'Pilih Unit'}
                  usePortal
                  isRow
                  isRequired
                  data={
                    institution?.map((row) => ({
                      label: row?.nama,
                      value: row?.id_satuan_organisasi,
                    })) ?? []
                  }
                />
                <TextInput
                  form={form}
                  name={'akun'}
                  label={'Akun'}
                  placeholder={'Masukkan Nama Akun'}
                  htmlFor={'akun'}
                  inputClassName={'bg-white'}
                  isRow
                  isRequired
                />
                <TextInput
                  form={form}
                  name={'lain_lain'}
                  label={'Lain-Lain'}
                  placeholder={'Masukkan lain-lain '}
                  htmlFor={'other'}
                  inputClassName={'bg-white'}
                  isRow
                  isRequired
                />
                <SelectBasicInput
                  form={form}
                  name={'disahkan_oleh'}
                  label={'Penandatangan'}
                  placeholder={'Pilih Penandatangan'}
                  isRow
                  usePortal
                  isRequired
                  data={
                    humanResource?.map((row) => ({
                      label: row?.nama,
                      value: row?.id_sdm,
                    })) ?? []
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className={'rounded shadow-none'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>Informasi Keberangkatan Pegawai</CardTitle>
              <SelectBasicInput
                form={form}
                name={'id_jenis_transportasi'}
                label={'Jenis Transportasi'}
                placeholder={'Pilih Jenis Transportasi'}
                isRequired
                isRow
                data={
                  transportType?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_jenis_transportasi,
                  })) ?? []
                }
              />
              <div className="flex items-center gap-4">
                <TextInput
                  name={'tempat_asal'}
                  form={form}
                  label={'Tempat Asal'}
                  placeholder={'Masukkan Tempat Asal'}
                  htmlFor={'tempat_asal'}
                  inputClassName={'bg-white w-full'}
                  className={'w-full'}
                  isRow
                  isRequired
                />
                <TextInput
                  name={'tempat_tujuan'}
                  form={form}
                  label={'Tempat Tujuan'}
                  placeholder={'Masukkan Tempat Tujuan'}
                  htmlFor={'tempat_tujuan'}
                  inputClassName={'bg-white w-full'}
                  className={'w-full'}
                  isRow
                  isRequired
                />
              </div>
              <TextAreaInput
                name={'maksud_kegiatan'}
                form={form}
                label={'Maksud Kegiatan'}
                placeholder={'Masukkan Maksud Kegiatan'}
                htmlFor={'maksud_kegiatan'}
                inputClassName={'bg-white w-full'}
                className={'w-full'}
                isRow
                isRequired
              />
            </CardContent>
          </Card>

          {data?.sppd_pegawai && (
            <Card className={'rounded shadow-none'}>
              <CardContent className={'space-y-4'}>
                <CardTitle>Informasi Keberangkatan Pegawai</CardTitle>

                <Table className={'w-full'}>
                  <TableHeader className={'bg-primary text-white w-full'}>
                    <TableRow className={'hover:bg-primary w-full'}>
                      <TableHead className={'w-[5%] text-white  text-center'}>No</TableHead>
                      <TableHead className={'text-white text-start w-full'}>Pegawai</TableHead>
                      <TableHead className={'text-white text-center w-full'}>
                        Tanggal Berangkat
                      </TableHead>
                      <TableHead className={'text-white text-center w-full'}>
                        Tanggal Pulang
                      </TableHead>
                      <TableHead className={'text-white text-center w-full'}>No SPPD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.sppd_pegawai?.map((row, index) => (
                      <TableRow key={row.id_mail_surat_tugas_pegawai} className={'w-full'}>
                        <TableCell className={'w-[5%] text-center'}>{index + 1}</TableCell>
                        <TableCell className={'text-start w-full'}>
                          <p>{row?.nama_lengkap}</p>
                          <p>{row?.nip}</p>
                          <p></p>
                        </TableCell>
                        <TableCell className={'text-center w-full'}>
                          <TextInput
                            type={'date'}
                            isRow
                            className="[&>label]:hidden w-full"
                            inputClassName={'w-full'}
                            name={`sppd_pegawai.${index}.tanggal_berangkat`}
                            form={form}
                          />
                        </TableCell>
                        <TableCell className={'text-center w-full'}>
                          <TextInput
                            type={'date'}
                            isRow
                            className="[&_label]:hidden text-center flex! flex-row items-center"
                            inputClassName={'w-full'}
                            name={`sppd_pegawai.${index}.tanggal_pulang`}
                            form={form}
                          />
                        </TableCell>
                        <TableCell className={'text-center w-full'}>
                          <div className="w-full">
                            <TextInput
                              isRow
                              label={'babi'}
                              placeholder={'No. SPD'}
                              className="[&_label]:hidden text-center flex! flex-row items-center w-full"
                              inputClassName={'w-full min-w-[300px]'}
                              name={`sppd_pegawai.${index}.no_spd`}
                              form={form}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
        </form>
      </Form>
    </>
  )
}
export default FormSPPDLetterAssigment

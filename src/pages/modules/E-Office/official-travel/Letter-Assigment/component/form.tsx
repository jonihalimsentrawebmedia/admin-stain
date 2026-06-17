import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import type { TResolverLetterTask } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/resolver.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import ButtonUserAssignment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/ButtonAssignment.tsx'
import EmployeeTable from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/tableData.tsx'

interface Props {
  form: UseFormReturn<TResolverLetterTask>
  loading: boolean
  HandleSave: (e: TResolverLetterTask) => void
}

const FormLetterTask = (props: Props) => {
  const { form, loading, HandleSave } = props
  const { letterHeader } = UseGetLetterHeaderRef()
  const { humanResource } = UseGetHumanResource({
    page: '0',
    limit: '0',
  })
  const { letterNumber } = UseGetLetterNumberAutomatic({
    page: '0',
    limit: '0',
  })

  const SuratTugas = useFieldArray({
    control: form.control,
    name: 'dasar_surat_tugas',
  } as any)
  const FormActivty = useFieldArray({
    control: form.control,
    name: 'kegiatan',
  } as any)

  useEffect(() => {
    if (SuratTugas?.fields.length === 0) {
      SuratTugas.append('')
    }
    if (FormActivty.fields.length === 0) {
      FormActivty.append('')
    }
  }, [SuratTugas, FormActivty])

  console.log(form.formState.errors)
  console.log(form.watch('pegawai'))

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <Card className={'bg-blue-100 rounded'}>
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
          <Card className={'bg-blue-100 rounded'}>
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
                date={form.watch('tanggal_surat')}
                form={form}
                name={'nomor_urut_manual'}
                id={form.watch('id_nomor_surat_otomatis')}
              />
            </CardContent>
          </Card>

          <Card className={'bg-blue-100 rounded'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>Dasar Surat Tugas</CardTitle>
              {SuratTugas.fields.map((field, index) => (
                <div key={field.id} className={'flex items-center gap-1.5 w-full'}>
                  <TextInput
                    htmlFor={`dasar_surat_tugas.${index}`}
                    form={form}
                    className={'w-full'}
                    inputClassName={'bg-white'}
                    name={`dasar_surat_tugas.${index}`}
                    label={`Dasar Surat Tugas ${index + 1}`}
                    placeholder={`Tulis Dasar Surat Tugas ke-${index + 1}`}
                    isRow
                    isRequired
                  />
                  {SuratTugas.fields.length > 1 && (
                    <button
                      type={'button'}
                      onClick={() => SuratTugas.remove(index)}
                      className={'p-1.5 text-red-500'}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <p className="text-red-500 text-xs col-span-2 ml-[212px]">
                NB:Isi Dasar Surat Tugas untuk Menambah list
              </p>

              <Button className={'text-white'} type="button" onClick={() => SuratTugas.append('')}>
                Tambah Dasar Surat Tugas
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-2xl font-semibold">
              Surat Tugas ini berlaku pada tanggal dibawah ini:
            </p>
            <div className="flex items-center gap-5 w-full">
              <TextInput
                name={'tanggal_mulai'}
                className={'w-full'}
                form={form}
                label={'Tanggal Mulai Kegiatan'}
                type={'date'}
                htmlFor={'tanggal_mulai'}
                inputClassName={'bg-white'}
                isRequired
                isRow
              />
              <TextInput
                name={'tanggal_akhir'}
                form={form}
                label={'Tanggal Akhir Kegiatan'}
                type={'date'}
                className={'w-full'}
                htmlFor={'tangal_akhir'}
                inputClassName={'bg-white'}
                isRequired
                isRow
              />
            </div>
            <TextInput
              name={'tempat_kegiatan'}
              form={form}
              label={'Tempat Kegiatan'}
              className={'w-full'}
              htmlFor={'tempat Kegiatan'}
              inputClassName={'bg-white'}
              placeholder={'Masukkan Tempat Kegiatan'}
              isRequired
              isRow
            />
          </div>

          <Card className={'bg-blue-100 rounded'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>Memberikan Tugas Kepada Pegawai Berikut Ini.</CardTitle>
              <ButtonUserAssignment form={form} name={'pegawai'} />
              {!!form?.watch('pegawai') && (
                <EmployeeTable
                  data={(form.watch('pegawai') as any) ?? []}
                  onDelete={(index) => {
                    const data = form.watch('pegawai')
                    const temp = data.filter((_, i) => i !== index)
                    form.setValue('pegawai', temp)
                  }}
                  onChangeJabatan={(index, value) => {
                    const data = [...form.getValues('pegawai')]
                    const temp = [...data]
                    temp[index] = {
                      ...temp[index],
                      jabatan_pegawai: value,
                    }
                    form.setValue('pegawai', temp)
                  }}
                />
              )}
            </CardContent>
          </Card>

          <Card className={'bg-blue-100 rounded'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>Untuk Kegiatan Sebagai Berikut</CardTitle>
              {FormActivty.fields.map((field, index) => (
                <div key={field.id} className={'flex items-center gap-1.5 w-full'}>
                  <TextInput
                    htmlFor={`kegiatan.${index}`}
                    form={form}
                    className={'w-full'}
                    inputClassName={'bg-white'}
                    name={`kegiatan.${index}`}
                    label={`Kegiatan Ke - ${index + 1}`}
                    placeholder={`Tulis kegiatan ke-${index + 1}`}
                    isRow
                    isRequired
                  />
                  {FormActivty.fields.length > 1 && (
                    <button
                      type={'button'}
                      onClick={() => FormActivty.remove(index)}
                      className={'p-1.5 text-red-500'}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <p className="text-red-500 text-xs col-span-2 ml-[212px]">
                NB:Isi Kegiatan untuk Menambah list
              </p>

              <Button className={'text-white'} type="button" onClick={() => FormActivty.append('')}>
                Tambah Kegiatan
              </Button>
            </CardContent>
          </Card>

          <SelectBasicInput
            form={form}
            name={'disahkan_oleh'}
            label={'Penandatangan'}
            placeholder={'Pilih Penandatangan'}
            isRequired
            isRow
            usePortal
            data={humanResource?.map((row) => ({
              value: row?.id_sdm,
              label: row?.nama,
            }))}
          />

          <ButtonForm loading={loading} />
        </form>
      </Form>
    </>
  )
}

export default FormLetterTask

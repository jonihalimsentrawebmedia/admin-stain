import { useEffect } from 'react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import type { TLetterInvitationSchema } from '../data/resolver.tsx'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import SelectTemplateText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectTemplate.tsx'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import { Label } from '@/components/ui/label.tsx'
import { FaRegFileAlt, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { FiHash } from 'react-icons/fi'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { ILetterTemplateType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'

interface props {
  form: UseFormReturn<TLetterInvitationSchema>
  loading: boolean
  HandleSave: (value: TLetterInvitationSchema) => void
  template?: ILetterTemplateType
}

const FormCreateLetterCustomize = (props: props) => {
  const { form, loading, HandleSave, template } = props
  const { id } = useParams()
  const navigate = useNavigate()
  const { letterHeader } = UseGetLetterHeaderRef()
  const { humanResource } = UseGetHumanResource()
  const { letterNumber } = UseGetLetterNumberAutomatic({
    page: '0',
    limit: '0',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'agenda',
  } as any)
  const CCFieldValue = useFieldArray({
    control: form.control,
    name: 'tembusan',
  } as any)

  useEffect(() => {
    if (fields.length === 0) {
      append('')
    }
    if (CCFieldValue?.fields.length === 0) {
      CCFieldValue.append('')
    }
  }, [fields.length, CCFieldValue?.fields.length])

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={`Surat ${template?.nama_jenis_template}`}
            isBack
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () =>
                  navigate(`/modules/e-office/letter-generation/create-letter/create/${id}`),
              },
              {
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

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
                id={form.watch('id_nomor_surat_otomatis') ?? ''}
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
                  className={'w-1/2'}
                  htmlFor={'lampiran'}
                  name={'lampiran'}
                  type={'number'}
                  isNumber
                  isRequired
                  isRow
                />
                <p>Lembar</p>
              </div>

              {form.watch('lampiran') && (
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

              <InputRadio
                form={form}
                label={'Yth lebih dari 1?'}
                name={'is_yth_lebih_dari_satu'}
                data={[
                  { value: true, label: 'Ya' },
                  { value: false, label: 'Tidak' },
                ]}
                isRow
                isRequired
              />

              {form?.watch('is_yth_lebih_dari_satu') && !!form.watch('is_yth_lebih_dari_satu') ? (
                <>
                  <RichText
                    form={form}
                    name={'yang_terhormat'}
                    label={'Yang Terhormat'}
                    placeholder={
                      'Contoh:\n' +
                      'Rektor STAIN MADINA\n' +
                      'WAREK I STAIN MADINA\n' +
                      'WAREK II STAIN MADINA\n' +
                      'DST...'
                    }
                    required
                    isRow
                  />
                </>
              ) : (
                <>
                  <SelectBasicInput
                    name={'yang_terhormat'}
                    form={form}
                    placeholder={'Yang Terhormat'}
                    label={'Yang Terhormat'}
                    className={'w-1/2'}
                    isRequired
                    isRow
                    data={[
                      { label: 'Bapak', value: 'Bapak' },
                      { label: 'Ibu', value: 'Ibu' },
                      { label: 'Bapak/Ibu', value: 'Bapak/Ibu' },
                    ]}
                  />
                </>
              )}
              <TextInput
                name={'di'}
                form={form}
                label={'Di'}
                placeholder={'Cth: Ditempat'}
                htmlFor={'di'}
                isRequired
                isRow
              />
              <div className="relative">
                <SelectTemplateText kode={'U-1'} form={form} name={'pembuka'} />
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
              <CardTitle>2. Isi Surat</CardTitle>
              <div className="flex items-center gap-1.5">
                <TextInput
                  name={'hari_mulai'}
                  form={form}
                  label={'Hari'}
                  type={'date'}
                  htmlFor={'hari_mulai'}
                  isRequired
                  isRow
                />
                {!!form.watch('is_lebih_dari_satu_hari') && (
                  <>
                    <p>s/d</p>
                    <TextInput
                      name={'hari_akhir'}
                      form={form}
                      label={'Hari'}
                      className={'[&>label]:hidden'}
                      type={'date'}
                      htmlFor={'hari_akhir'}
                      isRequired
                      isRow
                    />
                  </>
                )}
                <CheckboxInputBasic
                  form={form}
                  name={'is_lebih_dari_satu_hari'}
                  label={'Lebih dari 1 hari'}
                  fx={(e: any) => {
                    if (e) {
                      form.setValue('hari_akhir', '')
                    }
                  }}
                />
              </div>
              <TextInput
                name={'waktu'}
                form={form}
                label={'Waktu'}
                htmlFor={'waktu'}
                className={'w-1/2'}
                placeholder={'Cth: 08.00 WIB - 10.00 WIB'}
                isRequired
                isRow
              />
              <TextInput
                name={'tempat'}
                form={form}
                label={'Tempat'}
                htmlFor={'tempat'}
                className={'w-1/2'}
                placeholder={'Tempat Cth: Ruang Aula'}
                isRequired
                isRow
              />

              <div className="grid grid-cols-[12rem_1fr] items-start gap-5 w-full">
                <Label>Agenda</Label>
                <div className="flex flex-col gap-2 w-full">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <div key={field.id} className="flex items-center gap-2 w-full">
                        <TextInput
                          name={`agenda.${index}`}
                          form={form}
                          placeholder={`Agenda ${index + 1}`}
                          htmlFor={`agenda-${index}`}
                          className="[&>label]:hidden w-full flex!"
                          inputClassName="w-full"
                          isRequired
                          isRow
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {form.formState.errors.agenda?.message && (
                    <p className="text-sm text-red-500">{form.formState.errors.agenda.message}</p>
                  )}
                </div>
                <p className="text-red-500 text-xs col-span-2 ml-[212px]">
                  NB:Isi Agenda untuk Menambah list Agenda
                </p>

                <div>
                  <Button className={'text-white'} type="button" onClick={() => append('')}>
                    Tambah Agenda
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={'p-2'}>
            <CardContent className={'p-2 space-y-4'}>
              <CardTitle>3. Penutup</CardTitle>
              <div className="relative">
                <SelectTemplateText kode={'U-1'} form={form} name={'penutup'} />
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

              <InputRadio
                form={form}
                label={'Ada Tembusan'}
                isRequired
                isRow
                name={'is_ada_tembusan'}
                data={[
                  { value: true, label: 'Ya' },
                  { value: false, label: 'Tidak' },
                ]}
              />

              {!!form.watch('is_ada_tembusan') && (
                <div className="grid grid-cols-[12rem_1fr] items-start gap-5 w-full">
                  <Label>Tembusan</Label>
                  <div className="flex flex-col gap-2 w-full">
                    {CCFieldValue.fields.map((field, index) => (
                      <div key={index}>
                        <div key={field.id} className="flex items-center gap-2 w-full">
                          <TextInput
                            name={`tembusan.${index}`}
                            form={form}
                            placeholder={`Tembusan ${index + 1}`}
                            htmlFor={`Tembusan-${index}`}
                            className="[&>label]:hidden w-full flex!"
                            inputClassName="w-full"
                            isRequired
                            isRow
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => CCFieldValue.remove(index)}
                            disabled={CCFieldValue.fields.length === 1}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {form.formState.errors.agenda?.message && (
                      <p className="text-sm text-red-500">{form.formState.errors.agenda.message}</p>
                    )}
                  </div>
                  <p className="text-red-500 text-xs col-span-2 ml-[212px]">
                    NB:Isi Tembusan untuk Menambah list Tembusan
                  </p>

                  <div>
                    <Button
                      className={'text-white'}
                      type="button"
                      onClick={() => CCFieldValue.append('')}
                    >
                      Tambah Tembusan
                    </Button>
                  </div>
                </div>
              )}

              <SelectBasicInput
                form={form}
                label={'Disahkan Oleh'}
                name={'disahkan_oleh'}
                placeholder={'Disahkan Oleh'}
                usePortal
                isRequired
                isRow
                data={
                  humanResource?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_sdm,
                  })) ?? []
                }
              />
            </CardContent>
          </Card>

          <ButtonForm onCancel={() => navigate(-1)} loading={loading} />
        </form>
      </Form>
    </>
  )
}

export default FormCreateLetterCustomize

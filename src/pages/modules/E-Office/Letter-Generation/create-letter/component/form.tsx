import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import type { TLetterInvitationSchema } from '../data/resolver.tsx'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'

interface props {
  form: UseFormReturn<TLetterInvitationSchema>
  loading: boolean
  HandleSave: (value: TLetterInvitationSchema) => void
}

const FormCreateLetterCustomize = (props: props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  const { letterHeader } = UseGetLetterHeaderRef()
  const { letterNumber } = UseGetLetterNumberAutomatic({
    page: '0',
    limit: '0',
  })

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <Card className={'p-2'}>
            <CardContent className={'p-2 space-y-4'}>
              <CardTitle className={'text-xl'}>Kop Surat</CardTitle>
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
            <CardContent className={'p-2 space-y-4'}>
              <CardTitle className={'text-xl'}>Penomoran Surat</CardTitle>
              <div className="grid grid-cols-3 gap-4">
                <SelectBasicInput
                  form={form}
                  name={'id_nomor_surat_otomatis'}
                  placeholder={'Pilih Kode Nomor Surat'}
                  label={'Pilih Kode Nomor Surat'}
                  usePortal
                  isRequired
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
                      form={form}
                      name={`detail_lampiran.${index}`}
                      label={`Detail Lampiran ${index + 1}`}
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
            </CardContent>
          </Card>

          <ButtonForm onCancel={() => navigate(-1)} loading={loading} />
        </form>
      </Form>
    </>
  )
}

export default FormCreateLetterCustomize

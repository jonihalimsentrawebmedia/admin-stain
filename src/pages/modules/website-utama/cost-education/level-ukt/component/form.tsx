import type { UseFormReturn } from 'react-hook-form'
import type { TLevelUTKSchema } from '@/pages/modules/website-utama/cost-education/level-ukt/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

interface props {
  open: boolean
  setOpen: (value: boolean) => void
  form: UseFormReturn<TLevelUTKSchema>
  loading: boolean
  HandlerSave: (value: TLevelUTKSchema) => void
  select?: EducationalLevelList[]
}

export const FormLevelUkt = (props: props) => {
  const { form, loading, HandlerSave, open, setOpen, select } = props

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandlerSave)} className={'flex flex-col gap-5'}>
          <SelectBasicInput
            name={'id_jenjang_pendidikan'}
            form={form}
            placeholder={'Pilih Jenjang Pendidikan'}
            label={'Jenjang Pendidikan'}
            isRow
            isRequired
            data={
              select?.map((row) => ({
                label: `${row?.kode_jenjang}-${row?.nama_jenjang}`,
                value: row?.id_jenjang,
              })) ?? []
            }
          />
          <TextInput
            name={'nama_tingkatan_ukt'}
            form={form}
            label={'Nama Tingkatan UKT'}
            placeholder={'Masukkan Nama Tingkatan UKT'}
            htmlFor={'nama_tingkatan_ukt'}
            isRow
            isRequired
          />
          <CurrencyInput
            name={'jumlah_bawaan_ukt'}
            form={form}
            label={'Jumlah Bawaan UKT'}
            placeholder={'Jumlah Bawaan UKT'}
            currency={'IDR'}
            locale={'id-ID'}
            isRow
            isRequired
          />
          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            htmlFor={'urutan'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

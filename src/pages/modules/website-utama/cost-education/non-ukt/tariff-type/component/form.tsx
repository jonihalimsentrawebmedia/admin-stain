import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TTariffTypeResolver } from '../data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TTariffTypeResolver>
  HandlerSave: (value: TTariffTypeResolver) => void
  selectList: EducationalLevelList[]
}

export const FormTariffType = (props: props) => {
  const { selectList, form, loading, HandlerSave, open, setOpen } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <SelectBasicInput
            name={'id_jenjang_pendidikan'}
            form={form}
            placeholder={'Pilih Jenjang Pendidikan'}
            label={'Jenjang Pendidikan'}
            isRow
            isRequired
            data={selectList?.map((row) => ({
              label: `${row?.kode_jenjang} - ${row?.nama_jenjang}`,
              value: row?.id_jenjang,
            }))}
          />

          <TextInput
            name={'nama_jenis_tarif'}
            form={form}
            label={'Nama Jenis Tarif'}
            placeholder={'Masukkan Nama Jenis Tarif'}
            htmlFor={'nama_jenis_tarif'}
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

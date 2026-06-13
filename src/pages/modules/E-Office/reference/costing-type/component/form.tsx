import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverBiayaType } from '@/pages/modules/E-Office/reference/costing-type/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import type { ResReferensiType } from '@/interface/select'

interface props {
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<TResolverBiayaType>
  HandleSave: (e: TResolverBiayaType) => void
}

const tipeOptions: ResReferensiType[] = [
  { value: 'UMUM', label: 'Umum' },
  { value: 'TRANSPORTASI', label: 'Transportasi' },
  { value: 'PERHARI', label: 'Per Hari' },
]

export const FormBiayaType = (props: props) => {
  const { loading, open, setOpen, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <TextInput
            name={'kode'}
            form={form}
            label={'Kode'}
            placeholder={'Kode'}
            htmlFor={'kode'}
            isRequired
          />

          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Biaya'}
            placeholder={'Nama Biaya'}
            htmlFor={'nama'}
            isRequired
          />

          <InputRadio
            form={form}
            name={'tipe'}
            label={'Tipe'}
            data={tipeOptions}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

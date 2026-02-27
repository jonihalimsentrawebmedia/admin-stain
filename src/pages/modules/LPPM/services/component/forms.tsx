import type {UseFormReturn} from "react-hook-form";
import type {SchemaService} from "@/pages/modules/LPPM/services/data/resolver.tsx";
import type {Dispatch, SetStateAction} from "react";
import {Form} from "@/components/ui/form.tsx";
import ButtonForm from "@/components/common/button/ButtonForm.tsx";
import TextInput from "@/components/common/form/TextInput.tsx";
import {Label} from "@/components/ui/label.tsx";
import CheckboxInputBasic from "@/components/common/form/checkbox.tsx";

interface Props {
  form: UseFormReturn<SchemaService>
  loading: boolean
  HandleSave: (e: SchemaService) => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormServices = (props: Props) => {
  const {form, loading, HandleSave, open, setOpen} = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'nama_layanan'}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'url'}
            label={'URL'}
            placeholder={'URL'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <Label className={'text-gray-500'}>
              Posisi Aktif <span className={'text-red-500'}>*</span>
            </Label>
            <div className="flex items-center gap-2">
              <CheckboxInputBasic name={'posisi_header'} label={'Header'} form={form}/>
              <CheckboxInputBasic name={'posisi_bawah_landing'} label={'Bawah Landing'} form={form}/>
              <CheckboxInputBasic name={'posisi_footer'} label={'Footer'} form={form}/>
            </div>
          </div>

          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            inputClassName={'bg-white'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)}/>
        </form>
      </Form>
    </>
  )
}
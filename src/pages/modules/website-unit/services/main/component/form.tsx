import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UseGetListServices } from '@/pages/modules/website-unit/services/category/hooks'
import { UseGetListService } from '@/pages/modules/website-unit/services/list/hooks'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  form: UseFormReturn<any>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: any) => void
}

export const FormMainService = (pros: Props) => {
  const { form, loading, open, setOpen, HandleSave } = pros
  const { listServices } = UseGetListServices()
  const { listService } = UseGetListService(form.watch('id_category') ?? '')
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <SelectBasicInput
            name={'id_category'}
            form={form}
            label={'Kategori Layanan'}
            placeholder={'Kategori Layanan'}
            selectClassName={'z-30'}
            data={
              listServices?.map((row) => ({
                label: row?.nama_layanan,
                value: row?.id_kategori_layanan,
              })) ?? []
            }
            isRequired
            isRow
          />

          <SelectBasicInput
            name={'id_layanan'}
            form={form}
            label={'Nama Layanan'}
            placeholder={'Nama Layanan'}
            selectClassName={'z-20'}
            isDisabled={!form.watch('id_category')}
            data={
              listService?.map((row) => ({
                label: row?.nama_layanan,
                value: row?.id_layanan,
              })) ?? []
            }
            isRequired
            isRow
          />

          <TextInput
            form={form}
            label={'Posisi'}
            name={'posisi'}
            placeholder={'Posisi'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

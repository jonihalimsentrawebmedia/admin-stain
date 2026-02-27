import type { UseFormReturn } from 'react-hook-form'
import type { PlanResearchDocument } from '@/pages/modules/LPPM/research/plan/document/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UseGetResearchPlan } from '@/pages/modules/LPPM/research/plan/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'

interface FormProps {
  form: UseFormReturn<PlanResearchDocument>
  handleSubmit: (data: PlanResearchDocument) => void
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormResearchPlan = (props: FormProps) => {
  const { form, handleSubmit, loading, open, setOpen } = props
  const { researchPlan } = UseGetResearchPlan({
    page: '0',
    limit: '0',
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSubmit)}>
          <SelectBasicInput
            name={'id_kategori'}
            form={form}
            placeholder={'Kategory'}
            label={'Kategory'}
            isRequired
            isRow
            isDisabled
            data={researchPlan?.map((row) => ({
              label: row?.nama_kategori,
              value: row?.id_rencana_induk_penelitian_kategori,
            }))}
          />

          <TextInput
            form={form}
            label={'Nama Document'}
            placeholder={'Nama Document'}
            name={'nama_dokumen'}
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'jenis'}
            data={['URL', 'DOKUMEN'].map((row) => ({ label: row, value: row }))}
            label={'Jenis'}
            fx={() => {
              form.setValue('url', null)
              form.setValue('url_file', null)
            }}
            isRequired
            isRow
          />

          {form.watch('jenis') ? (
            form.watch('jenis') === 'URL' ? (
              <TextInput
                form={form}
                name={'url'}
                label={'URL'}
                placeholder={'URL'}
                isRequired
                isRow
              />
            ) : form.watch('jenis') === 'DOKUMEN' ? (
              <UploadFileInput
                form={form}
                name={'url_file'}
                keyname={'key_url_file'}
                label={'Upload File'}
                isRow
                required
                accept={'application/pdf'}
              />
            ) : null
          ) : null}

          <InputRadio
            form={form}
            name={'public'}
            data={[
              { label: 'Public', value: true },
              { label: 'Tidak', value: false },
            ]}
            label={'Public/Tidak'}
            isRequired
            isRow
          />

          <TextInput
            name={'urutan'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
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

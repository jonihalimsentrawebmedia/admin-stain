import type { UseFormReturn } from 'react-hook-form'
import type { IFAQResolver } from '@/pages/modules/website-utama/pertayaan/Faq/data/resolver.tsx'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'
import { UseGetFaqCategory } from '@/pages/modules/website-utama/pertayaan/Faq/Category/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import { InputManyFile } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/components/inputManyFile.tsx'

interface Props {
  form: UseFormReturn<IFAQResolver>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (value: IFAQResolver) => void
}

export const FormFAQData = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  const { loading: load1, categoryFaq } = UseGetFaqCategory({ isGetAll: true })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
          <SelectBasicInput
            name={'id_kategori_faq'}
            form={form}
            isLoading={load1}
            label={'Kategori'}
            isRequired
            isRow
            placeholder={'Kategori FAQ'}
            data={categoryFaq?.map((row) => ({
              value: row?.id_kategori_faq,
              label: row?.nama_kategori_faq,
            }))}
          />

          <TextInput
            form={form}
            name={'pertanyaan'}
            label={'Pertanyaan'}
            placeholder={'Pertanyaan'}
            isRequired
            isRow
          />

          <RichText form={form} name={'jawaban'} label={'Jawaban'} isRow required />

          <InputManyFile form={form} name={'dokumens'} label={'Dokumen'} isRow />

          <div className="flex justify-end gap-2 mt-5">
            <Button
              variant={'outline'}
              className={'text-primary hover:text-primary border-primary'}
              disabled={loading}
              onClick={(e) => {
                e.preventDefault()
                setOpen(!open)
              }}
            >
              <BiX />
              Batal
            </Button>

            <Button disabled={loading}>
              <FaSave />
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

import type { UseFormReturn } from 'react-hook-form'
import type { IGuideResolver } from '../data/resolver'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput'
import { RichText } from '@/components/common/richtext'
import { Button } from '@/components/ui/button'
import { BiX } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'

interface Props {
  form: UseFormReturn<IGuideResolver>
  loading: boolean

  handleSave: (value: IGuideResolver) => void
  onCancel: () => void
}
const GuideForm = ({ form, handleSave, loading, onCancel }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
     
        <TextInput
          form={form}
          name={'judul'}
          label={'Judul'}
          placeholder={'Judul'}
          isRequired
          isRow
        />

        <RichText form={form} name={'isi'} label={'Isi'} isRow required />

      

        <div className="flex justify-end gap-2 mt-5">
          <Button
            variant={'outline'}
            className={'text-primary hover:text-primary border-primary'}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
             onCancel()
            }}
          >
            <BiX />
            Batal
          </Button>

          <Button disabled={loading}>
            <FaSave  />
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default GuideForm

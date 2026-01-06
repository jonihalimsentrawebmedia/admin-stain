import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { useForm } from 'react-hook-form'

export const FooterContent = () => {
  const form = useForm()
  return (
    <>
      <div>
        <ButtonTitleGroup label={'Footer'} buttonGroup={[]} />

        <Form {...form}>
          <form className={'mt-5 flex flex-col gap-4'}>
            <TextInput
              isRequired
              isRow
              name={'text_footer'}
              form={form}
              label={'Text Footer'}
              placeholder={'Text Footer'}
            />

            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                { type: 'cancel', label: 'Cancel' },
                { type: 'save', label: 'Simpan' },
              ]}
            />
          </form>
        </Form>
      </div>
    </>
  )
}

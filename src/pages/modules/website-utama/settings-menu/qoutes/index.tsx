import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

export const QuotesPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm()

  return (
    <>
      {isEdit ? (
        <>
          <Form {...form}>
            <form>
              <TextAreaInput
                name={'isi_quotes'}
                form={form}
                label={'Quotes'}
                placeholder={'Quotes'}
                isRow
                isRequired
              />
            </form>
          </Form>
        </>
      ) : (
        <div className="space-y-4">
          <ButtonTitleGroup
            label={'Quotes'}
            buttonGroup={[
              {
                type: 'edit',
                label: 'Edit Data',
                onClick: () => setIsEdit(!isEdit),
              },
            ]}
          />
        </div>
      )}
    </>
  )
}

import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useState } from 'react'
import { RichText } from '@/components/common/richtext'

export const FormDescription = () => {
  const form = useForm()
  const [isEdit, setIsEdit] = useState(false)

  const handleSave = async (e: any) => {
    setIsEdit(!isEdit)
    console.log(e)
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 my-5'} onSubmit={form.handleSubmit(handleSave)}>
          <ButtonTitleGroup
            label={'Deskripsi'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => setIsEdit(!isEdit),
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <RichText form={form} name={'isi'} isRow={false} showLabel={false} label={''} />
        </form>
      </Form>
    </>
  )
}

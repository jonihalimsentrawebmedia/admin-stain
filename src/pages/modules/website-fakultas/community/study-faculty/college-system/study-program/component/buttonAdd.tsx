import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

export const ButtonAddStudyProgram = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const HandleSave = async (e: any) => {
    setLoading(true)
    console.log(e)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic
        title={'Tambah Program Pendidikan'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-5xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              placeholder={'Nama Program Pendidikan'}
              name={'nama_program'}
              form={form}
              label={'Nama Program Pendidikan'}
              isRequired
            />

            <RichText
              form={form}
              name={'deskripsi'}
              isRow={false}
              showLabel={true}
              label={'Deskripsi Program Pendidikan'}
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddSectorCarrierProspect = () => {
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
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic
        title={'Tambah Sektor Pekerjaan'}
        className={'min-w-5xl'}
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_sektor'}
              form={form}
              label={'Nama Sektor Pekerjaan'}
              placeholder={'Nama Sektor Pekerjaan'}
              isRequired
            />
            <RichText
              form={form}
              name={'decripstion'}
              isRow={false}
              showLabel={true}
              label={'Deskripsi Sektor Pekerjaan'}
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

export const ButtonAddZoneIntegrityCategory = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const HandelSubmit = async (e: any) => {
    setLoading(true)
    console.log(e)
  }
  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(true)}
      >
        <BiPlus />
        Tambah Kategori
      </Button>

      <DialogBasic title={'Tambah Kategori'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'space-y-5'} onSubmit={form.handleSubmit(HandelSubmit)}>
            <TextInput
              name={'nama_kategori'}
              form={form}
              label={'Nama Kategori'}
              placeholder={'Masukkan Nama Kategori'}
              isRequired
              isRow
            />
            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

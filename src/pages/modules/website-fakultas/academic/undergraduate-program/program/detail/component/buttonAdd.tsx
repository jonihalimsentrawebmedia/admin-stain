import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddPartner = () => {
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
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <BiPlus />
        Tambah Partner
      </Button>

      <DialogBasic
        title={'Tambah Universitas Partner'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-5xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadPhotoImage form={form} name={'url_gambar'} />
            <TextInput
              name={'nama_universitas'}
              label={'Nama Universitas'}
              placeholder={'Nama Universitas'}
              form={form}
              isRequired
            />

            <RichText form={form} name={'description'} isRow={false} label={'Deskripsi'} />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

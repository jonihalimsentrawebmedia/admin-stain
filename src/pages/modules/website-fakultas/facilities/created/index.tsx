import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'

export const CreatedFacilities = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const navigate = useNavigate()

  const HandelSubmit = async (e: any) => {
    setLoading(true)
    console.log(e)
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandelSubmit)}>
          <UploadPhotoImage name={'gambar_url'} form={form} />
          <TextInput
            name={'nama_fasilitas'}
            form={form}
            label={'Nama Fasilitas'}
            placeholder={'Masukkan Nama Fasilitas'}
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} required isRow />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

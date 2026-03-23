import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const CreatedStudentOrganization = () => {
  const form = useForm()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleSave = async (e: any) => {
    setLoading(true)
    console.log(e)
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(handleSave)}>
          <UploadPhotoImage name={'url_gambar'} form={form} />
          <TextInput
            name={'nama_organisasi'}
            form={form}
            label={'Nama Organisasi Mahasiswa'}
            placeholder={'Nama Organisasi Mahasiswa'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />
          <RichText form={form} name={'tentang'} label={'Tentang'} required isRow />
          <RichText form={form} name={'sekretariat'} label={'Sekertariat'} required isRow />
          <RichText form={form} name={'Kegiatan'} label={'Kegiatan'} required isRow />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

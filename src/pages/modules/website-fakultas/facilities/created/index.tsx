import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const CreatedFacilities = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const navigate = useNavigate()

  const HandelSubmit = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/fasilitas', e)
      .then((res) => {
        if (res.data?.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/website-fakultas/facilities')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandelSubmit)}>
          <UploadPhotoImage name={'url_gambar'} form={form} />
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Fasilitas'}
            placeholder={'Masukkan Nama Fasilitas'}
            inputClassName={'bg-white'}
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

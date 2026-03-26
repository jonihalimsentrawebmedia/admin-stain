import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { type IStudentOrganization, StudentOrganizationResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const CreatedStudentOrganization = () => {
  const form = useForm<IStudentOrganization>({
    resolver: zodResolver(StudentOrganizationResolver),
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSave = async (e: IStudentOrganization) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/daftar-organisasi-mahasiswa', e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success')
          setLoading(false)
          navigate(
            '/modules/website-fakultas/community/student-life/student-organization/list-organization'
          )
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(handleSave)}>
          <UploadPhotoImage name={'url_gambar'} form={form} />
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Organisasi Mahasiswa'}
            placeholder={'Nama Organisasi Mahasiswa'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />
          <RichText form={form} name={'tentang'} label={'Tentang'} required isRow />
          <RichText form={form} name={'seketariat'} label={'Sekertariat'} required isRow />
          <RichText form={form} name={'kegiatan'} label={'Kegiatan'} required isRow />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailPlace } from '../hook/index'

export const UpdatedStudentListOrganization = () => {
  const form = useForm()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { placeDetail } = UseGetDetailPlace((id as string) ?? '')

  useEffect(() => {
    if (placeDetail) {
      form.reset({
        url_gambar: placeDetail.url_gambar,
        nama: placeDetail.nama,
        deskripsi: placeDetail?.deskripsi,
      })
    }
  }, [placeDetail])

  const handleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(
      `/fakultas/daftar-hiburan-mahasiswa/${placeDetail?.id_daftar_hiburan_mahasiswa}`,
      e
    )
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          navigate('/modules/website-fakultas/community/student-life/entertainment/list-place')
          toast.success(res?.data?.message || 'Success')
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
          <UploadPhotoImage
            name={'url_gambar'}
            form={form}
          />
          <TextInput
            name={'nama'}
            form={form}
            label={'Nama Hiburan Mahasiswa'}
            placeholder={'Nama Hiburan Mahasiswa'}
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

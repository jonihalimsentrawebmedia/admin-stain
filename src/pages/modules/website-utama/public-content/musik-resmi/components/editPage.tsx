import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { OfficialMusicResolver, type OfficialMusicType } from '../types/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { UseGetOfficialMusicDetail } from '@/pages/modules/website-utama/public-content/musik-resmi/hooks'

export const EditOfficialMusicPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const { officialMusicDetail: detail } = UseGetOfficialMusicDetail(id ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail.judul,
        link_audio: detail.link_audio,
        gambar_url: detail.gambar_url,
        key_audio: detail?.link_audio_key,
      })
    }
  }, [detail])

  const form = useForm<OfficialMusicType>({
    resolver: zodResolver(OfficialMusicResolver),
  })

  const HandleSave = async (data: OfficialMusicType) => {
    await AxiosClient.put(`/website-utama/mars-musik/${detail?.id_mars_musik}`, data)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/public-content/music')
          toast.success(res.data.message || 'Success tambah data musik resmi')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Tambah Musik Resmi'}
            isBack
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { isDisabled: loading, label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />

          <UploadImageRatio
            required
            placeholder={'Uplaod Gambar'}
            label={'Gambar Utama (Ukuran 3:4)'}
            form={form}
            name={'gambar_url'}
            maxWidthClassName={'max-w-[240px]'}
            aspectRatioWidth={3}
            aspectRatioHeight={4}
          />

          <TextInput
            name={'judul'}
            label={'Judul'}
            inputClassName={'bg-white'}
            placeholder={'Judul Music'}
            form={form}
            isRequired
            isRow
          />
          <UploadFileInput
            form={form}
            name={'link_audio'}
            keyname={'key_audio'}
            label={'Upload Audio'}
            innerClassName={'w-1/2'}
            isRow
            required
          />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { isDisabled: loading, label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />
        </form>
      </Form>
    </>
  )
}

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetTemplateDetail } from '../hooks/index'
import { useNavigate, useParams } from 'react-router-dom'
import { ColorPickerField } from '@/components/common/form/ColorPickerField.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useEffect, useState } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonReset from './component/ButtonReset'

export const ThemaChangeColorInstitution = () => {
  const { id } = useParams()
  const { detail } = UseGetTemplateDetail(id as string)

  const navigate = useNavigate()
  const form = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (detail) {
      form.reset({
        color_halaman_utama: detail?.color_halaman_utama,
        color_background: detail?.color_background,
      })
    }
  }, [detail])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/lembaga/thema/${id}/color`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-lembaga/settings/template')
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          label="Atur Warna Template"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonReset id={id as string} />,
            },
          ]}
        />
        <div
          className={
            'w-fit text-sm text-blue-500 border border-blue-500 rounded-md p-1.5 flex items-center gap-1.5'
          }
        >
          <MdInfo className={'size-5'} />
          Pilih warna yang ingin anda gunakan untuk website anda.
        </div>

        <img src={detail?.image_path} alt="gambar" className={'w-[500px] h-auto object-contain'} />

        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <ColorPickerField
              name="color_halaman_utama"
              title="Warna Halaman Utama"
              description=""
            />

            <ColorPickerField
              name="color_background"
              title="Warna background Footer"
              description=""
            />

            <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
          </form>
        </Form>
      </div>
    </>
  )
}

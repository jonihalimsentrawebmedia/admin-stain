import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ContentForm from '../components/ContentForm'
import { ContentResolver, type IContentTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ContentCreateView = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params
  const form = useForm<IContentTypeForm>({
    resolver: zodResolver(ContentResolver),
  })
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleSave = async (e: IContentTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/konten', {
      ...e,
      id_menu: id,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-contents'],
          })
      
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data konten')
              navigate(-1)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <ButtonTitleGroup
          buttonGroup={[
            {
              label: '',
              onClick: () => {},
              type: 'add',
              element: <ButtonForm loading={loading} />,
            },
          ]}
          label="Konten"
        />
        <ContentForm form={form} />
        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default ContentCreateView

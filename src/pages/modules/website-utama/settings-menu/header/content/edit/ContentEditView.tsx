import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ContentResolver, type IContentTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import ContentForm from '../components/ContentForm'
import useGetContentDetail from '../controller/useGetContentDetail'
import { Form } from '@/components/ui/form'

const ContentEditView = () => {
  const { contentList } = useGetContentDetail()

  const navigate = useNavigate()
  const params = useParams()
  const { id, idContent } = params
  const form = useForm<IContentTypeForm>({
    resolver: zodResolver(ContentResolver),
  })
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleSave = async (e: IContentTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/konten/${idContent}`, {
      ...e,
      id_menu: id,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-contents'],
          })
          navigate(-1)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (contentList) {
      form.reset({
        ...contentList,
      })
    }
  }, [contentList])
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

export default ContentEditView

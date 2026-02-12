import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetWebsiteLembagaGlobal } from '../../hooks'
import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
interface Props {
  linkGetData: string
  queryKeyGetData: string
  linkPostData: string
  queryKeyPostData: string
  title: string
}
const FormRichEditor = ({
  linkGetData,
  linkPostData,
  queryKeyGetData,
  queryKeyPostData,
  title,
}: Props) => {
  const form = useForm()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  async function handleSave(e: any) {
    setLoading(true)

    await AxiosClient.post(linkPostData, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: [queryKeyPostData],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  const { dataGlobal } = UseGetWebsiteLembagaGlobal({
    link: linkGetData,
    queryKey: queryKeyGetData,
  })

  useEffect(() => {
    form.reset({
      ...dataGlobal,
    })
  }, [dataGlobal])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <ButtonTitleGroup
          buttonGroup={
            isEdit
              ? [
                  {
                    type: 'custom',
                    element: (
                      <ButtonForm
                        loading={loading}
                        onCancel={() => {
                          setIsEdit(false)
                        }}
                      />
                    ),
                  },
                ]
              : [
                  {
                    type: 'edit',
                    label: 'Edit Konten',
                    onClick: (e) => {
                      e.preventDefault()
                      setIsEdit(true)
                    },
                  },
                ]
          }
          label={title}
        />
        {!isEdit ? (
          <div
            className={'tiptap ProseMirror simple-editor'}
            dangerouslySetInnerHTML={{ __html: form.watch('isi') }}
          />
        ) : (
          <RichText form={form} label="" name="isi" isRow={false} />
        )}
        {isEdit && (
          <ButtonForm
            loading={loading}
            onCancel={() => {
              setIsEdit(false)
            }}
          />
        )}
      </form>
    </Form>
  )
}

export default FormRichEditor

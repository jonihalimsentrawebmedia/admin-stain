import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetWebsiteLembagaGlobal } from '@/pages/modules/website-lembaga/hooks'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
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
    <>
      <ButtonTitleGroup buttonGroup={[]} label={title} />

      <div className="flex flex-col gap-2">
        <div className="text-[#999] text-xs">Deskripsi</div>
        <div
          className={'tiptap ProseMirror simple-editor html-class'}
          dangerouslySetInnerHTML={{ __html: form.watch('isi') }}
        />
      </div>
      <Button
        onClick={() => {
          setIsEdit(true)
        }}
        variant={'outline'}
        className="border-primary w-fit text-primary hover:text-primary"
      >
        <Pencil />
        Edit Deskripsi
      </Button>

      <DialogCustom open={isEdit} setOpen={setIsEdit} title={`Edit Deskripsi - ${title}`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <RichText form={form} name="isi" label="Deskripsi" isRow={false} />
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setIsEdit(false)
              }}
              position="justify-center"
            />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

export default FormRichEditor

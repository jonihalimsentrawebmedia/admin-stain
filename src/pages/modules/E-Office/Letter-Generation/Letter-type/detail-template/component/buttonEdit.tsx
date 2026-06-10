import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverListTemplateLetter, type TResolverListTemplateLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useParams } from 'react-router-dom'
import type { IMailTypeLetterTemplate } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IMailTypeLetterTemplate
}

const ButtonEditTemplateLetterType = (props: props) => {
  const { data } = props
  const { id_template } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverListTemplateLetter>({
    resolver: zodResolver(ResolverListTemplateLetter),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_jenis_template_surat: data.id_jenis_template_surat,
        urutan: data.urutan,
        uraian: data.uraian,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverListTemplateLetter) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/mail-template-surat/${data?.id_mail_template_surat}`, {
      ...value,
      id_jenis_template_surat: id_template as string,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['type-template-letter'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'rounded bg-yellow-500 p-1.5 hover:bg-yellow-600 text-white'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Tambah Template'}
        className={'lg:min-w-5xl'}
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-5">
            <TextInput
              name={'urutan'}
              form={form}
              label={'Urutan'}
              placeholder={'Urutan'}
              type={'number'}
              isRequired
              isNumber
            />
            <RichText
              form={form}
              name={'uraian'}
              isRow={false}
              label={'Uraian'}
              showLabel={true}
              required
            />
            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
export default ButtonEditTemplateLetterType

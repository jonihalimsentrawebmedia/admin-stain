import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverIsiTemplateSurat, type TResolverIsiTemplateSurat } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useParams } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'

const ButtonAddIsiTemplate = () => {
  const { id_template_surat } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverIsiTemplateSurat>({
    resolver: zodResolver(ResolverIsiTemplateSurat),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverIsiTemplateSurat) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mail-isi-template-surat', {
      ...value,
      id_template_surat: id_template_surat as string,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['isi-template-surat'],
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
      <Button className={'rounded-full text-white'} onClick={() => setOpen(!open)}>
        <FaCirclePlus />
        Tambah Isi Template
      </Button>

      <DialogBasic
        title={'Tambah Isi Template'}
        className={'lg:min-w-5xl'}
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-5">
            <RichText
              form={form}
              name={'uraian'}
              label={'Uraian'}
              placeholder={'Uraian'}
              required
              isRow={false}
            />
            <TextInput
              name={'urutan'}
              form={form}
              label={'Urutan'}
              placeholder={'Urutan'}
              type={'number'}
              isRequired
              isNumber
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
export default ButtonAddIsiTemplate

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverListTemplateLetter, type TResolverListTemplateLetter } from '../data/resolver.tsx'
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

const ButtonAddTemplateLetterType = () => {
  const { id_template } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverListTemplateLetter>({
    resolver: zodResolver(ResolverListTemplateLetter),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverListTemplateLetter) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mail-template-surat', {
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
      <Button className={'rounded-full text-white'} onClick={() => setOpen(!open)}>
        <FaCirclePlus />
        Tambah Template
      </Button>

      <DialogBasic
        title={'Tambah Nama Jenis Template'}
        className={'lg:min-w-5xl'}
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-5">
            <TextInput
              form={form}
              name={'uraian'}
              label={'Nama Jenis Template'}
              placeholder={'Nama Jenis Template'}
              isRequired
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
export default ButtonAddTemplateLetterType

import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from 'lucide-react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { ResolverFileSupport, type TResolverFileSupport } from './resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const ButtonAddFileSupport = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const form = useForm<TResolverFileSupport>({
    resolver: zodResolver(ResolverFileSupport),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverFileSupport) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/acara/${id}/dokumen`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['file-support'],
          })
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <Button className={'rounded-full text-white bg-primary'} onClick={() => setOpen(!open)}>
        <PlusIcon />
        Upload File
      </Button>

      <DialogBasic title={'Upload File'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <InputRadio
              form={form}
              name={'jenis_file'}
              data={[
                { label: 'Dokumen', value: 'DOKUMEN' },
                { label: 'URL', value: 'URL' },
              ]}
              label={'Jenis File'}
              isRow
              isRequired
              fx={() => {
                form.setValue('url_file', '')
                form.setValue('dokumen', '')
              }}
            />
            <TextInput
              form={form}
              name={'judul'}
              label={'Judul File'}
              placeholder={'Judul File'}
              htmlFor={'judul_file'}
              isRequired
            />
            {form.watch('jenis_file') === 'DOKUMEN' ? (
              <UploadFileInput
                form={form}
                name={'dokumen'}
                keyname={'key_dokumen'}
                label={'Upload File'}
                required
              />
            ) : (
              <TextInput
                form={form}
                name={'url_file'}
                label={'URL File'}
                placeholder={'URL File'}
                type={'url'}
                isRequired
              />
            )}

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonAddFileSupport

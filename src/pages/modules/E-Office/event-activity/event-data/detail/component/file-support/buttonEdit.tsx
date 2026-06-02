import { useEffect, useState } from 'react'
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
import type { IDocumentEvent } from './hooks.tsx'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IDocumentEvent
}

const ButtonEditFileSupport = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const form = useForm<TResolverFileSupport>({
    resolver: zodResolver(ResolverFileSupport),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        dokumen: data?.dokumen,
        url_file: data?.url_file ?? '',
        jenis_file: data?.jenis_file as 'DOKUMEN',
        judul: data?.judul,
        key_dokumen: data?.key_file,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverFileSupport) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/acara/${id}/dokumen/${data?.id_acara_dokumen}`, value)
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
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

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
                accept={'application/pdf'}
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

export default ButtonEditFileSupport

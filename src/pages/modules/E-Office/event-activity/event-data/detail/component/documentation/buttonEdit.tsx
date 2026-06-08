import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { ResolverDocumentation, type TResolverDocumentation } from './resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IDocumentationEvent } from './hooks.tsx'

interface Props {
  data: IDocumentationEvent
}

const ButtonEditDocumentation = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverDocumentation>({
    resolver: zodResolver(ResolverDocumentation),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        dokumen: data?.dokumen,
        url_file: data?.url_file ?? '',
        jenis_file: data?.jenis_file as 'UPLOAD',
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverDocumentation) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/acara/${data?.id_acara}/dokumentasi/${data?.id_acara_dokumentasi}`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['documentation'],
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
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600 rounded'}
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
                { label: 'Upload', value: 'UPLOAD' },
                { label: 'URL', value: 'URL' },
              ]}
              label={'Jenis File'}
              isRow
              isRequired
              fx={() => {
                form.setValue('url_file', '')
                form.setValue('dokumen', '')
                form.setValue('keterangan', '')
              }}
            />

            {form.watch('jenis_file') === 'UPLOAD' ? (
              <>
                <UploadImageRatio
                  name={'url_file'}
                  form={form}
                  label={'Upload Dokumentasi'}
                  aspectRatioWidth={1}
                  aspectRatioHeight={1}
                  placeholder={'Cari Gambar'}
                  maxWidthClassName={'max-w-[200px]'}
                  required
                />
              </>
            ) : (
              <>
                <TextInput
                  name={'url_file'}
                  form={form}
                  label={'URL File'}
                  placeholder={'URL File'}
                  type={'url'}
                  htmlFor={'url_file'}
                  isRequired
                />
              </>
            )}

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonEditDocumentation

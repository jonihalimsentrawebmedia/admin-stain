import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from 'lucide-react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { ResolverDocumentation, type TResolverDocumentation } from './resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

const ButtonAddDocumentation = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const form = useForm<TResolverDocumentation>({
    resolver: zodResolver(ResolverDocumentation),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverDocumentation) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/acara/${id}/dokumentasi`, value)
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
      <Button
        variant={'outline'}
        className={'rounded-full border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
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
                  name={'dokumen'}
                  form={form}
                  label={'Upload Dokumentasi'}
                  aspectRatioWidth={1}
                  aspectRatioHeight={1}
                  placeholder={'Cari Gambar'}
                  maxWidthClassName={'max-w-[200px]'}
                  required
                />
                <TextInput
                  form={form}
                  name={'keterangan'}
                  label={'Keterangan'}
                  placeholder={'Keterangan'}
                  htmlFor={'keterangan'}
                  isRequired
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

export default ButtonAddDocumentation

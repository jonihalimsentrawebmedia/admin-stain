import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  open: boolean
  setOpen: (e: boolean) => void
}

const ImageUrlUpload = (props: props) => {
  const { id } = useParams()
  const { open, setOpen } = props
  const [loading, setLoading] = useState(false)
  const form = useForm<{ url_file: string }>({})

  const queryClient = useQueryClient()
  const HandleSave = async (value: { url_file: string }) => {
    setLoading(true)
    await AxiosClient.post(`eoffice/acara/${id}/dokumentasi`, {
      jenis_file: 'URL',
      url_file: value?.url_file,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['documentation'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            form={form}
            name={'url_file'}
            label={'URL Dokumentasi'}
            placeholder={'Masukan URL Dokumentasi'}
            type={'url'}
            isRequired
          />
          <div className="text-xs text-gray-500">
            cth: https://drive.google.com.... atau link dokumentasi lainnya
          </div>
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default ImageUrlUpload

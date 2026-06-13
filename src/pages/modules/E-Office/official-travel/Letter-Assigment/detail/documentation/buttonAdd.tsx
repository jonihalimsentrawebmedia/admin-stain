import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverDokumentasi,
  type TResolverDokumentasi,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  id_mail_surat_tugas?: string
}

const ButtonAddDocumentation = (props: props) => {
  const { id_mail_surat_tugas } = props
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverDokumentasi>({
    resolver: zodResolver(ResolverDokumentasi),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverDokumentasi) => {
    setLoading(true)
    const idTugas = id_mail_surat_tugas ?? id
    await AxiosClient.post(`/eoffice/mail-surat-tugas/${idTugas}/dokumentasi`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['documentation-tugas'],
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
        className={'rounded-full text-white hover:text-white'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Upload Dokumentasi
      </Button>

      <DialogBasic title={'Upload Dokumentasi'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadImageRatio
              name={'url_file'}
              form={form}
              label={'Upload Gambar'}
              aspectRatioWidth={4}
              aspectRatioHeight={3}
              placeholder={'Cari Gambar'}
              maxWidthClassName={'max-w-[300px]'}
              required
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonAddDocumentation

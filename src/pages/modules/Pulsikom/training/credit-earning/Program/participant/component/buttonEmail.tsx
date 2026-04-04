import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailResolver, type TEmailResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { IParticipant } from '../data/index.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { UploadDocument } from '@/pages/modules/website-utama/public-content/announcement/components/uploadDocument.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

interface Props {
  data: IParticipant
}

export const ButtonEmail = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TEmailResolver>({
    resolver: zodResolver(EmailResolver),
    defaultValues: {
      email: data?.email,
    },
  })

  console.log(form.formState.errors)

  const HandleSave = async (value: TEmailResolver) => {
    setLoading(true)
    const file = value?.file_lampiran.map((row) => row.url_dokumen)
    await AxiosClient.post(
      `/pusilkom/program/${data?.id_program}/peserta/${data?.id_peserta}/kirim-email`,
      {
        pesan: value.pesan,
        subjek: value.subjek,
        file_lampiran: file,
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success mengirim email')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="border border-primary text-primary px-2 py-1 rounded text-xs"
      >
        Kirim Email
      </button>

      <DialogBasic title={'Kirim Email'} open={open} setOpen={setOpen} className={'lg:min-w-2xl'}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              form={form}
              name={'email'}
              label={'Tujuan'}
              type={'email'}
              isRow
              isRequired
            />
            <TextInput
              form={form}
              name={'subjek'}
              label={'Subjek'}
              placeholder={'Subjek Email'}
              isRow
              isRequired
            />
            <TextAreaInput
              form={form}
              name={'pesan'}
              label={'Pesan'}
              isRow
              isRequired
              placeholder={'Pesan'}
            />

            <UploadDocument label={'Lampiran'} required form={form} name={'file_lampiran'} />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

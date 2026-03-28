import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { IProgramUndergraduatePartner } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IProgramUndergraduatePartner
}

export const ButtonEditPartner = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const { id } = useParams()

  useEffect(() => {
    if (data) {
      form.reset({
        url_gambar: data?.url_gambar,
        nama_universitas: data?.nama_universitas,
        deskripsi: data?.deskripsi,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(
      `/fakultas/international-ungreaduate-program-universitas-partner/${id}/${data?.id_fakultas_international_ungreaduate_program_universitas_partner}`,
      e
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success tambah partner')
          queryClient.invalidateQueries({
            queryKey: ['partner-university-undergraduate'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 text-white p-1.5 rounded hover:bg-yellow-600'}
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Tambah Universitas Partner'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-5xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadPhotoImage form={form} name={'url_gambar'} />
            <TextInput
              name={'nama_universitas'}
              label={'Nama Universitas'}
              placeholder={'Nama Universitas'}
              form={form}
              isRequired
            />

            <RichText form={form} name={'deskripsi'} isRow={false} label={'Deskripsi'} />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

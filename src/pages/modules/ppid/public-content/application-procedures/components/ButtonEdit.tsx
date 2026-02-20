import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import ImageUpload from './ImageUpload'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import type { IApplicationProcedures } from '../model'
import { ApplicationProceduresResolver, type ApplicationProceduresType } from '../model/resolver'
import TextInput from '@/components/common/form/TextInput'

interface Props {
  data: IApplicationProcedures
}
const ButtonEdit = ({ data: dataProps }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<ApplicationProceduresType>({
    resolver: zodResolver(ApplicationProceduresResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ApplicationProceduresType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/unit-ppid/tata-cara-permohonan/${dataProps.id_tata_cara_permohonan}`,
        {
          ...data,
        }
      )

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['tata-cara-permohonan'],
        })

        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            url_gambar: dataProps.url_gambar,
            judul: dataProps.judul,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Tata Cara Permohonan</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <ImageUpload maxSizeMB={2} form={form} name="url_gambar" label="Gambar(Ukuran 4:2)" />
              <TextInput form={form} name="judul" label="Judul" isRow placeholder='Judul'/>

              <div className="text-center">
                <ButtonForm
                  loading={loading}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEdit

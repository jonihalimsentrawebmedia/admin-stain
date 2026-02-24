import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import type { IShortcut } from '../model'
import { ShortcutResolver, type ShortcutType } from '../model/resolver'
import ImageUpload from './ImageUpload'
import TextInput from '@/components/common/form/TextInput'

interface Props {
  data: IShortcut
}
const ButtonEdit = ({ data: dataProps }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<ShortcutType>({
    resolver: zodResolver(ShortcutResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ShortcutType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/unit-ppid/pintasan/${dataProps.id_pintasan}`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['shortcut'],
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
            nama_pintasan: dataProps.nama_pintasan,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Infografis</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <ImageUpload maxSizeMB={2} form={form} name="url_gambar" label="" />
                <TextInput
                  className="h-fit"
                  form={form}
                  name="nama_pintasan"
                  label="Nama Pintasan"
                  isRow
                  placeholder="Pintasan"
                />
              </div>

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

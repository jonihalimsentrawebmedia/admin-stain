import { useState } from 'react'
import type { DocumentSupportList } from '../model'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import DocumentSupportForm from './DocumentSupportForm'
import ButtonForm from '@/components/common/button/ButtonForm'
import {
  DocumentSupportInstutationResolver,
  type DocumentSupportInstutationType,
} from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

interface Props {
  data: DocumentSupportList
}
const ButtonEdit = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<DocumentSupportInstutationType>({
    resolver: zodResolver(DocumentSupportInstutationResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(values: DocumentSupportInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/lembaga/daftar-dokumen/${data.id_lembaga_daftar_dokumen}`,
        {
          ...values,
          urutan: Number(values.urutan),
        }
      )

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['daftar-dokumen-lembaga'],
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
            judul: data.judul,
            urutan: data.urutan.toString(),
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Dokumen Pendukung Akreditasi</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <DocumentSupportForm form={form} />
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEdit

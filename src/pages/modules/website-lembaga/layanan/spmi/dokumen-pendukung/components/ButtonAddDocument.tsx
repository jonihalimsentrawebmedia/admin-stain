import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm'
import DocumentSupportDetailForm from '../detail/components/DocumentSupportDetailForm'
import {
  DocumentSupportAccreditationInstutationResolver,
  type DocumentSupporAccreditationtInstutationType,
} from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import type { DocumentSupportList } from '../model'

interface Props {
  dataProps: DocumentSupportList
}
const ButtonAddDocument = ({ dataProps }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<DocumentSupporAccreditationtInstutationType>({
    resolver: zodResolver(DocumentSupportAccreditationInstutationResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: DocumentSupporAccreditationtInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/lembaga/dokumen-pendukung-akreditasi`, {
        ...data,
        urutan: Number(data.urutan),
        id_lembaga_daftar_dokumen: dataProps.id_lembaga_daftar_dokumen,
      })

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
      <Button
        onClick={() => {
          setOpen(true)
          form.reset({
            judul: dataProps.judul,
          })
        }}
        variant={'outline'}
        className={'bg-white text-primary border-primary hover:text-primary'}
      >
        Tambah Dokumen
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Dokumen Pendukung Akreditasi</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <DocumentSupportDetailForm form={form} />
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

export default ButtonAddDocument

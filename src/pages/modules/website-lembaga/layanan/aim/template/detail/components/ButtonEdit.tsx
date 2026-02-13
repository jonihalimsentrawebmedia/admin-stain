import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'

import ButtonForm from '@/components/common/button/ButtonForm'
import type { DokumenTemplateAim } from '../../model'
import DocumentSupportDetailForm from './DocumentSupportDetailForm'
import { useSearchParams } from 'react-router-dom'
import {
  TemplateAimAccreditationInstutationResolver,
  type TemplateAimAccreditationtInstutationType,
} from '../../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

interface Props {
  data: DokumenTemplateAim
}
const ButtonEdit = ({ data: dataProps }: Props) => {
  const [searchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const form = useForm<TemplateAimAccreditationtInstutationType>({
    resolver: zodResolver(TemplateAimAccreditationInstutationResolver),
  })
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: TemplateAimAccreditationtInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/lembaga/dokumen-template-aim/${dataProps.id_lembaga_dokumen_template_aim}`,
        {
          ...data,
          urutan: Number(data.urutan),
          id_lembaga_template_aim: dataProps.id_lembaga_template_aim,
        }
      )

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['template-aim-detail-lembaga'],
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
            judul: searchParams.get('title') ?? '',
            nama_dokumen: dataProps.nama_dokumen,
            public: dataProps.public,
            url: dataProps.url,
            urutan: dataProps.urutan.toString(),
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Dokumen</p>}
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

export default ButtonEdit

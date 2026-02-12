import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'

import DocumentSupportDetailForm from './DocumentSupportDetailForm'
import {
  TemplateAimAccreditationInstutationResolver,
  type TemplateAimAccreditationtInstutationType,
} from '../../model/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useParams, useSearchParams } from 'react-router-dom'

const ButtonAdd = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const form = useForm<TemplateAimAccreditationtInstutationType>({
    resolver: zodResolver(TemplateAimAccreditationInstutationResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: TemplateAimAccreditationtInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/lembaga/dokumen-template-aim`, {
        ...data,
        urutan: Number(data.urutan),
        id_lembaga_template_aim: id,
      })

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
      <Button
        onClick={() => {
          setOpen(true)
          form.reset({
            judul: searchParams.get('title') ?? '',
          })
        }}
        variant={'outline'}
        className={'bg-white text-primary border-primary hover:text-primary'}
      >
        <HiPlus />
        Tambah data
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Dokumen</p>}
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

export default ButtonAdd

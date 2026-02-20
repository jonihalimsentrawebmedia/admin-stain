import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'

import ButtonForm from '@/components/common/button/ButtonForm'
import DocumentSupportDetailForm from './ReportsServiceForm'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import type { ReportSurvey } from '../model'
import { ReportSurveyResolver, type ReportSurveyType } from '../model/resolver'


interface Props {
  data: ReportSurvey
}
const ButtonEdit = ({ data: dataProps }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<ReportSurveyType>({
    resolver: zodResolver(ReportSurveyResolver),
  })
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ReportSurveyType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/unit-ppid/survei-layanan/${dataProps.id_survei_layanan}`,
        {
          ...data,
          urutan: Number(data.urutan),
        }
      )

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['reports-survey'],
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
            jenis: dataProps.jenis,
            url_gambar: dataProps.url_gambar,
            urutan: String(dataProps.urutan),
            nama_laporan: dataProps.nama_laporan,
            public: dataProps.public,
            url_file: dataProps.url_file,
            url: dataProps.url,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Laporan</p>}
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

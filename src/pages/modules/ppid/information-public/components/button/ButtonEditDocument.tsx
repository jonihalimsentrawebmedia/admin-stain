import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import AxiosClient from '@/provider/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import InformationPublicFormDocument from '../form/InformationPublicFormDocument'
import type { DocumentItem } from '../../information-regular/model'
import { IconEdit } from '@/components/common/table/icon'
import type { PublicInformationServiceStandardList } from '../../standart-service/model'

export const InformationPublicGlobalResolver = z
  .object({
    judul: z.string({ error: 'Judul Wajib Diisi' }).optional().nullable(),
    nama_dokumen: z.string({ error: 'Nama Wajib Diisi' }).min(1, { error: 'Nama Wajib Diisi' }),
    jenis: z.string({ error: 'Jenis Wajib Diisi' }).min(1, { error: 'Jenis Wajib Diisi' }),
    url: z.string().optional().nullable().or(z.literal('')),
    url_file: z.string().optional().nullable().or(z.literal('')),
    public: z.boolean({ error: 'Public Wajib Diisi' }),
    urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
  })
  .superRefine((data, ctx) => {
    // LOGIKA: Jika jenis == "URL" maka url WAJIB diisi
    if (data.jenis === 'URL') {
      if (!data.url || data.url.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'URL wajib diisi jika jenis adalah URL',
          path: ['url'], // Error akan muncul di field 'url'
        })
      }
    }

    // LOGIKA: Jika jenis == "DOKUMEN" maka url_dokumen WAJIB diisi
    if (data.jenis === 'DOKUMEN') {
      if (!data.url_file || data.url_file.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File dokumen wajib diisi jika jenis adalah DOKUMEN',
          path: ['url_dokumen'], // Error akan muncul di field 'url_dokumen'
        })
      }
    }
  })

export type InformationPublicGlobalType = z.infer<typeof InformationPublicGlobalResolver>
interface Props {
  title: string
  linkPost: string
  keyLinkPost: string
  idName: string
  idCategory?: string
  titleField: string
  data: DocumentItem | PublicInformationServiceStandardList
}
const ButtonEditDocument = ({
  keyLinkPost,
  linkPost,
  title,
  idName,
  idCategory,
  titleField,
  data: dataProps,
}: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<InformationPublicGlobalType>({
    resolver: zodResolver(InformationPublicGlobalResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: InformationPublicGlobalType) {
    setLoading(true)
    try {
      if (data.jenis === 'URL') {
        delete data.url_file
      }
      if (data.jenis === 'DOKUMEN') {
        delete data.url
      }
      const res = await AxiosClient.put(linkPost, {
        ...data,
        urutan: Number(data.urutan),
        [idName]: idCategory,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: [keyLinkPost],
        })

        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  console.log(form.watch())
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            judul: titleField,
            jenis: dataProps.jenis,
            nama_dokumen: dataProps.nama_dokumen,
            url: dataProps.url,
            url_file: dataProps.url_file,
            public: dataProps.public,
            urutan: dataProps.urutan.toString(),
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-[90wdv] md:w-full! "
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit{title}</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InformationPublicFormDocument showTitle={idCategory ? true : false} form={form} />
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
    </div>
  )
}

export default ButtonEditDocument

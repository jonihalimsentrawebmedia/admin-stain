import FormCreateLetterCustomize from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { GenerateLetterPdfDefinition } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/pdfconfig.ts'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { IMailInvitationLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/types.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import pdfmake from '@/utils/pdfmake.ts'
import { Link, useParams } from 'react-router-dom'
import {
  LetterInvitationSchema,
  type TLetterInvitationSchema,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/resolver.tsx'
import { UseGetDetailLetterGenerate } from '@/pages/modules/E-Office/Letter-Generation/letter-list/hooks'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format } from 'date-fns'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'

const UpdatedLetterByTemplate = () => {
  const { id } = useParams()
  const { letter } = UseGetDetailLetterGenerate(id as string)
  const { template } = UseGetTemplateByCodeLetter('U-1')

  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)

  const form = useForm<TLetterInvitationSchema>({
    resolver: zodResolver(LetterInvitationSchema) as any,
    defaultValues: {
      agenda: [''],
      is_lebih_dari_satu_hari: false,
    },
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...letter,
        id_jenis_surat: letter?.id_jenis_surat,
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        hari_mulai: format(letter.hari_mulai, 'yyyy-MM-dd'),
        hari_akhir: letter?.hari_akhir ? format(letter.hari_akhir, 'yyyy-MM-dd') : '',
      })
    }
  }, [letter])

  // Cleanup blob URL saat dialog ditutup atau component unmount
  const cleanupPdfUrl = () => {
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current)
      pdfUrlRef.current = null
    }
    setPdfUrl(null)
  }

  useEffect(() => {
    return () => {
      cleanupPdfUrl()
    }
  }, [])

  const HandleSave = async (value: TLetterInvitationSchema) => {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/eoffice/mail-surat-undangan/${id}`, {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        hari_mulai: new Date(value.hari_mulai).toISOString(),
        hari_akhir: value?.hari_akhir ? new Date(value.hari_akhir).toISOString() : null,
      })

      if (res.data.status) {
        const data: IMailInvitationLetter = res.data.data
        if (data?.id_satuan_organisasi) {
          const headerRes = await AxiosClient.get(`/eoffice/kop-surat/detail/${data.id_kop_surat}`)
          const letterHeader: ILetterHeader = headerRes.data?.data

          if (letterHeader) {
            let logoBase64 = ''
            try {
              if (letterHeader.url_logo) {
                logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
              }
            } catch (e) {
              console.warn('[HandleSave] Gagal konversi logo ke base64:', e)
            }

            const pdfDefinition = GenerateLetterPdfDefinition(data, letterHeader, logoBase64)
            // @ts-ignore
            const blob = await pdfmake.createPdf(pdfDefinition).getBlob()
            const url = URL.createObjectURL(blob)

            // Cleanup URL sebelumnya jika ada
            cleanupPdfUrl()

            pdfUrlRef.current = url
            setPdfUrl(url)
            setOpenPdfDialog(true)
          } else {
            console.warn('[HandleSave] Header kopsurat tidak ditemukan')
            toast.warning('Header kopsurat tidak ditemukan, PDF tidak dapat di-generate')
          }
        }

        setLoading(false)
        toast.success(res.data.message || 'Success')
      }
    } catch (err: any) {
      setLoading(false)
      toast.error(err?.response?.data?.message || err?.message || 'Error')
    }
  }

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      cleanupPdfUrl()
    }
    setOpenPdfDialog(open)
  }

  return (
    <>
      <div>
        <FormCreateLetterCustomize
          template={template}
          form={form}
          loading={loading}
          HandleSave={HandleSave}
        />
      </div>

      <DialogBasic
        title="Preview Surat"
        open={openPdfDialog}
        setOpen={handleCloseDialog}
        className={'min-w-5xl'}
      >
        <div className="w-full h-[80vh]">
          {pdfUrl && (
            <iframe src={pdfUrl} className="w-full h-full border-0" title="Preview Surat PDF" />
          )}
        </div>
        <Link
          className={'w-full flex items-center justify-end'}
          to={`/modules/e-office/letter-generation/letter-list/detail/${id}`}
        >
          <div className={'text-white rounded p-1.5 bg-primary'}>Lanjutkan</div>
        </Link>
      </DialogBasic>
    </>
  )
}
export default UpdatedLetterByTemplate

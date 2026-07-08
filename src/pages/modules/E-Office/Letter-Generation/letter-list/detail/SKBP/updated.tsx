import FormSuratBebasPustaka from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratBebasPustaka/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import {
  ResolverSBP,
  type TResolverSBP,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratBebasPustaka/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSKBP } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBP/hook.tsx'
import { format } from 'date-fns'
import { GenerateSKBPLetter } from './pdfgenerate.ts'
import type { ISKBPLetter } from './types.ts'
import { GetBase64FromUrl, UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

const UpdatedSuratBebasPustakaPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { letter } = UseLetterDetailSKBP(id as string)
  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)
  const { template } = UseGetTemplateByCodeLetter('SKBP-1')
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })

  const form = useForm<TResolverSBP>({
    resolver: zodResolver(ResolverSBP),
    mode: 'onChange',
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
      ketentuan_bebas_pustaka: [''],
      tujuan_pembuatan_surat: [''],
    },
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...letter,
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        prodi: letter?.nama_prodi,
        Fakultas: letter?.nama_fakultas,
        jenjang: letter?.nama_jenjang,
        semester: letter?.semester_masuk,
      })
    }
  }, [letter])

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

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

  const HandlePreview = async (value: TResolverSBP) => {
    setLoading(true)
    try {
      const selectedHeader = (letterHeader ?? []).find(h => h.id_kop_surat === value.id_kop_surat)

      let logoBase64 = ''
      try {
        if (selectedHeader?.url_logo) {
          logoBase64 = await GetBase64FromUrl(selectedHeader.url_logo)
        }
      } catch (e) {
        console.warn('[HandlePreview] Gagal konversi logo ke base64:', e)
      }

      const selectedInstitution = (institution ?? []).find(
        i => i.id_satuan_organisasi === value.id_satuan_kerja_penandatangan
      )

      const data = {
        ...value,
        nomor_surat: value.id_nomor_surat_otomatis,
        nama_satuan_kerja_penandatangan: selectedInstitution?.nama ?? '',
        nama_prodi: value.prodi ?? null,
        nama_fakultas: value.Fakultas ?? null,
        nama_jenjang: value.jenjang ?? null,
        kode_jenjang: null,
        semester_masuk: value.semester ?? 0,
        kop_surat: selectedHeader ?? ({} as ILetterHeader),
      } as unknown as ISKBPLetter

      const pdfDefinition = GenerateSKBPLetter({ logo: logoBase64, data, header: selectedHeader ?? ({} as ILetterHeader) })
      const blob = await pdfmake.createPdf(pdfDefinition).getBlob()
      const url = URL.createObjectURL(blob)
      cleanupPdfUrl()

      pdfUrlRef.current = url
      setPdfUrl(url)
      setOpenPdfDialog(true)
      toast.success('Preview berhasil dibuat')
    } catch (err: any) {
      toast.error(err?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const HandleSave = async (value: TResolverSBP) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-bebas-pustaka/${letter?.id_mail_surat_bebas_pustaka}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          form.reset()
          navigate(
            `/modules/e-office/letter-generation/letter-list?id_template=${template?.id_mail_jenis_template_surat}`
          )
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      cleanupPdfUrl()
    }
    setOpenPdfDialog(open)
  }

  return (
    <>
      <FormSuratBebasPustaka
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        HandlePreview={HandlePreview}
      />

      <DialogBasic
        title="Preview Surat"
        open={openPdfDialog}
        setOpen={handleCloseDialog}
        disableOutsideDialog
        className={'min-w-5xl'}
      >
        <div className="w-full h-[80vh]">
          {pdfUrl && (
            <iframe src={pdfUrl} className="w-full h-full border-0" title="Preview Surat PDF" />
          )}
        </div>
      </DialogBasic>
    </>
  )
}

export default UpdatedSuratBebasPustakaPage

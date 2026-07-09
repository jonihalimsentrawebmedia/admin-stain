import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import FormSuratPengantarPenelitian from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarPenelitian/components/form.tsx'
import { ResolverSPP, type TResolverSPP } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { GenerateLetterSKPP } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPP/pdfgenerate.ts'
import type { ISPPLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPP/types.ts'
import { GetBase64FromUrl, UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'
import { UseGetDetailLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'

const SuratPengantarPenelitianPage = () => {
  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)
  const { template } = UseGetTemplateByCodeLetter('SPP-1')
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })
  const navigate = useNavigate()

  const form = useForm<TResolverSPP>({
    resolver: zodResolver(ResolverSPP),
    mode: 'onChange',
  })
  const { letterNumber } = UseGetDetailLetterNumberAutomatic(form.watch('id_nomor_surat_otomatis') ?? '')

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

  const HandlePreview = async (value: TResolverSPP) => {
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

      const generatedNumber = GenerateLetterCodeNumber({
        kode_depan: letterNumber?.kode_depan ?? '',
        kode_belakang: letterNumber?.kode_belakang ?? '',
        urutan_tahun: letterNumber?.urutan_tahun ?? 5,
        urutan_bulan: letterNumber?.urutan_bulan ?? 4,
        urutan_kode_depan: letterNumber?.urutan_kode_depan ?? 1,
        urutan_kode_belakang: letterNumber?.urutan_kode_belakang ?? 2,
        urutan_nomor_surat: letterNumber?.urutan_posisi_utama_no_surat ?? 3,
        is_bulan: letterNumber?.is_perlu_bulan ?? false,
        is_bulan_romawi: letterNumber?.is_bulan_romawi ?? false,
        is_tahun: letterNumber?.is_perlu_tahun ?? false,
        date: value.tanggal_surat,
      }, value.nomor_urut_manual ?? '0001')

      const data = {
        ...value,
        nomor_surat: generatedNumber.replace(/<[^>]*>/g, ''),
        nama_satuan_kerja_penandatangan: selectedInstitution?.nama ?? '',
        nama_prodi: value.prodi ?? null,
        nama_fakultas: value.Fakultas ?? null,
        nama_jenjang: value.jenjang ?? null,
        kode_jenjang: value.kode_jenjang ?? '',
        semester_masuk: value.semester ?? 0,
        semester_masuk_label: value.semester ? `Semester ${value.semester}` : '',
        kop_surat: selectedHeader ?? ({} as ILetterHeader),
      } as unknown as ISPPLetter

      const pdfDefinition = GenerateLetterSKPP({ data, header: selectedHeader ?? ({} as ILetterHeader), logo: logoBase64 })
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

  const HandleSave = async (value: TResolverSPP) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-pengantar-penelitian`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          navigate('/modules/e-office/letter-generation/letter-list')
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
      <FormSuratPengantarPenelitian
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

export default SuratPengantarPenelitianPage

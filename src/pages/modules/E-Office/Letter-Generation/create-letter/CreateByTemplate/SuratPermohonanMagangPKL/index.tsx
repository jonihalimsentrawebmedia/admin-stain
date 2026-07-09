import FormSuratPermohonanMagangPKL from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL/components/form.tsx'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverLetterPKL,
  type TResolverLetterPKL,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { generateSPMLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPM/pdfgenerate.ts'
import type { ISPMLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPM/types.ts'
import { GetBase64FromUrl, UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { IStudentDataStatus } from '@/pages/modules/E-Office/reference/studentStatusLetter/types.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'
import { UseGetDetailLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'

const SuratPermohonanMagangPKL = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)
  const { template } = UseGetTemplateByCodeLetter('SPM-1')
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })

  const form = useForm<TResolverLetterPKL>({
    resolver: zodResolver(ResolverLetterPKL),
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

  const HandlePreview = async (value: TResolverLetterPKL) => {
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

      const studentRes = await AxiosClient.get('/eoffice/ref/mahasiswa-status-kkn-magang?limit=9999')
      const allStudents: IStudentDataStatus[] = studentRes.data?.data ?? []
      const selectedStudents = allStudents.filter((s: IStudentDataStatus) => value.id_mahasiswa?.includes(s.id_mahasiswa))
      const mahasiswa_list = selectedStudents.map((s: IStudentDataStatus) => ({
        id_mahasiswa: s.id_mahasiswa,
        nim: s.nim,
        nama_mahasiswa: s.nama_mahasiswa,
        nama_prodi: s.nama_prodi,
        nama_fakultas: s.nama_fakultas,
        nama_agama: '',
        angkatan: '',
        semester_masuk: s.semester_masuk,
        kode_jenjang_pendidikan: s.kode_jenjang_pendidikan,
        nama_jenjang_pendidikan: s.nama_jenjang_pendidikan,
      }))

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
        nim: '',
        nama_mahasiswa: '',
        nama_prodi: '',
        nama_fakultas: '',
        nama_agama: '',
        angkatan: '',
        semester_masuk: 0,
        kode_jenjang_pendidikan: '',
        nama_jenjang_pendidikan: '',
        mahasiswa_list,
        kop_surat: selectedHeader ?? ({} as ILetterHeader),
      } as unknown as ISPMLetter

      const pdfDefinition = generateSPMLetter(data, logoBase64)
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

  const HandleSave = async (value: TResolverLetterPKL) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-permohonan-magang`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
      tanggal_selesai: new Date(value.tanggal_selesai).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
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
      <FormSuratPermohonanMagangPKL
        template={template}
        loading={loading}
        form={form}
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

export default SuratPermohonanMagangPKL

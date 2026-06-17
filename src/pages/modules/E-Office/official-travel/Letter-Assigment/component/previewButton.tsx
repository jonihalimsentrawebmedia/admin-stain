import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TResolverLetterTask } from '../data/resolver.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { ILetterAssignment, ILetterAssignmentEmployee } from '../data/types.ts'
import { GenerateAssignmentLetter } from './letterAssignment.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import pdfmake from '@/utils/pdfmake.ts'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaDownload, FaPrint, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'

// Human resource minimal shape (what we need for signer lookup)
interface HumanResourceItem {
  id_sdm: string
  nama: string
  nip?: string
  jabatan_pegawai?: string
}

interface Props {
  form: UseFormReturn<TResolverLetterTask>
  humanResource: HumanResourceItem[]
  letterHeader: ILetterHeader[]
}

const PreviewButton = ({ form, humanResource, letterHeader }: Props) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const pdfUrlRef = useRef<string>('')

  // Cleanup blob URL
  const cleanupPdfUrl = useCallback(() => {
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current)
      pdfUrlRef.current = ''
    }
    setPdfUrl('')
  }, [])

  useEffect(() => {
    return () => cleanupPdfUrl()
  }, [cleanupPdfUrl])

  const handlePreview = async () => {
    // 1. Validate all form fields first
    const isValid = await form.trigger()
    if (!isValid) {
      toast.error('Lengkapi semua field yang wajib diisi terlebih dahulu')
      return
    }

    setLoading(true)

    try {
      const values = form.getValues()

      // 2. Get the selected kop surat for header
      const kopSurat =
        letterHeader?.find((kh) => kh.id_kop_surat === values.id_kop_surat) ?? null

      if (!kopSurat) {
        toast.error('Kop surat tidak ditemukan')
        setLoading(false)
        return
      }

      // 3. Get logo base64
      const logoBase64 = await GetBase64FromUrl(kopSurat.url_logo)

      // 4. Look up signer details
      const signer = humanResource?.find((hr) => hr.id_sdm === values.disahkan_oleh)

      // 5. Build a minimal ILetterAssignment from form data for PDF generation
      const pegawai: ILetterAssignmentEmployee[] = values.pegawai.map((emp, idx) => ({
        id_mail_surat_tugas_pegawai: '',
        id_satuan_organisasi: '',
        id_mail_surat_tugas: '',
        id_sdm: emp.id_sdm ?? '',
        metode_tambah: emp.metode_tambah,
        nama_lengkap: emp.nama_lengkap,
        nama_sdm: emp.nama_lengkap,
        nik: emp.nik ?? '',
        nip: emp.nip ?? '',
        satuan_kerja: emp.satuan_kerja ?? '',
        jabatan_pegawai: emp.jabatan_pegawai ?? '',
        hp: emp.hp ?? '',
        alamat: emp.alamat ?? '',
        tanggal_berangkat: '',
        tanggal_pulang: '',
        no_spd: null,
        urutan: idx + 1,
        created_at: '',
        created_user: '',
        updated_at: '',
        updated_user: '',
        nama_user_created: '',
        nama_user_updated: '',
      }))

      const previewData: ILetterAssignment = {
        id_mail_surat_tugas: '',
        id_satuan_organisasi: kopSurat.id_satuan_organisasi,
        id_kop_surat: values.id_kop_surat,
        id_nomor_surat_otomatis: values.id_nomor_surat_otomatis,
        nomor_surat: values.nomor_urut_manual || '(Nomor akan digenerate saat disimpan)',
        nomor_urut_manual: values.nomor_urut_manual ?? null,
        tanggal_surat: values.tanggal_surat,
        dasar_surat_tugas: values.dasar_surat_tugas,
        tanggal_mulai: values.tanggal_mulai,
        tanggal_akhir: values.tanggal_akhir,
        tempat_kegiatan: values.tempat_kegiatan,
        kegiatan: values.kegiatan,
        disahkan_oleh: values.disahkan_oleh,
        nama_disahkan_oleh: signer?.nama ?? '',
        nama_jabatan_struktural: signer?.jabatan_pegawai ?? null,
        nip: signer?.nip ?? '',
        url_file_undangan: null,
        key_file_undangan: null,
        nama_user_created: '',
        nama_unit_kerja: kopSurat.nama_unit,
        kop_surat: kopSurat as any,
        sppd: [],
        pegawai,
      }

      // 6. Generate PDF
      const config = GenerateAssignmentLetter({
        data: previewData,
        base64Logo: logoBase64,
        kop_surat: kopSurat,
      })

      const blob = await (pdfmake.createPdf(config) as any).getBlob()
      const url = URL.createObjectURL(blob)

      cleanupPdfUrl()
      pdfUrlRef.current = url
      setPdfUrl(url)
      setOpen(true)
    } catch (err: any) {
      toast.error(err?.message || 'Gagal membuat preview PDF')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!pdfUrl) return
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Surat_Tugas_SPD.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    if (!pdfUrl) return
    const win = window.open(pdfUrl, '_blank')
    if (win) {
      win.onload = () => win.print()
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        onClick={handlePreview}
      >
        <FaEye className="mr-2 size-3" />
        {loading ? 'Memproses...' : 'Preview'}
      </Button>

      {/* Dialog Preview PDF */}
      <DialogBasic
        open={open}
        setOpen={setOpen}
        title="Preview Surat Tugas / SPD"
        className="min-w-5xl w-full"
      >
        <div className="space-y-4">
          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <p>Sedang memproses PDF...</p>
            </div>
          )}

          {/* PDF Preview */}
          {pdfUrl && !loading && (
            <iframe
              src={pdfUrl}
              className="w-full h-[500px] border rounded-lg"
              title="Preview Surat Tugas"
            />
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="text-green-600 border-green-400 hover:bg-green-50"
                disabled={!pdfUrl || loading}
                onClick={handleDownload}
              >
                <FaDownload className="mr-2 size-3" />
                Download
              </Button>
              <Button
                className="text-white"
                disabled={!pdfUrl || loading}
                onClick={handlePrint}
              >
                <FaPrint className="mr-2 size-3" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </DialogBasic>
    </>
  )
}

export default PreviewButton

import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormLetterTask from '../component/form.tsx'
import { ResolverLetterTask, type TResolverLetterTask } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { GenerateAssignmentLetter } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/letterAssignment.ts'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { toast } from 'react-toastify'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaDownload, FaPrint, FaExternalLinkAlt } from 'react-icons/fa'

const CreatedLetterAssigment = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const pdfUrlRef = useRef<string>('')

  const form = useForm<TResolverLetterTask>({
    resolver: zodResolver(ResolverLetterTask),
  })

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

  const HandleSave = async (value: TResolverLetterTask) => {
    setLoading(true)
    const tempEmployee = value?.pegawai.map((row, k) => ({
      ...row,
      urutan: k + 1,
    }))

    try {
      const res = await AxiosClient.post('/eoffice/mail-surat-tugas', {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
        tanggal_akhir: new Date(value.tanggal_akhir).toISOString(),
        pegawai: tempEmployee,
      })

      if (res.data.status) {
        setLoading(false)
        setPdfLoading(true)

        const headerRes = await AxiosClient.get(`/eoffice/kop-surat/detail/${value.id_kop_surat}`)
        const letterHeader: ILetterHeader = headerRes.data?.data
        const logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
        const config = GenerateAssignmentLetter({
          data: res.data.data,
          base64Logo: logoBase64,
          kop_surat: letterHeader,
        })

        // Buat blob & tampilkan di dialog
        const blob = await (pdfmake.createPdf(config) as any).getBlob()
        const url = URL.createObjectURL(blob)

        cleanupPdfUrl()
        pdfUrlRef.current = url
        setPdfUrl(url)
        setPdfLoading(false)
        setOpen(true)
      }
    } catch (err: any) {
      setLoading(false)
      setPdfLoading(false)
      toast.error(err?.response?.data?.message || 'Error')
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
      <div className="space-y-5">
        <ButtonTitleGroup label={'Buat Surat Tugas / SPD'} buttonGroup={[]} />
        <FormLetterTask form={form} loading={loading} HandleSave={HandleSave} />
      </div>

      {/* Dialog preview PDF */}
      <DialogBasic
        open={open}
        setOpen={setOpen}
        title="Preview Surat Tugas / SPD"
        className="max-w-4xl w-full"
      >
        <div className="space-y-4">
          {/* Loading state */}
          {pdfLoading && (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <p>Sedang memproses PDF...</p>
            </div>
          )}

          {/* PDF Preview */}
          {pdfUrl && !pdfLoading && (
            <iframe
              src={pdfUrl}
              className="w-full h-[500px] border rounded-lg"
              title="Preview Surat Tugas"
            />
          )}

          {/* Tombol aksi */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-400 hover:bg-blue-50"
              onClick={() =>
                navigate('/modules/e-office/official-travel/letter-assignment')
              }
            >
              <FaExternalLinkAlt className="mr-2 size-3" />
              Ke Daftar Surat Tugas
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="text-green-600 border-green-400 hover:bg-green-50"
                disabled={!pdfUrl || pdfLoading}
                onClick={handleDownload}
              >
                <FaDownload className="mr-2 size-3" />
                Download
              </Button>
              <Button
                className="text-white"
                disabled={!pdfUrl || pdfLoading}
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

export default CreatedLetterAssigment

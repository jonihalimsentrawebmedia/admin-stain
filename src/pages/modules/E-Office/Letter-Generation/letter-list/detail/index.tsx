import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { GenerateLetterPdfDefinition } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/pdfconfig.ts'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { IMailInvitationLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/types.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import pdfmake from '@/utils/pdfmake.ts'
import { UseGetDetailLetterGenerate } from '@/pages/modules/E-Office/Letter-Generation/letter-list/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { FaDownload, FaFilePdf, FaPrint } from 'react-icons/fa'
import { toast } from 'react-toastify'
import ButtonStatusOnce from '@/pages/modules/E-Office/Letter-Generation/letter-list/component/buttonStatus.tsx'
import ButtonCancelStatus from '@/pages/modules/E-Office/Letter-Generation/letter-list/component/buttonCancel.tsx'

const DetailLetterTemplate = () => {
  const { id } = useParams<{ id: string }>()
  const { letter, loading } = UseGetDetailLetterGenerate(id as string)

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [letterData, setLetterData] = useState<IMailInvitationLetter | null>(null)
  const [letterHeader, setLetterHeader] = useState<ILetterHeader | null>(null)
  const pdfUrlRef = useRef<string | null>(null)

  // Cleanup blob URL
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

  // Generate PDF ketika data letter berubah
  const generatePdf = async (data: IMailInvitationLetter) => {
    setPdfLoading(true)
    try {
      let headerData = letterHeader

      // Fetch header jika belum ada
      if (!headerData && data?.id_satuan_organisasi) {
        const headerRes = await AxiosClient.get(`/eoffice/kop-surat/${data.id_satuan_organisasi}`)
        headerData = headerRes.data?.data
        if (headerData) {
          setLetterHeader(headerData)
        }
      }

      if (headerData) {
        let logoBase64 = ''
        try {
          if (headerData.url_logo) {
            logoBase64 = await GetBase64FromUrl(headerData.url_logo)
          }
        } catch (e) {
          console.warn('[Detail] Gagal konversi logo ke base64:', e)
        }

        cleanupPdfUrl()

        // logoBase64 dari GetBase64FromUrl sudah berupa data URL lengkap → pakai langsung
        const pdfDefinition = GenerateLetterPdfDefinition(data, headerData, logoBase64)
        // @ts-ignore
        const blob = await pdfmake.createPdf(pdfDefinition).getBlob()
        const url = URL.createObjectURL(blob)
        pdfUrlRef.current = url
        setPdfUrl(url)
      } else {
        console.warn('[Detail] Header kopsurat tidak ditemukan')
        toast.warning('Header kopsurat tidak ditemukan')
      }
    } catch (err) {
      console.error('[Detail] Gagal generate PDF:', err)
      toast.error('Gagal generate PDF')
    } finally {
      setPdfLoading(false)
    }
  }

  // Generate ulang ketika data letter siap
  useEffect(() => {
    if (letter && !letterData) {
      setLetterData(letter)
      generatePdf(letter)
    }
  }, [letter])

  const handleDownload = async () => {
    if (!letterData || !letterHeader) {
      toast.error('Data surat belum siap')
      return
    }
    setDownloadLoading(true)
    try {
      let logoBase64 = ''
      try {
        if (letterHeader.url_logo) {
          logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
        }
      } catch (e) {
        console.warn('[Download] Gagal konversi logo:', e)
      }

      const pdfDefinition = GenerateLetterPdfDefinition(letterData, letterHeader, logoBase64)
      // @ts-ignore
      const blob = await pdfmake.createPdf(pdfDefinition).getBlob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${letterData.nomor_surat || 'surat'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      toast.success('PDF berhasil di-download')
    } catch (err) {
      console.error('[Download] Gagal download PDF:', err)
      toast.error('Gagal download PDF')
    } finally {
      setDownloadLoading(false)
    }
  }

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, '_blank')
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Detail Surat Undangan'} buttonGroup={[]} />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-[12rem_1fr] gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="contents">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-64" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[500px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!letter) {
    return (
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Detail Surat Undangan'} buttonGroup={[]} />
        <Card>
          <CardContent className="py-10">
            <p className="text-center text-gray-500">Data surat tidak ditemukan</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig: Record<string, { label: string; className: string }> = {
    MENUNGGU: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    DISETUJUI: { label: 'Disetujui', className: 'bg-green-100 text-green-800 border-green-300' },
    DITOLAK: { label: 'Ditolak', className: 'bg-red-100 text-red-800 border-red-300' },
    DIPROSES: { label: 'Diproses', className: 'bg-blue-100 text-blue-800 border-blue-300' },
    SELESAI: { label: 'Selesai', className: 'bg-green-100 text-green-800 border-green-300' },
    DIBATALKAN: { label: 'Dibatalkan', className: 'bg-gray-100 text-gray-800 border-gray-300' },
    DIHAPUS: { label: 'Dihapus', className: 'bg-red-100 text-red-800 border-red-300' },
  }

  const statusInfo = statusConfig[letter.status] ?? {
    label: letter.status,
    className: 'bg-gray-100 text-gray-800 border-gray-300',
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <ButtonTitleGroup
        isBack
        label={'Detail Surat Undangan'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <Button
                key="btn-preview"
                className="text-white"
                disabled={pdfLoading}
                onClick={() => {
                  if (letterData && letterHeader) {
                    generatePdf(letterData)
                  } else {
                    toast.error('Data surat belum siap')
                  }
                }}
              >
                {pdfLoading ? (
                  <span className="mr-2 size-4 animate-spin inline-block border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <FaFilePdf className="mr-1" />
                )}
                {pdfLoading ? 'Memproses...' : 'Refresh PDF'}
              </Button>
            ),
          },
          {
            type: 'custom',
            element: (
              <Button
                key="btn-download"
                variant="outline"
                className="bg-white text-red-600 border-red-400 hover:bg-red-50 hover:text-red-700"
                disabled={downloadLoading || !pdfUrl}
                onClick={handleDownload}
              >
                {downloadLoading ? (
                  <span className="mr-2 size-4 animate-spin inline-block border-2 border-red-400 border-t-transparent rounded-full" />
                ) : (
                  <FaDownload className="mr-2 size-4" />
                )}
                {downloadLoading ? 'Memproses...' : 'Download PDF'}
              </Button>
            ),
          },
          {
            type: 'custom',
            element: (
              <Button
                key="btn-print"
                variant="outline"
                className="bg-white text-blue-600 border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                disabled={!pdfUrl}
                onClick={handlePrint}
              >
                <FaPrint className="mr-2 size-4" />
                Cetak
              </Button>
            ),
          },
        ]}
      />

      {/* Informasi Surat */}
      <Card className="rounded">
        <CardHeader>
          <CardTitle>Informasi Surat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[12rem_1fr_12rem_1fr] gap-x-6 gap-y-3">
            <p className="text-gray-500">Nomor Surat</p>
            <p className="font-medium">{letter.nomor_surat || '-'}</p>

            <p className="text-gray-500">Jenis Surat</p>
            <p>{letter.nama_jenis_surat || '-'}</p>

            <p className="text-gray-500">Perihal</p>
            <p>{letter.perihal || '-'}</p>

            <p className="text-gray-500">Status</p>
            <p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.className}`}
              >
                {statusInfo.label}
              </span>
            </p>

            <p className="text-gray-500">Tanggal Surat</p>
            <p>
              {letter.tanggal_surat
                ? format(new Date(letter.tanggal_surat), 'dd MMMM yyyy', { locale: localeId })
                : '-'}
            </p>

            <p className="text-gray-500">Tempat Surat</p>
            <p>{letter.tempat_surat || '-'}</p>

            <p className="text-gray-500">Yang Terhormat</p>
            <p
              dangerouslySetInnerHTML={{
                __html: letter.yang_terhormat || '-',
              }}
            />

            <p className="text-gray-500">Di</p>
            <p>{letter.di || '-'}</p>

            <p className="text-gray-500">Dibuat Oleh</p>
            <p>{letter.nama_user_created || '-'}</p>

            <p className="text-gray-500">Diupdate Oleh</p>
            <p>{letter.nama_user_updated || '-'}</p>

            <p className="text-gray-500">Dibuat Pada</p>
            <p>
              {letter.created_at
                ? format(new Date(letter.created_at), 'dd MMMM yyyy HH:mm', { locale: localeId })
                : '-'}
            </p>

            <p className="text-gray-500">Diupdate Pada</p>
            <p>
              {letter.updated_at
                ? format(new Date(letter.updated_at), 'dd MMMM yyyy HH:mm', { locale: localeId })
                : '-'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Surat */}
      <div className="flex items-start gap-4">
        <Card className="rounded w-1/2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Preview Surat</CardTitle>
            {pdfLoading && (
              <span className="text-sm text-blue-600 flex items-center gap-1.5">
                <span className="size-3 animate-spin inline-block border-2 border-blue-600 border-t-transparent rounded-full" />
                Menggenerate PDF...
              </span>
            )}
          </CardHeader>
          <CardContent>
            {pdfLoading && !pdfUrl ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <FaFilePdf className="size-16 mb-4 text-gray-300" />
                <p className="text-lg">Sedang memproses PDF...</p>
                <p className="text-sm mt-1">Mohon tunggu beberapa saat</p>
              </div>
            ) : pdfUrl ? (
              <div className="w-full border rounded-lg overflow-hidden">
                <iframe
                  src={pdfUrl}
                  className="w-full h-[600px] border-0"
                  title="Preview Surat PDF"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <FaFilePdf className="size-16 mb-4 text-gray-300" />
                <p className="text-lg">PDF belum tersedia</p>
                <p className="text-sm mt-1">Data header surat tidak ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
        <div>
          <p>
            Surat Undangan akan ditulis berdasarkan data yang Anda masukkan. Harap periksa kembali
            untuk menghindari kesalahan penulisan surat.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <ButtonStatusOnce data={letter as any} />
            <ButtonCancelStatus data={letter as any} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailLetterTemplate

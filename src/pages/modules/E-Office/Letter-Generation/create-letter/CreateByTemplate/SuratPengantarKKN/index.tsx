import { useEffect, useRef, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useForm } from 'react-hook-form'
import FormSuratPengantarKKN from './components/form.tsx'
import { ResolverKKN, type TResolverKKN } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { generateSPKLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPK/pdfgenerate.ts'
import type { ISPKLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPK/types.ts'
import { GetBase64FromUrl, UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { IStudentDataStatus } from '@/pages/modules/E-Office/reference/studentStatusLetter/types.ts'
import type { IHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

const SuratPengantarKKN = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)
  const { template } = UseGetTemplateByCodeLetter('SPK-1')
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })

  const form = useForm<TResolverKKN>({
    resolver: zodResolver(ResolverKKN),
    mode: 'onChange',
  })

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

  const HandlePreview = async (value: TResolverKKN) => {
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
        kode_jenjang: s.kode_jenjang_pendidikan,
        nama_jenjang: s.nama_jenjang_pendidikan,
      }))

      const dplRes = await AxiosClient.get('/eoffice/ref/sdm?limit=9999')
      const allDpl: IHumanResource[] = dplRes.data?.data ?? []
      const selectedDpl = allDpl.filter((d: IHumanResource) => value.id_dpl?.includes(d.id_sdm))
      const dpl_detail = selectedDpl.map((d: IHumanResource) => ({
        id_sdm: d.id_sdm,
        nama: d.nama,
        nip: d.nip,
        nidn: d.nidn,
        kode_jenjang: (d as any).kode_jenjang ?? '',
        nama_unit: d.nama_unit_kerja,
        nama_jenjang: (d as any).nama_jenjang ?? '',
      }))

      const data = {
        ...value,
        nomor_surat: value.id_nomor_surat_otomatis,
        nama_satuan_kerja_penandatangan: selectedInstitution?.nama ?? '',
        nim: '',
        nama_mahasiswa: '',
        nama_prodi: '',
        nama_status_mahasiswa: '',
        nama_jalur_masuk: '',
        nama_agama: '',
        angkatan: '',
        semester_masuk: 0,
        nama_fakultas: '',
        nama_jenjang: '',
        kode_jenjang: '',
        mahasiswa_list,
        dpl_detail,
        kop_surat: selectedHeader ?? ({} as ILetterHeader),
      } as unknown as ISPKLetter

      const pdfDefinition = generateSPKLetter(data, logoBase64)
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

  const HandleSave = async (value: TResolverKKN) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-pengantar-kkn`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
      tanggal_selesai: new Date(value.tanggal_selesai).toISOString(),
    })
      .then((res) => {
        if (res?.data.status) {
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
      <FormSuratPengantarKKN
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        HandlePreview={HandlePreview}
        template={template}
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

export default SuratPengantarKKN

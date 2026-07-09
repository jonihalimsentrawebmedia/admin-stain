import { useEffect, useRef, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import FormSuratPengantarObservasi from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarObservasi/components/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  ResolverSPO,
  type TResolverSPO,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarObservasi/data/resolver.tsx'
import { UseLetterDetailSPO } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPO/hook.tsx'
import { format } from 'date-fns'
import { GenerateLetterSPO } from './pdfgenerate.ts'
import type { ISPOLetter } from './types.tsx'
import { GetBase64FromUrl, UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { IStudentDataStatus } from '@/pages/modules/E-Office/reference/studentStatusLetter/types.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'
import { UseGetDetailLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'

const UpdatedSuratPengantarObservasiPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)

  const { letter } = UseLetterDetailSPO(id as string)
  const { template } = UseGetTemplateByCodeLetter('SPO-1')
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })

  const form = useForm<TResolverSPO>({
    resolver: zodResolver(ResolverSPO),
    mode: 'onChange',
  })

  const { letterNumber } = UseGetDetailLetterNumberAutomatic(form.watch('id_nomor_surat_otomatis') ?? '')

  useEffect(() => {
    if (letter) {
      form.reset({
        ...(letter as any),
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        tanggal_observasi: format(letter?.tanggal_observasi, 'yyyy-MM-dd'),
      })
    }
  }, [letter])

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const navigate = useNavigate()

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

  const HandlePreview = async (value: TResolverSPO) => {
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

      const selectedFaculty = (institution ?? []).find(
        i => i.id_satuan_organisasi === value.id_fakultas
      )
      const selectedProdi = (institution ?? []).find(
        i => i.id_satuan_organisasi === value.id_prodi
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
        nama_prodi: selectedProdi?.nama ?? null,
        nama_fakultas: selectedFaculty?.nama ?? null,
        nama_jenjang: null,
        kode_jenjang: null,
        semester_masuk: 0,
        semester_masuk_label: '',
        nim: '',
        nama_mahasiswa: '',
        mahasiswa_list,
        kop_surat: selectedHeader ?? ({} as ILetterHeader),
      } as unknown as ISPOLetter

      const pdfDefinition = GenerateLetterSPO({ logo: logoBase64, data, header: selectedHeader ?? ({} as ILetterHeader) })
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

  const HandleSave = async (value: TResolverSPO) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-pengantar-observasi/${letter?.id_mail_surat_pengantar_observasi}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_observasi: new Date(value.tanggal_observasi).toISOString(),
      }
    )
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
      <FormSuratPengantarObservasi
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
export default UpdatedSuratPengantarObservasiPage

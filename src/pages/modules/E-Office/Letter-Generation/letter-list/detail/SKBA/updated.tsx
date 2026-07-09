import FormSuratKeteranganBebasAkademik from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasAkademik/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import {
  ResolverSKBA,
  type TResolverSKBA,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasAkademik/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSKBA } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBA/hook.tsx'
import { GenerateSKBALetter } from './pdfgenerate.ts'
import type { ISKBALetter } from './types.ts'
import { GetBase64FromUrl, UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'
import { UseGetDetailLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'

const UpdatedSuratKeteranganBebasAkademikPage = () => {
  const { id } = useParams()
  const { letter } = UseLetterDetailSKBA(id as string)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openPdfDialog, setOpenPdfDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)
  const { template } = UseGetTemplateByCodeLetter('SKBA-1')
  const { letterHeader } = UseGetLetterHeaderRef()
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })

  const form = useForm<TResolverSKBA>({
    resolver: zodResolver(ResolverSKBA),
    mode: 'onChange',
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
      daftar_kewajiban_akademik: [''],
      tujuan_pembuatan_surat: [''],
    },
  })

  const { letterNumber } = UseGetDetailLetterNumberAutomatic(form.watch('id_nomor_surat_otomatis') ?? '')

  useEffect(() => {
    if (letter) {
      form.reset({
        ...letter,
        tanggal_surat: new Date(letter?.tanggal_surat).toISOString(),
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

  const HandlePreview = async (value: TResolverSKBA) => {
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
        kode_jenjang: letter?.kode_jenjang ?? '',
        semester_masuk: value.semester ?? 0,
        kop_surat: selectedHeader ?? ({} as ILetterHeader),
      } as unknown as ISKBALetter

      const pdfDefinition = GenerateSKBALetter({ logo: logoBase64, data, header: selectedHeader ?? ({} as ILetterHeader) })
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

  const HandleSave = async (value: TResolverSKBA) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-bebas-akademik/${letter?.id_mail_surat_bebas_akademik}`,
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
      <FormSuratKeteranganBebasAkademik
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

export default UpdatedSuratKeteranganBebasAkademikPage

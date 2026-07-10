// eoffice/mail-jenis-template-surat/kode-template/{{kode_template}}

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ILetterTemplateType {
  id_mail_jenis_template_surat: string
  id_satuan_organisasi: string
  id_jenis_surat: string
  kode_template: string
  nama_kode_template: string
  nama_jenis_template: string
  nama_jenis_surat: string
  urutan: number
  is_existing_template: boolean
  created_at: string
  created_user: string
  nama_user_created: string
  updated_at: string
  updated_user: string
  nama_user_updated: string
}

export const UseGetTemplateByCodeLetter = (kode_template: string) => {
  const { data, isLoading, isFetching } = useQuery<ILetterTemplateType>({
    queryKey: ['template-by-code-letter', kode_template],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-jenis-template-surat/kode-template/${kode_template}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { template: data, loading }
}

interface props {
  tahun_pengajuan: string
  semester_cuti: string
  periode: string
}

interface SemesterItem {
  label: string
  semester: number
  tahun_akademik: string
}

interface TahunAkademik {
  tahun_akademik_mulai: string
  tahun_akademik_selesai: string
  semester_list: SemesterItem[]
}

export const UseGetPeriodeCuti = (props?: props) => {
  const { tahun_pengajuan, semester_cuti, periode } = props ?? {}

  const Params = new URLSearchParams()
  if (tahun_pengajuan) Params.append('tahun_pengajuan', tahun_pengajuan)
  if (semester_cuti) Params.append('semester_cuti', semester_cuti)
  if (periode) Params.append('periode', periode)

  const { data, isLoading, isFetching } = useQuery<TahunAkademik>({
    queryKey: ['periode-cuti', Params.toString()],
    enabled: !!tahun_pengajuan && !!semester_cuti && !!periode,
    queryFn: () =>
      AxiosClient.get(
        `/eoffice/mail-surat-keterangan-cuti-akademik/preview-periode?${Params}`
      ).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { periode: data, loading }
}

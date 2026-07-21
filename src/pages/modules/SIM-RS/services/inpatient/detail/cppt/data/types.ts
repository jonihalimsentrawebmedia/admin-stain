import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ICPPTDaftarResepObat {
  id_obat: string
  nama_obat: string
  satuan: string
  frekuensi: number
  durasi: number
  jumlah: number
  total_harga: number
  harga_satuan: number
}

export interface ICPPTDiagnosisItem {
  id_diagnosis: string
  nama_diagnosis: string
}

export interface ICPPTProcedureItem {
  id_procedure: string
  nama_procedure: string
}

export interface ICPPTItem {
  id_cppt: string
  id_satuan_organisasi: string
  id_pendaftaran: string
  id_ruangan: string
  tanggal_catat: string
  id_dokter: string
  keluhan: string
  catatan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_dokter: string
  nama_pasien: string
  no_rekam_medis_pasien: string
  no_pendaftaran: string
  nama_ruangan: string
  nomor_ruangan: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  nama_spesialis: string
  id_diagnosis: string[] | null
  id_procedure: string[] | null
  id_obat: string[] | null
  daftar_diagnosis: ICPPTDiagnosisItem[] | null
  daftar_procedure: ICPPTProcedureItem[] | null
  daftar_resep_obat: ICPPTDaftarResepObat[] | null
}

export const UseGetCPPT = (id_pendaftaran: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery<ICPPTItem[]>({
    queryKey: ['cppt', id_pendaftaran],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/pelayanan/rawat-inap/${id_pendaftaran}/cppt`).then(
        (res) => res.data?.data
      ),
    enabled: !!id_pendaftaran,
  })

  const loading = isLoading || isFetching

  return { cpptList: data ?? [], loading, refetch }
}

export const UseGetDetailCPPT = (id_pendaftaran: string, id_cppt: string) => {
  const { data, isLoading, isFetching } = useQuery<ICPPTItem>({
    queryKey: ['detail-cppt', id_pendaftaran, id_cppt],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/pelayanan/rawat-inap/${id_pendaftaran}/cppt/${id_cppt}`).then(
        (res) => res.data?.data
      ),
    enabled: !!id_pendaftaran && !!id_cppt,
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

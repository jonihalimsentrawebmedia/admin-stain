import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IDiagnosisItem {
  id_diagnosis: string
  nama_diagnosis: string
}

export interface IProcedureItem {
  id_procedure: string
  nama_procedure: string
}

export interface IPemeriksaan {
  id_pemeriksaan: string
  id_satuan_organisasi: string
  no_pemeriksaan: string
  tanggal_pemeriksaan: string
  status: string
  id_pendaftaran: string
  keputusan: string
  keluhan_utama: string
  catatan: string
  id_diagnosis: string[]
  id_procedure: string[]
  daftar_diagnosis: IDiagnosisItem[]
  daftar_procedure: IProcedureItem[]
  no_rekam_medis_pasien: string
  nama_pasien: string
  jenis_kelamin_pasien: string
  tempat_lahir_pasien: string
  tanggal_lahir_pasien: string
  nama_poli: string
  nama_dokter: string
  no_pendaftaran: string
  tanggal_pendaftaran: string
  nama_satuan_organisasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetPemeriksaan = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IPemeriksaan>({
    queryKey: ['pemeriksaan', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/pelayanan/pemeriksaan/pendaftaran/${id}`).then((res) => res.data?.data),
    enabled: !!id,
  })

  const loading = isLoading || isFetching

  return { pemeriksaan: data, loading }
}

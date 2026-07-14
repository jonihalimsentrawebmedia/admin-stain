import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IPemeriksaan {
  id_pemeriksaan: string
  id_pendaftaran: string
  keluhan_utama: string
  diagnosa: string
  rencana_tindakan: string
  catatan: string
  keputusan: string
  created_at: string
  updated_at: string
  created_user: string
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

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface DetailProdi {
  id_satuan_organisasi: string
  nama: string
  id_parent: string
  nama_parent: string
  id_jenjang_pendidikan: string
  kode_jenjang_pendidikan: string
  nama_jenjang_pendidikan: string
}

export const UseGetDetailProdi = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<DetailProdi>({
    queryKey: ['detail-prodi', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/program-studi/satuan-organisasi/program-studi/${id}`).then(
        (res) => res?.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { detailProdi: data, loading }
}

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDashboard, IPendaftaranPerPoli, IGrafikKunjungan } from '../data/types.ts'

export const UseGetDashboard = () => {
  const { data, isLoading, isFetching } = useQuery<IDashboard>({
    queryKey: ['simrs-dashboard'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/dashboard').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { dashboard: data, loading }
}

export const UseGetPendaftaranPerPoli = () => {
  const { data, isLoading, isFetching } = useQuery<IPendaftaranPerPoli>({
    queryKey: ['simrs-dashboard-pendaftaran-per-poli'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/dashboard/pendaftaran-per-poli').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { pendaftaranPerPoli: data, loading }
}

export const UseGetGrafikKunjungan = (periode: string) => {
  const { data, isLoading, isFetching } = useQuery<IGrafikKunjungan>({
    queryKey: ['simrs-dashboard-grafik-kunjungan', periode],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/dashboard/grafik-kunjungan?periode=${periode}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { grafik: data, loading }
}
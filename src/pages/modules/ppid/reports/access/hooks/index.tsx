import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import type { StatistikLayanan } from "../model"

export const useGetYearReportAccess = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: [`year-report-access`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/unit-ppid/laporan-permohonan/tahun`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
export const useGetReportAccessChart = (year:string) => {
  const { data, isLoading, isFetching } = useQuery<StatistikLayanan>({
    queryKey: [`year-report-access`,year],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/unit-ppid/laporan-permohonan/grafik/${year}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { statistic: data ?? ({} as StatistikLayanan), loading }
}
import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { StatistikLayanan } from "../model"

export const useGetYearReportAccess = () => {
  const [year, setYear] = useState<number[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`year-report-access`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/unit-ppid/laporan-permohonan/tahun`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data)
    }
  }, [data])

  return { year, loading }
}
export const useGetReportAccessChart = (year:string) => {
  const [statistic, setStatistic] = useState<StatistikLayanan>({} as StatistikLayanan)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`year-report-access`,year],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/unit-ppid/laporan-permohonan/grafik/${year}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatistic(data)
    }
  }, [data])

  return { statistic, loading }
}
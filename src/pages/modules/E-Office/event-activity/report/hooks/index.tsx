import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface props extends BasicProps {
  year: string
}

export const UseGetReportEventActivity = (props: props) => {
  const { year, page, limit, search } = props
  const [report, setReport] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (year) Params.append('tahun', year ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['report-activity', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/acara/laporan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReport(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, report }
}

export const UseGetEventYear = () => {
  const [years, setYears] = useState<number[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-activity'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/acara/list-tahun').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYears(data?.data ?? [])
    }
  }, [data])

  return { years, loading }
}

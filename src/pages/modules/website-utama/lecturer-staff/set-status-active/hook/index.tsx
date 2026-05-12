import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IHistoryStatus } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/resolver.tsx'

interface Props extends BasicProps {
  id_sdm: string
}

export const UseGetHistoryStatusActive = (props?: Props) => {
  const { page, search, limit, id_sdm } = props ?? {}
  const [historyStatusActive, setHistoryStatusActive] = useState<IHistoryStatus[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['history-status-active', Params.toString(), id_sdm],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/list-status-history`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHistoryStatusActive(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { historyStatusActive, meta, loading }
}

export const UseGetDetailHistoryStatusActive = (id: string) => {
  const [detail, setDetail] = useState<IHistoryStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-history-status-active', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm-status-aktif-history/${id}`).then(
        (res) => res?.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export interface IReportStatusActive {
  id_status_aktif: string
  kode_status: string
  nama_status: string
  jumlah: number
}

export const UseGetReportStatusActive = () => {
  const [report, setReport] = useState<IReportStatusActive[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['report-status-active'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm-status-aktif/count`).then((res) => res?.data?.data),
  })

  useEffect(() => {
    if (data) {
      setReport(data)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { report, loading }
}

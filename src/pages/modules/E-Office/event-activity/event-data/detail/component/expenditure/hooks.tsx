import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { PrintExpenditure } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure/printExpenditure/types.ts'

interface props extends BasicProps {
  id_acara: string
}

export interface IExpenditureEvent {
  id_acara_pengeluaran: string
  id_acara: string
  id_satuan_organisasi: string
  uraian_pengeluaran: string
  tanggal_pengeluaran: string
  yang_membayar: string
  tempat_pembelian: string
  jumlah_pengeluaran: string
  url_file_pengeluaran: string | null
  key_file_pengeluaran: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetExpenditure = (props: props) => {
  const { search, limit, page, id_acara } = props
  const [expenditure, setExpenditure] = useState<IExpenditureEvent[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['expenditure', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/pengeluaran`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setExpenditure(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { expenditure, loading, meta }
}

export const UseGetTotalExpenditure = (id_acara: string) => {
  const [printData, setPrintData] = useState<PrintExpenditure>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['total-expenditure-print', id_acara],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/pengeluaran/print`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPrintData(data?.data)
    }
  }, [data])

  return { printData, loading }
}

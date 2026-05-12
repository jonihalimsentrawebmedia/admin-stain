import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IPublication } from '@/pages/modules/website-utama/publication/data/types.ts'

interface props extends BasicProps {
  year: string
}

export const UseGetPublicationLecturer = (props?: props) => {
  const { page, search, limit, year } = props ?? {}

  const [publication, setPublication] = useState<IPublication[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (year) Params.append('tahun', year ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['publication', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/publikasi-dosen?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPublication(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, publication }
}

export const UseGetYearPublication = () => {
  const [year, setYear] = useState<number[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-publication'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/publikasi-dosen-tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data)
    }
  }, [data])

  return { year, loading }
}

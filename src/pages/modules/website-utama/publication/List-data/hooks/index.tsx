import type { BasicProps } from '@/utils/globalType.ts'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPublication } from '../data/types'

interface props extends BasicProps {
  id_tahun_publikasi: string
}

export const UseGetPublication = (props?: props) => {
  const { page, search, limit, id_tahun_publikasi } = props ?? {}

  const [year, setYear] = useState<IPublication[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (id_tahun_publikasi) Params.append('id_tahun_publikasi', id_tahun_publikasi ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['publication', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/publikasi?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, year }
}

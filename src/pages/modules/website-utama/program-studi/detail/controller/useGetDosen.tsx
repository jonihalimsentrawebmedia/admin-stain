import { useEffect, useState } from 'react'
import type { Dosen } from '../model/dosen'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetDosen = () => {
  const [dosen, setDosen] = useState<Dosen[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-dosen', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/dosen?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDosen(data?.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { dosen, loading, meta }
}

export default useGetDosen

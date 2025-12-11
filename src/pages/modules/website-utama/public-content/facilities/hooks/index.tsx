import { useEffect, useState } from 'react'
import type { IFacilitiesDetail, IStatusFacilities } from '../data/index'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetFacilities = () => {
  const [listFacilities, setListFacilities] = useState<IFacilitiesDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-facilities', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/fasilitas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListFacilities(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listFacilities, loading, meta }
}

export const UseGetFacilitiesDetail = (id: string) => {
  const [detailFacilities, setDetailFacilities] = useState<IFacilitiesDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-facilities', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/fasilitas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailFacilities(data)
    }
  }, [data])

  return { detailFacilities, loading }
}

export const UseGetFacilitiesStatus = () => {
  const [status, setStatus] = useState<IStatusFacilities>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-facilities'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/fasilitas/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IStatusFacilitiesUnit, IUnitFacilities } from '../data'

export const UseGetFacilitiesUnit = () => {
  const [listFacilities, setListFacilities] = useState<IUnitFacilities[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const id_satuan_organisasi = searchParams.get('id-satuan-organisasi')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)
  if (id_satuan_organisasi) ParamsSearch.append('id-satuan-organisasi', id_satuan_organisasi)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-unit-facilities-editor', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/unit-fasilitas?${ParamsSearch}`).then((res) => res.data),
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

export const UseGetFacilitiesUnitDetail = (id: string) => {
  const [detailFacilities, setDetailFacilities] = useState<IUnitFacilities>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-facilities-unit-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/unit-fasilitas/${id}`).then((res) => res.data.data),
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
  const [status, setStatus] = useState<IStatusFacilitiesUnit>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-facilities-unit-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/unit-fasilitas/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogFacilities = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-facilities-unit-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/unit-fasilitas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}


import { useEffect, useState } from 'react'
import type { IFacilitiesDetail, IStatusFacilities } from '@/pages/modules/new_editor/publict-content/facilities/data/index'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetFacilities = () => {
  const [listFacilities, setListFacilities] = useState<IFacilitiesDetail[]>([])
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
    queryKey: ['list-facilities-editor', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/fasilitas?${ParamsSearch}`).then((res) => res.data),
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
    queryKey: ['detail-facilities-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/fasilitas/${id}`).then((res) => res.data.data),
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
    queryKey: ['status-facilities-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/fasilitas/status').then((res) => res.data.data),
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
    queryKey: ['log-facilities-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/fasilitas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

export const UseGetFacilitiesBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-facilities-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/fasilitas-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

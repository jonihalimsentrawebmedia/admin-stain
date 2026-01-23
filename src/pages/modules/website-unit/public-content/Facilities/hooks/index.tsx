import { useEffect, useState } from 'react'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IUnitFacilities } from '@/pages/modules/website-unit/public-content/Facilities/data/types.tsx'

export const UseGetFacilitiesUnit = (props: IPropsData) => {
  const { page, limit, status_publish } = props
  const [facilitiesUnit, setFacilitiesUnit] = useState<IUnitFacilities[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['facilities-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-fasilitas?${ParamsSearch}`).then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setFacilitiesUnit(data.data)
      setMeta(data.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { facilitiesUnit, loading, meta }
}

export const UseGetFacilitiesUnitDetail = (id: string) => {
  const [facilitiesUnitDetail, setFacilitiesUnitDetail] = useState<IUnitFacilities>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['facilities-unit-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-fasilitas/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFacilitiesUnitDetail(data)
    }
  }, [data])

  return { facilitiesUnitDetail, loading }
}

export const UseGetFacilitiesUnitStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['facilities-unit-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/unit-fasilitas/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogFacilitiesUnit = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-unit-facilities', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-fasilitas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

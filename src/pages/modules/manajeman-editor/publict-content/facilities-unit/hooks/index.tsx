import { useEffect, useState } from 'react'
import type { IUnitFacilities } from '../data/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

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

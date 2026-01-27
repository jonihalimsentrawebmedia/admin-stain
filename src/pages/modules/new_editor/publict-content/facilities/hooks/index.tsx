import { useEffect, useState } from 'react'
import type { IFacilitiesDetail } from '../data/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

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

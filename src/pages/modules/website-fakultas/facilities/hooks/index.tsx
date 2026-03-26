import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { meta } from 'zod'
import type { IFacilities } from '../data/types'

export const UseGetFacilitiesList = () => {
  const [listFacilities, setListFacilities] = useState<IFacilities[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['facilities'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/fasilitas').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListFacilities(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { listFacilities, loading, meta }
}

export const UseGetDetailFacilities = (id: string) => {
  const [detail, setDetail] = useState<IFacilities>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['facilities-detail'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/fasilitas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading, meta }
}

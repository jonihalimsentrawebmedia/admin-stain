import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGroupChief } from '../data/types.ts'

export const UseGetChiefOfficerGroup = () => {
  const [chiefOfficer, setChiefOfficer] = useState<IGroupChief[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['sdm-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/kelompok-pimpinan').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setChiefOfficer(data?.data)
    }
  }, [data])

  return { loading, meta, chiefOfficer }
}

export const UseGetChiefOfficerDetail = (id: string) => {
  const [detail, setDetail] = useState<IGroupChief>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-sdm-spi', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/kelompok-pimpinan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

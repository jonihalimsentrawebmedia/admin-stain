import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/types.ts'

export const USeGetUkkUkm = () => {
  const [ukkUkm, setUkkUkm] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk_ukm'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/ukk-ukm').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUkkUkm(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, ukkUkm }
}

export const UseGetUkkUkmDetail = (id: string) => {
  const [ukkUkm, setUkkUkm] = useState<IUkkUkm>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk_ukm', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/ukk-ukm/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUkkUkm(data)
    }
  }, [data])

  return { ukkUkm, loading }
}


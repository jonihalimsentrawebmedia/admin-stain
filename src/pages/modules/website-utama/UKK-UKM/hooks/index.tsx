import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const USeGetUkkUkm = (props: BasicProps) => {
  const { search, limit, page } = props
  const [ukkUkm, setUkkUkm] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk_ukm', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/ukk-ukm?${params}`).then((res) => res.data),
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

export const UseGetUkkUkmBackground = () => {
  const [background, setBackground] = useState<[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk-ukm-background'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

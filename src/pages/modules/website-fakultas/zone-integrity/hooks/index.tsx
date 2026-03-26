import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/data/types.ts'

export const UseGetZoneIntegrity = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [zoneIntegrity, setZoneIntegrity] = useState<IZoneIntegrity[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString())
  if (limit) ParamsSearch.append('limit', limit.toString())
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['zone-integrity', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-kategori?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setZoneIntegrity(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { zoneIntegrity, loading, meta }
}

export const UseGetDetailZoneIntegrity = (id: string) => {
  const [detail, setDetail] = useState<IZoneIntegrity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-zone-integrity', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-kategori/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

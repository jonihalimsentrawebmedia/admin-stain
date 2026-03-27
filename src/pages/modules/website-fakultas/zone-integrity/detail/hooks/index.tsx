import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { ISbuZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/detail/data/types.ts'

export const UseGetSubZoneIntegrity = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [subZoneIntegrity, setSubZoneIntegrity] = useState<ISbuZoneIntegrity[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString())
  if (limit) ParamsSearch.append('limit', limit.toString())
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['zone-integrity', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-sub-kategori?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSubZoneIntegrity(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { subZoneIntegrity, loading, meta }
}

export const UseGetDetailSubZoneIntegrity = (id: string) => {
  const [detail, setDetail] = useState<ISbuZoneIntegrity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-zone-integrity', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-sub-kategori/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

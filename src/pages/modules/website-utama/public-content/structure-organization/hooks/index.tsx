import { useEffect, useState } from 'react'
import type { IGroupOrganization } from '@/pages/modules/website-utama/public-content/structure-organization/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseStructureOrganization = () => {
  const [listGroupOrganization, setListGroupOrganization] = useState<IGroupOrganization[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-group-organization', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kelompok-organisasi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListGroupOrganization(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listGroupOrganization, loading, meta }
}

export const UseGetGroupOrganizationDetail = (id: string) => {
  const [detailGroupOrganization, setDetailGroupOrganization] = useState<IGroupOrganization>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-group-organization', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kelompok-organisasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailGroupOrganization(data)
    }
  }, [data])

  return { detailGroupOrganization, loading }
}

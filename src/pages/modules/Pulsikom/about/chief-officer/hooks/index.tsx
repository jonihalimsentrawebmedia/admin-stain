import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGroupChief } from '@/pages/modules/Pulsikom/about/chief-officer/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetChiefOfficerGroup = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [chiefOfficer, setChiefOfficer] = useState<IGroupChief[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['chief-officer', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/kelompok-pimpinan?${ParamsSearch}`).then((res) => res.data),
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
    queryKey: ['detail-officer', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/kelompok-pimpinan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

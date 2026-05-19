import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IUktEntrance } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/data/types.ts'

export const UseGetEntrance = (props: BasicProps) => {
  const { search, limit, page } = props
  const [entrance, setEntrance] = useState<IUktEntrance[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['entrance_ukt', params],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-masuk?${params.toString()}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEntrance(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { entrance, meta, loading }
}

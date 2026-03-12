import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { ISurveyQuestion } from '@/pages/modules/pusat-karir/survey/data/types.ts'

export const UseGetUUID = (id: string) => {
  const [uuid, setUuid] = useState()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['uuid', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/tmp-survei/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUuid(data)
    }
  }, [data])

  return { uuid, loading }
}

export const UseGetSurvey = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [survey, setSurvey] = useState<ISurveyQuestion[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['survey', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/survei?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSurvey(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { survey, meta, loading }
}

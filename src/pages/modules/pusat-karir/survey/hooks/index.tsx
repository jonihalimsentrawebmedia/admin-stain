import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type {
  IDetailSurveyQuestion,
  ISurveyQuestion,
} from '@/pages/modules/pusat-karir/survey/data/types.ts'
import type { SurveyDetail } from '@/pages/modules/pusat-karir/survey/statistic/types.ts'

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

interface props extends BasicProps {
  status?: string
}

export const UseGetSurvey = (props?: props) => {
  const { page, limit, search, status } = props ?? {}

  const [survey, setSurvey] = useState<ISurveyQuestion[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')
  if (status) ParamsSearch.append('status', status ?? 'DRAFT')

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

export const UseGetDetailSurvey = (id: string) => {
  const [detailSurvey, setDetailSurvey] = useState<IDetailSurveyQuestion>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-survey', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/survei/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailSurvey(data)
    }
  }, [data])

  return { detailSurvey, loading }
}

export const UseGetSurveyResult = (id: string) => {
  const [surveyResult, setSurveyResult] = useState<SurveyDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['survey-result', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/survei/${id}/hasil`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSurveyResult(data)
    }
  }, [data])

  return { surveyResult, loading }
}

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDetailSurvey,
  ISurvey,
  ISurveyDetailResult,
} from '@/pages/modules/E-Office/questionnaire/data/types.ts'

export const UseGetQuestionnaire = (props: BasicProps) => {
  const { search, limit, page } = props

  const [questionnaire, setQuestionnaire] = useState<ISurvey[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['questionnaire', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/survei?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setQuestionnaire(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, questionnaire }
}

export const UseGetDetailQuestionnaire = (id: string) => {
  const [questionnaire, setQuestionnaire] = useState<IDetailSurvey>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['questionnaire-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/survei/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setQuestionnaire(data ?? [])
    }
  }, [data])

  return { questionnaire, loading }
}

export const USeGetSurveyResult = (id: string) => {
  const [surveyResult, setSurveyResult] = useState<ISurveyDetailResult>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['survey-result'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/survei/${id}/hasil`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSurveyResult(data)
    }
  }, [data])

  return { surveyResult, loading }
}

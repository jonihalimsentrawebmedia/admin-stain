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

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ISurvey[]; meta: Meta }>({
    queryKey: ['questionnaire', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/survei?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, questionnaire: data?.data ?? [] }
}

export const UseGetDetailQuestionnaire = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDetailSurvey>({
    queryKey: ['questionnaire-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/survei/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { questionnaire: data, loading }
}

export const UseGetSurveyResult = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISurveyDetailResult>({
    queryKey: ['survey-result', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/survei/${id}/hasil`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { surveyResult: data, loading }
}

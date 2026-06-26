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
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['uuid', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/tmp-survei/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { uuid: data, loading }
}

interface props extends BasicProps {
  status?: string
}

export const UseGetSurvey = (props?: props) => {
  const { page, limit, search, status } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')
  if (status) ParamsSearch.append('status', status ?? 'DRAFT')

  const { data, isLoading, isFetching } = useQuery<{ data: ISurveyQuestion[]; meta: Meta }>({
    queryKey: ['survey', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/survei?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { survey: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailSurvey = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDetailSurveyQuestion>({
    queryKey: ['detail-survey', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/survei/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detailSurvey: data, loading }
}

export const UseGetSurveyResult = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<SurveyDetail>({
    queryKey: ['survey-result', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/survei/${id}/hasil`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { surveyResult: data, loading }
}

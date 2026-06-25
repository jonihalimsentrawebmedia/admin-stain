import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IProgramStudy } from '../data/types.ts'

export const UseGetStudyProgram = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.set('search', search ?? '')
  if (page) Params.set('page', page ?? '0')
  if (limit) Params.set('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-study-program', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/daftar-program-pendidikan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    listStudyProgram: data?.data as IProgramStudy[] ?? [],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}

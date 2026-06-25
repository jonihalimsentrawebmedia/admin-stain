import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface Props extends BasicProps {
  id_prodi: string
}

export const UseGetCurriculumPerProdi = (props?: Props) => {
  const { id_prodi, search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (id_prodi) Params.append('id_prodi', id_prodi)
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: ICurriculum[]; meta: Meta }>({
    queryKey: ['curriculum-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/kurikulum?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { curriculum: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetCurriculumDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICurriculum>({
    queryKey: ['curriculum-faculty', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/kurikulum/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { curriculumDetail: data, loading }
}

import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IStudentEntertainment } from '@/pages/modules/website-fakultas/community/student-life/entertainment/list-place/data/types.ts'

export const UseGetListPlace = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '0')
  if (limit) Params.set('limit', limit ?? '0')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: IStudentEntertainment[]
    meta: Meta
  }>({
    queryKey: ['student-entertainment', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/daftar-hiburan-mahasiswa?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    listPlace: data?.data ?? [],
    meta: data?.meta,
    loading,
  }
}

export const UseGetDetailPlace = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IStudentEntertainment>({
    queryKey: ['student-entertainment', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/daftar-hiburan-mahasiswa/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { placeDetail: data, loading }
}

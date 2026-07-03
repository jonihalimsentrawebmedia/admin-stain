import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IStudentDataStatus } from './types.ts'
import type { Meta } from '@/components/common/paginationState'

interface Props extends BasicProps {
  tanggal_mulai?: string
  tanggal_selesai?: string
}

export const UseGetStudentStatusLetter = (props?: Props) => {
  const { page, limit, search, tanggal_selesai, tanggal_mulai } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (tanggal_mulai) Params.append('tanggal_mulai', tanggal_mulai ?? '')
  if (tanggal_selesai) Params.append('tanggal_selesai', tanggal_selesai ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: IStudentDataStatus[]
    meta: Meta
  }>({
    queryKey: ['student-status-letter', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/ref/mahasiswa-status-kkn-magang?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, student: data?.data ?? [], meta: data?.meta }
}

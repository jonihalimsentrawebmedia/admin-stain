import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IListStudentOrganization } from '@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/data/types.ts'

export const UseGetStudentOrganizations = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['student-organization', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/daftar-organisasi-mahasiswa?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    listOrganization: data?.data as IListStudentOrganization[] ?? [],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}

export const UseGetDetailStudentOrganization = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['student-organization', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/daftar-organisasi-mahasiswa/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return {
    detail: data as IListStudentOrganization | undefined,
    loading,
  }
}

import type { IManagementUnit } from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/data/resolver.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id_unit: string
}

export const UseGetProdiUnit = (props?: Props) => {
  const { id_unit, search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-unit', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/unit-pengelola?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    prodiUser: data?.data ?? [] as IManagementUnit[],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}

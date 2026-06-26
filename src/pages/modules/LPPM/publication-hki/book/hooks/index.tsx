import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import type { IUserManagement } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement/data/types.ts'

type Context = 'pusat-buku-dan-media-masa' | 'pusat-plp' | 'pusat-ppjs' | 'pusat-hki'

interface Props extends basicProps {
  context: Context
}

interface propsDetail {
  id: string
  context: Context
}

interface UserManagementResponse {
  data: IUserManagement[]
  meta: Meta
}

export const UseGetUserManagementContext = (props?: Props) => {
  const { context, page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  ParamsSearch.append('page', page ?? '0')
  ParamsSearch.append('limit', limit ?? '0')
  ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<UserManagementResponse>({
    queryKey: ['user-management', ParamsSearch.toString(), context],
    enabled: !!context,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/pusat-publikasi-anggota/${context}?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { userManagement: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailUserManagement = (props: propsDetail) => {
  const { id, context } = props

  const { data, isLoading, isFetching } = useQuery<IUserManagement>({
    queryKey: ['user-management-detail', id, context],
    enabled: !!context,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/pusat-publikasi-anggota/${context}/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { userManagement: data, loading }
}

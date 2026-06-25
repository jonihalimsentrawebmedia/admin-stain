import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IPartnerMitra } from '../data/type.ts'

export const UseGetPartnerMitra = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IPartnerMitra[]; meta: Meta }>({
    queryKey: ['mitra-partner', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/mitra-kerjasama?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, partnerMitra: data?.data ?? [] as IPartnerMitra[], meta: data?.meta ?? undefined }
}

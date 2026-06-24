import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProduct } from '@/pages/modules/Pulsikom/product/data/types.ts'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetProduct = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '')
  if (limit) ParamsSearch.set('limit', limit ?? '')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IProduct[]>>({
    queryKey: ['product', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/produk?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, meta: data?.meta, product: data?.data ?? [] }
}

export const UseGetProductDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-product', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/produk/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  return { detail: data, loading }
}

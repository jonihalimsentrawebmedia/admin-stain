import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProduct } from '@/pages/modules/Pulsikom/product/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetProduct = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [product, setProduct] = useState<IProduct[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '')
  if (limit) ParamsSearch.set('limit', limit ?? '')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['product', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/produk?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setProduct(data?.data)
    }
  }, [data])

  return { loading, meta, product }
}

export const UseGetProductDetail = (id: string) => {
  const [detail, setDetail] = useState<IProduct>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-product', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/produk/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGUideCategory } from '../data/types'

export const UseGetGuideCategory = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}
  const [guideCategory, setGuideCategory] = useState<IGUideCategory[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['guide-category', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/buku-panduan-kategori?${ParamsSearch}`).then((res) => {
        return res.data
      }),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGuideCategory(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { guideCategory, meta, loading }
}

export const UseGetGuideCategoryDetail = (id: string) => {
  const [detail, setDetail] = useState<IGUideCategory>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['guide-category-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/buku-panduan-kategori/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

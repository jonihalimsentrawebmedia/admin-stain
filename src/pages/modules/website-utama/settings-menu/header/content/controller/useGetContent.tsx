import { useEffect, useState } from 'react'
import type { ContentList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetContent = () => {
  const [contentList, setContentList] = useState<ContentList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search= searchParams.get('search') ?? ''

  if (id) {
    searchParams.set('id_menu', id)
  }
  const id_menu = searchParams.get('id_menu') ?? ''
  const ParamsSearch = new URLSearchParams({ page, limit, id_menu,search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-contents', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/konten?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContentList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { contentList, loading, meta }
}

export default useGetContent

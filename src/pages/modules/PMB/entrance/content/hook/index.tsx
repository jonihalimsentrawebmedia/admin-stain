import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface props extends BasicProps {
  id_jalur_masuk: string
}

export const UseGetContentEntrance = (props: props) => {
  const { id_jalur_masuk, page, limit, search } = props

  const [content, setContent] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')
  if (id_jalur_masuk) ParamsSearch.append('id_jalur_masuk', id_jalur_masuk ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['content-entrance-pmb', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pmb/jalur-masuk-konten?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContent(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { content, loading, meta }
}

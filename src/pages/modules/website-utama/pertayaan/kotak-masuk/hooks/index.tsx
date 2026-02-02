import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'
import { useSearchParams } from 'react-router-dom'

export const UseGetInboxMessage = () => {
  const [listMessage, setListMessage] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const ParamsSearch = new URLSearchParams({ page, limit })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-inbox-message', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pertanyaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListMessage(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listMessage, loading, meta }
}

export const UseGetBackgroundInboxMessage = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-question'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pertanyaan-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

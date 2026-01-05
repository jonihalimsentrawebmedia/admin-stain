import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetInboxMessage = () => {
  const [listMessage, setListMessage] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-inbox-message'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/pertanyaan').then((res) => res.data),
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
      AxiosClient.get(`/website-utama/pertanyaan-background`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

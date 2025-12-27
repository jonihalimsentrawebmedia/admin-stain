import { useEffect, useState } from 'react'
import type { IMarsMusic } from '@/pages/modules/website-utama/public-content/musik-resmi/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetOfficialMusic = () => {
  const [officialMusic, setOfficialMusic] = useState<IMarsMusic[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['official-music', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/mars-musik?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOfficialMusic(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { officialMusic, loading, meta }
}

export const UseGetOfficialMusicDetail = (id: string) => {
  const [officialMusicDetail, setOfficialMusicDetail] = useState<IMarsMusic>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['official-music-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/mars-musik/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOfficialMusicDetail(data)
    }
  }, [data])

  return { officialMusicDetail, loading }
}

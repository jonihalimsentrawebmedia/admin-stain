import { useEffect, useState } from 'react'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetListTopSliderDraft = () => {
  const [listDraftSlider, setListDraftSlider] = useState<IListSlider[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const statusPublish = searchParams.get('status-publish')
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const ParamSearch = new URLSearchParams({ page, limit })
  if (statusPublish) ParamSearch.append('status-publish', statusPublish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-slider-draft', ParamSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/slider-atas').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListDraftSlider(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listDraftSlider, loading, meta }
}

export const UseGetSliderDetail = (id: string) => {
  const [detailSlider, setDetailSlider] = useState<IListSlider>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-slider', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/slider-atas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailSlider(data)
    }
  }, [data])

  return { detailSlider, loading }
}

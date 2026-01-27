import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IImpactInnovationList, IStatusImpactInnovation } from '@/pages/modules/new_editor/publict-content/impact-innovation/data/index'
import { useSearchParams } from 'react-router-dom'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetImpactInnovation = () => {
  const [impactInnovation, setImpactInnovation] = useState<IImpactInnovationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const category = searchParams.get('id_category')
  const id_satuan_organisasi = searchParams.get('id-satuan-organisasi')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)
  if (category) ParamsSearch.append('id-kategori-inovasi-berdampak', category)
  if (id_satuan_organisasi)
    ParamsSearch.append('id-kategori-inovasi-berdampak', id_satuan_organisasi)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-impact-innovation-editor', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/inovasi-berdampak?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setImpactInnovation(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { impactInnovation, loading, meta }
}

export const UseGetImpactInnovationDetail = (id: string) => {
  const [detailImpactInnovation, setDetailImpactInnovation] = useState<IImpactInnovationList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-impact-innovation-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/inovasi-berdampak/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailImpactInnovation(data)
    }
  }, [data])

  return { detailImpactInnovation, loading }
}

export const UseGetImpactInnovationStatus = () => {
  const [status, setStatus] = useState<IStatusImpactInnovation>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-impact-innovation-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/inovasi-berdampak/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogImpactInnovation = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-inovasi-berdampak-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/inovasi-berdampak-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

export const UseGetInnovationBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-innovation-editor'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/inovasi-berdampak-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

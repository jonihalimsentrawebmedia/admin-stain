import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAchievementDetail } from '@/pages/modules/new_editor/publict-content/achievement/data/index.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetAchievement = () => {
  const [listAchievement, setListAchievement] = useState<IAchievementDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const id_satuan_organisasi = searchParams.get('id-satuan-organisasi')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)
  if (id_satuan_organisasi) ParamsSearch.append('id-satuan-organisasi', id_satuan_organisasi)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-achievement-editor', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/prestasi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListAchievement(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listAchievement, loading, meta }
}

export const UseGetAchievementDetail = (id: string) => {
  const [detailAchievement, setDetailAchievement] = useState<IAchievementDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-achievement-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailAchievement(data)
    }
  }, [data])

  return { detailAchievement, loading }
}

export const UseGetAchievementStatus = () => {
  const [status, setStatus] = useState<any>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-achievement-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/prestasi/status').then((res) => res.data.data),
  })

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { status, loading }
}

export const UseGetLogAchievement = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-achievement-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

export const UseGetAchievementBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-achievement-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi-background`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])
  
  return { background, loading }
}
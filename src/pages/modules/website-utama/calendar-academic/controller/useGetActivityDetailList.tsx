import { useQuery } from '@tanstack/react-query'
import type { ActivityDetail } from '../model/academicActivityDetail'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams, useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetActivityDetailList = () => {
  const [academicActivityDetailList, setAcademicActivityDetailList] = useState<ActivityDetail[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { idActivity } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_tahun_akademik_kegiatan = searchParams.get('id_tahun_akademik_kegiatan') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_tahun_akademik_kegiatan })
  if (idActivity) {
    searchParams.set('id_tahun_akademik_kegiatan', idActivity)
  }
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity-detail', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-uraian-kegiatan?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicActivityDetailList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { academicActivityDetailList, loading, meta }
}

export default useGetActivityDetailList

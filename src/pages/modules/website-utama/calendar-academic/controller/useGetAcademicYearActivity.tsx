import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import type { AcademicActivity } from '../model/academicActivity'

const useGetAcademicYearActivity = () => {
  const [academicActivityList, setAcademicActivityList] = useState<AcademicActivity[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { idAcademicYear } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  if (idAcademicYear) {
    searchParams.set('id_tahun_akademik', idAcademicYear)
  }
  const id_tahun_akademik = searchParams.get('id_tahun_akademik') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_tahun_akademik })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-kegiatan?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicActivityList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { academicActivityList, loading, meta }
}

export default useGetAcademicYearActivity

import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetActivityDetailList = () => {
  const { idActivity } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_tahun_akademik_kegiatan = searchParams.get('id_tahun_akademik_kegiatan') ?? ''

  const effectiveId = idActivity ?? searchParams.get('id_tahun_akademik_kegiatan') ?? id_tahun_akademik_kegiatan
  const ParamsSearch = new URLSearchParams({ page, limit, search, id_tahun_akademik_kegiatan: effectiveId })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity-detail', effectiveId, ParamsSearch.toString()],
    enabled: !!effectiveId,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-uraian-kegiatan?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { academicActivityDetailList: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetActivityDetailList

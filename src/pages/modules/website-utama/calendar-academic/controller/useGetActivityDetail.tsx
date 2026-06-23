import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetActivityDetail = () => {
  const { idActivityDetail } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idActivityDetail,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-uraian-kegiatan/${idActivityDetail}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { activityDetail: data?.data, loading }
}

export default useGetActivityDetail

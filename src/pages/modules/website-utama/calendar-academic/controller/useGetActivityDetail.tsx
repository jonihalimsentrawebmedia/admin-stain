import { useEffect, useState } from 'react'
import type { ActivityDetail } from '../model/academicActivityDetail'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetActivityDetail = () => {
  const [activityDetail, setActivityDetail] = useState<ActivityDetail>()
  const { idActivityDetail } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-activity-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-uraian-kegiatan/${idActivityDetail}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setActivityDetail(data?.data)
    }
  }, [data])

  return { activityDetail, loading }
}

export default useGetActivityDetail

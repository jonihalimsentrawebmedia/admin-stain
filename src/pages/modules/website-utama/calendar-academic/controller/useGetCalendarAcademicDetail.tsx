import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetCalendarAcademicDetail = () => {
  const { idAcademicYear } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idAcademicYear,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik/${idAcademicYear}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { academicYear: data?.data, loading }
}

export default useGetCalendarAcademicDetail

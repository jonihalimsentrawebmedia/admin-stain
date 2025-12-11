import  { useEffect, useState } from 'react'
import type { AcademicYearList } from '../model'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetCalendarAcademicDetail = () => {
  const [academicYear, setAcademicYear] = useState<AcademicYearList>()
  const { idAcademicYear } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acedemic-year-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik/${idAcademicYear}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicYear(data?.data)
    }
  }, [data])

  return { academicYear, loading }
}

export default useGetCalendarAcademicDetail

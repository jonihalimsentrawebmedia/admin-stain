import { useEffect, useState } from 'react'
import type { CalloborationCategoryList } from '../model'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetCalloborationCategoryDetail = () => {
  const [calloborationCategoryDetail, setCalloborationCategoryDetail] =
    useState<CalloborationCategoryList>()
  const { idCalloborationCategory } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['calloboration-category-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-kerjasama/${idCalloborationCategory}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCalloborationCategoryDetail(data?.data)
    }
  }, [data])

  return { calloborationCategoryDetail, loading }
}

export default useGetCalloborationCategoryDetail

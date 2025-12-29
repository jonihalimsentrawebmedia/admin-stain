import { useEffect, useState } from 'react'
import type { SubCalloborationCategory } from '../model'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetSubCalloborationCategoryDetail = () => {
  const [subCalloborationCategoryDetail, setSubCalloborationCategoryDetail] =
    useState<SubCalloborationCategory>()
  const { idSubCalloborationCategory } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['sub-calloboration-category-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(
        `/website-utama/sub-kategori-kerjasama/${idSubCalloborationCategory}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSubCalloborationCategoryDetail(data?.data)
    }
  }, [data])

  return { subCalloborationCategoryDetail, loading }
}

export default useGetSubCalloborationCategoryDetail

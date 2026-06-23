import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetCalloborationCategoryDetail = () => {
  const { idCalloborationCategory } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['calloboration-category-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idCalloborationCategory,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-kerjasama/${idCalloborationCategory}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { calloborationCategoryDetail: data?.data, loading }
}

export default useGetCalloborationCategoryDetail

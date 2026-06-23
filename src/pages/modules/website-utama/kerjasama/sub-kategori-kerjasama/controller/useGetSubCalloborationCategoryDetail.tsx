import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetSubCalloborationCategoryDetail = () => {
  const { idSubCalloborationCategory } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['sub-calloboration-category-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idSubCalloborationCategory,
    queryFn: () =>
      AxiosClient.get(
        `/website-utama/sub-kategori-kerjasama/${idSubCalloborationCategory}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { subCalloborationCategoryDetail: data?.data, loading }
}

export default useGetSubCalloborationCategoryDetail

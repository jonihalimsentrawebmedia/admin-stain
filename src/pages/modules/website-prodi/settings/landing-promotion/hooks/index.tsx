import type { ILandingPromotion } from '@/pages/modules/website-prodi/settings/landing-promotion/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface ILandingPromotionResponse {
  data: ILandingPromotion[]
  meta: Meta
}

export const UseLandingPromotion = () => {
  const { data, isLoading, isFetching } = useQuery<ILandingPromotionResponse>({
    queryKey: ['landing-promotion'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/landing-page-promosi').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { landingPromotion: data?.data ?? [], loading, meta: data?.meta }
}

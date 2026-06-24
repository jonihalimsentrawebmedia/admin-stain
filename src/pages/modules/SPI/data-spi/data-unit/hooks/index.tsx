import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { OrganizationData } from './type.tsx'

interface props {
  real_data?: boolean
}

export const UseGetDetailDataSPI = (props?: props) => {
  const { real_data } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')

  const { data: carrierCenter, isLoading, isFetching } = useQuery<OrganizationData>({
    queryKey: ['data-spi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/profil?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { carrierCenter, loading }
}

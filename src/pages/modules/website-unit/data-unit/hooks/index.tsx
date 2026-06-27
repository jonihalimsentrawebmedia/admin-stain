import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailUniversity } from '@/pages/modules/website-utama/profile/data/types.ts'

interface Props {
  real_data?: boolean
}

export const UseGetDetailDataUnit = (props?: Props) => {
  const { real_data } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')

  const { data, isLoading, isFetching } = useQuery<IDetailUniversity>({
    queryKey: ['data-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { dataUnit: data, loading }
}

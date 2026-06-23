import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
interface props {
  real_data?: boolean
}

export const UseGetUniversityData = (props?: props) => {
  const { real_data } = props ?? {}
  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-university',ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/profil?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailUniversity: data, loading }
}

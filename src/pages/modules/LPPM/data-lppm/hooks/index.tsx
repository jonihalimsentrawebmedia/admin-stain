import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { OrganizationData } from './type'

interface props {
  real_data?: boolean
}

export const UseGetDetailDataLPPM = (props?: props) => {
  const { real_data } = props ?? {}

  const [dataLPPM, setDataLPPM] = useState<OrganizationData>()
  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['data-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/profil?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDataLPPM(data)
    }
  }, [data])

  return { dataLPPM, loading }
}

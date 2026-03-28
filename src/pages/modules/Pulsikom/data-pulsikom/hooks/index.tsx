import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { OrganizationData } from './type.tsx'

interface props {
  real_data?: boolean
}

export const UseGetDetailDataPulsikom = (props?: props) => {
  const { real_data } = props ?? {}

  const [carrierCenter, setCarrierCenter] = useState<OrganizationData>()
  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['data-pulsikom', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/profil?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCarrierCenter(data)
    }
  }, [data])

  return { carrierCenter, loading }
}

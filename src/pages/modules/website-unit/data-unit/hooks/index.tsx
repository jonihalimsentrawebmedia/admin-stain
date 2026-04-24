import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailUniversity } from '@/pages/modules/website-utama/profile/data/types.ts'
interface props {
  real_data?: boolean
}
export const UseGetDetailDataUnit = (props?: props) => {
    const { real_data } = props ?? {}
  const [dataUnit, setDataUnit] = useState<IDetailUniversity>()
const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['data-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDataUnit(data)
    }
  }, [data])

  return { dataUnit, loading }
}

import { useEffect, useState } from 'react'
import type { IDetailUniversity } from '@/pages/modules/website-utama/profile/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
interface props {
  real_data?: boolean
}

export const UseGetUniversityData = (props?: props) => {
  const { real_data } = props ?? {}
  const [detailUniversity, setDetailUniversity] = useState<IDetailUniversity>()
  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-university',ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/profil?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailUniversity(data)
    }
  }, [data])

  return { detailUniversity, loading }
}

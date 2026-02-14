import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  page?: string
  limit?: string
  id_module: string
}

export const UseGetListSettings = (props?: Props) => {
  const { page, limit, id_module } = props ?? {}
  const [listSettings, setListSettings] = useState([])

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page)
  if (limit) ParamsSearch.append('limit', limit)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-settings', ParamsSearch.toString(), id_module],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/modules-unit/${id_module}?${ParamsSearch}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListSettings(data)
    }
  }, [data])

  return { listSettings, loading }
}

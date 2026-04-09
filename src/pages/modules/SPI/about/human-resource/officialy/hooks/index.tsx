import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id_group: string
}

export const UseGetOfficially = (props: Props) => {
  const { id_group, search, page, limit } = props

  const [officially, setOfficially] = useState([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  // if (id_group) ParamsSearch.append('id_kelompok', id_group ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['chief-officially-spi', id_group, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/spi/pimpinan/${id_group}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setOfficially(data?.data)
    }
  }, [data])

  return { loading, meta, officially }
}

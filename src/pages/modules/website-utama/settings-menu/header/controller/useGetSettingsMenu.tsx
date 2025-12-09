import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import  { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Menu } from '../model'

const useGetSettingsMenu = () => {
  const [menuList, setMenuList] = useState<Menu[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'


  const ParamsSearch = new URLSearchParams({ page, limit })
 

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-menus', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/menu/tree?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMenuList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { menuList, loading, meta }
}

export default useGetSettingsMenu
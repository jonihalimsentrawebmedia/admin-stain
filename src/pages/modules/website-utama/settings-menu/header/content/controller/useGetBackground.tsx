import  { useEffect, useState } from 'react'
import type { MenuBackgroundItem } from '../model/menu-background'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetBackground = () => {
  const [backgroundList, setBackgroundList] = useState<MenuBackgroundItem[]>([])
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-backgrounds'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/menu-background?id_menu=${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackgroundList(data?.data ?? [])
    }
  }, [data])

  return { backgroundList, loading }
}

export default useGetBackground

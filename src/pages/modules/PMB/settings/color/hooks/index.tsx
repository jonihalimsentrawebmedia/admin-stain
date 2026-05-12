import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdminPMB = (context: 'admin' | 'public') => {
  const [color, setColor] = useState<IColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`color-${context}-pmb`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pmb/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setColor(data)
    }
  }, [data])

  return { color, loading }
}

export const UseGetAdminThemePMB = () => {
  const [color, setColor] = useState<IColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`pmb-pengaturan-warna-admin`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pmb/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setColor(data)
    }
  }, [data])

  return { color, loading }
}

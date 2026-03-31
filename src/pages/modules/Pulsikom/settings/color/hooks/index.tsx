import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdminPulsikom = (context: 'admin' | 'public') => {
  const [color, setColor] = useState<IColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`color-${context}-pusilkom`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pusilkom/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setColor(data)
    }
  }, [data])

  return { color, loading }
}

export const UseGetAdminThemePulsikom = () => {
  const [color, setColor] = useState<IColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`pusilkom-pengaturan-warna-admin`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pusilkom/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setColor(data)
    }
  }, [data])

  return { color, loading }
}

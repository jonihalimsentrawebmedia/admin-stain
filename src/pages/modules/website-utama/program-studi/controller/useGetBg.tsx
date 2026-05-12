import { useEffect, useState } from 'react'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProdiBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/program-studi-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

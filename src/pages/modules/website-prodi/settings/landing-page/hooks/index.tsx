import { useEffect, useState } from 'react'
import type { IProdiLandingPage } from '@/pages/modules/website-prodi/settings/landing-page/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProdiLandingPage = () => {
  const [prodiLanding, setProdiLanding] = useState<IProdiLandingPage[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['landing-page'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/landing-page').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiLanding(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { prodiLanding, loading, meta }
}

import { useEffect, useState } from 'react'
import type { ILandingPromotion } from '@/pages/modules/website-prodi/settings/landing-promotion/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseLandingPromotion = () => {
  const [landingPromotion, setLandingPromotion] = useState<ILandingPromotion[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['landing-promotion'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/landing-page-promosi').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLandingPromotion(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { landingPromotion, loading, meta }
}

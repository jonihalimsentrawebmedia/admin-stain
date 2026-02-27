import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBookCenter } from './types'

type Context = 'pusat-buku-dan-media-masa' | 'pusat-plp' | 'pusat-ppjs' | 'pusat-hki'

interface Props {
  context: Context
}

export const UseGetPublicationCenter = (props: Props) => {
  const { context } = props
  const [responseData, setResponseData] = useState<IBookCenter>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['center-publication', context],
    enabled: !!context,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/pusat-publikasi/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}

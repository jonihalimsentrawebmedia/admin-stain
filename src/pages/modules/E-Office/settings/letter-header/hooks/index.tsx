import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'

export const UseGetLetterHeader = (id_unit: string) => {
  const [letterHeader, setLetterHeader] = useState<ILetterHeader>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['letter-header', id_unit],
    enabled: !!id_unit,
    queryFn: () => AxiosClient.get(`/eoffice/kop-surat/${id_unit}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterHeader(data?.data)
    }
  }, [data])

  return { letterHeader, loading }
}

export const ConvertUrlToBase64 = (url: string) => {
  const [base64, setBase64] = useState<any>()

  const Params = new URLSearchParams()
  Params.append('url', url)

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['letter-header-image', Params.toString()],
    enabled: !!url,
    queryFn: () => AxiosClient.get(`/url-to-base64?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBase64(data)
    }
  }, [data])

  return { base64, loading }
}

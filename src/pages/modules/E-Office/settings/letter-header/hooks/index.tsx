import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

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
  const [base64, setBase64] = useState<string>('')

  const Params = new URLSearchParams()
  Params.append('url', url)

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['letter-header-image', Params.toString()],
    enabled: !!url,
    queryFn: () =>
      AxiosClient.get(`/url-to-base64?${Params}`).then((res) => {
        // Response API: { status: boolean, data: "base64string..." }
        const raw = res.data?.data ?? res.data
        return raw ?? ''
      }),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data && typeof data === 'string') {
      setBase64(data)
    }
  }, [data])

  return { base64, loading }
}

export const GetBase64FromUrl = async (url: string) => {
  const params = new URLSearchParams()
  params.append('url', url)

  const res = await AxiosClient.get(`/url-to-base64?${params}`)

  // Response API: { status: boolean, data: "base64string..." }
  const raw = res.data?.data ?? res.data

  if (!raw || typeof raw !== 'string') {
    console.warn('[GetBase64FromUrl] Invalid response:', res.data)
    return ''
  }

  // Jika response sudah berupa data URL lengkap → pakai langsung
  if (raw.startsWith('data:')) return raw

  // Jika bukan data URL, bungkus dengan MIME yang sesuai
  const ext = url.split('.').pop()?.toLowerCase() || ''
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  }
  const mime = mimeMap[ext] || 'image/png'

  return `data:${mime};base64,${raw}`
}

export const UseGetLetterHeaderRef = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [letterHeader, setLetterHeader] = useState<ILetterHeader[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['letter-header-ref', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/ref/kop-surat?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterHeader(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, letterHeader }
}

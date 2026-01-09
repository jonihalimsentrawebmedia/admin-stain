import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { AcreditationList } from '@/pages/modules/website-utama/acreditation/model'

export const UseGetAccreditationProdi = () => {
  const [accreditation, setAccreditation] = useState<AcreditationList>()
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accreditation-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/akreditas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAccreditation(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { accreditation, loading, meta }
}

export const UseGetAccreditationProdiById = (id: string) => {
  const [accreditation, setAccreditation] = useState<AcreditationList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accreditation-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/akreditas/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAccreditation(data)
    }
  }, [data])

  return { accreditation, loading }
}

export const UseGetAccreditationProdiLog = (id: string) => {
  const [accreditationLog, setAccreditationLog] = useState<any>()
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accreditation-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/akreditas-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAccreditationLog(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { accreditationLog, loading, meta }
}

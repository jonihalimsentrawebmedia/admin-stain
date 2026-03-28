import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IProgramUndergraduatePartner } from '../data/types'

export const UseGetDetailProgram = (id: string) => {
  const [detail, setDetail] = useState<{ isi: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['detail-program', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/international-ungreaduate-program-deskripsi/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const useGetDetailPricingDetail = (id: string) => {
  const [pricing, setPricing] = useState<{ isi: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['detail-pricing', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/international-ungreaduate-program-biaya/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPricing(data)
    }
  }, [data])

  return { pricing, loading }
}

interface Props extends BasicProps {
  id: string
}

export const UseGetUniversityPartner = (props: Props) => {
  const { id, search, limit, page } = props

  const [partner, setPartner] = useState<IProgramUndergraduatePartner[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '0')
  if (page) Params.append('page', page ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['partner-university-undergraduate', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/international-ungreaduate-program-universitas-partner/${id}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPartner(data?.data)
      setMeta(data.meta)
    }
  }, [data])

  return { partner, loading, meta }
}

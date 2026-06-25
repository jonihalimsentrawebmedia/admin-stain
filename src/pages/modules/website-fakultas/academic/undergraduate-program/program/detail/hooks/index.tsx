import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IProgramUndergraduatePartner } from '../data/types'

export const UseGetDetailProgram = (id: string) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['detail-program', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/international-ungreaduate-program-deskripsi/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { detail: data as { isi: string } | undefined, loading }
}

export const useGetDetailPricingDetail = (id: string) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['detail-pricing', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/international-ungreaduate-program-biaya/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { pricing: data as { isi: string } | undefined, loading }
}

interface Props extends BasicProps {
  id: string
}

export const UseGetUniversityPartner = (props: Props) => {
  const { id, search, limit, page } = props

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

  return {
    partner: data?.data ?? [] as IProgramUndergraduatePartner[],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}

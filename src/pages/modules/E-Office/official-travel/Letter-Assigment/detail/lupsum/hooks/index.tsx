import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailLupSum, ILupSumAssignment } from '../data/types'

interface props extends BasicProps {
  id: string
}

export const UseGetLumpSum = (props: props) => {
  const { search, limit, page, id } = props

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (page) Params.append('page', page ?? '1')

  const { data, isLoading, isFetching } = useQuery<{ data: ILupSumAssignment[]; meta: Meta }>({
    queryKey: ['lump-sum', Params.toString(), id],
    queryFn: () =>
      AxiosClient(`/eoffice/mail-surat-tugas/${id}/lumpsum?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })
  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, lupSum: data?.data ?? [] }
}

export const UseGetLumpSumDetail = (id_employee: string) => {
  const { data, isLoading, isFetching } = useQuery<IDetailLupSum>({
    queryKey: ['lump-sum-detail', id_employee],
    enabled: !!id_employee,
    queryFn: () =>
      AxiosClient(`/eoffice/mail-surat-tugas-pegawai/${id_employee}/lumpsum`).then(
        (res) => res.data.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

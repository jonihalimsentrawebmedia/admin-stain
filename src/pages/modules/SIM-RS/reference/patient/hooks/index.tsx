import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IPatient } from '../data/types.ts'

export const UseGetPatient = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: IPatient[]; meta: Meta }>({
    queryKey: ['patient', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/pasien?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { patient: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailPatient = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IPatient>({
    queryKey: ['detail-patient', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/pasien/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetMedicalNumber = () => {
  const { data, isLoading, isFetching } = useQuery<string>({
    queryKey: ['new-nomor-rekam-medis'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/referensi/pasien/new-nomor-rekam-medis').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { medicalNumber: data, loading }
}

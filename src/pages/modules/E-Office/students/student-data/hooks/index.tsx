import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILogStudentHistory, IStudentData } from '../data/types.ts'

interface props extends BasicProps {
  angkatan?: string
  id_jalur_masuk?: string
  id_fakultas?: string
  id_prodi?: string
}

export const UseGetStudentData = (props?: props) => {
  const { search, limit, page, angkatan, id_jalur_masuk, id_fakultas, id_prodi } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (angkatan) Params.append('angkatan', angkatan ?? '')
  if (id_jalur_masuk) Params.append('id_jalur_masuk', id_jalur_masuk ?? '')
  if (id_fakultas) Params.append('id_fakultas', id_fakultas ?? '')
  if (id_prodi) Params.append('id_prodi', id_prodi ?? '')

  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery<{
    data: IStudentData[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['student-data', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: queryData?.meta, loading, studentData: queryData?.data ?? [] }
}

export const UseGetDetailStudentData = (id: string) => {
  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery<IStudentData>({
    queryKey: ['student-data-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { studentData: queryData, loading }
}

export const UseGetYearLevel = () => {
  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery<number[]>({
    queryKey: ['year-level'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/mahasiswa/filter-tahun-angkatan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { yearLevel: queryData ?? [], loading }
}

interface ActiveProps {
  tahun: string
  semester: number
  semester_aktif: number
  label: string
}

export const UseGetStudentActiveSemester = (id_student?: string) => {
  const { data, isLoading, isFetching } = useQuery<ActiveProps[]>({
    queryKey: ['student-active-semester', id_student],
    enabled: !!id_student,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mahasiswa/mahasiswa-list-semester-aktif/${id_student}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    ActiveSemester: data,
    loading,
  }
}

export const UseGetStudentLogStatusActive = (id_mahasiswa: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogStudentHistory[]>({
    queryKey: ['student-log-status'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`eoffice/mahasiswa/${id_mahasiswa}/status-history`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    logStatus: data,
    loading,
  }
}

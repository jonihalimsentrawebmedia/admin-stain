import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetStepApproved = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['step-approval'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/surat-mahasiswa-pengajuan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { stepApproval: data, loading }
}

export const UseGetStudentLetter = (props: BasicProps) => {
  const { page, search, limit } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['surat-keterangan-mahasiswa', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa?${params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { studentLetter: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetStudentLetterById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['surat-keterangan-mahasiswa-by-id', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { studentLetter: data, loading }
}

export const UseGetLetterStudentBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-student-letter'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa-background`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}

export const UseGetLogLetterStudent = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-letter', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa-log/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

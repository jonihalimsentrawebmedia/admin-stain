import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  tahun: string
  semester: 'GENAP' | 'GANJIL'
  type: 'WAJIB' | 'PILIHAN'
  id?: string
  search?: string
}

export const UseGetSubjectDetail = (props?: Props) => {
  const { tahun, semester, type, id, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (id) ParamsSearch.append('id_kurikulum', id)
  if (tahun) ParamsSearch.append('tahun', tahun)
  if (semester) ParamsSearch.append('semester', semester)
  if (type) ParamsSearch.append('jenis_mata_kuliah', type)
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<unknown[]>({
    queryKey: ['subject-detail', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/mata-kuliah?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { subjectList: data ?? [], loading }
}

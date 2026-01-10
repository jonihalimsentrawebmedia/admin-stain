import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface props {
  tahun: string
  semester: 'GENAP' | 'GANJIL'
  type: 'WAJIB' | 'PILIHAN'
  id?: string
}

export const UseGetSubjectDetail = (props?: props) => {
  const { tahun, semester, type, id } = props ?? {}
  const [subjectList, setSubjectList] = useState([])

  const ParamsSearch = new URLSearchParams()
  if (id) ParamsSearch.append('id_kurikulum', id)
  if (tahun) ParamsSearch.append('tahun', tahun)
  if (semester) ParamsSearch.append('semester', semester)
  if (type) ParamsSearch.append('jenis_mata_kuliah', type)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['subject-detail', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/mata-kuliah?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSubjectList(data)
    }
  }, [data])

  return { subjectList, loading }
}

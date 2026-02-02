import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentLetter } from '../../types/index'

export const UseGetSKM = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IStudentLetter
    en: IStudentLetter
    zh: IStudentLetter
    ar: IStudentLetter
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['skm-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}

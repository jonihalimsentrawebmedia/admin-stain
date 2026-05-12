import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStructuralPosition } from '../../data/types.ts'

export const UseGetStructuralLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IStructuralPosition
    en: IStructuralPosition
    zh: IStructuralPosition
    ar: IStructuralPosition
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['structural-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/jabatan-struktural-translate/${id}`).then(
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

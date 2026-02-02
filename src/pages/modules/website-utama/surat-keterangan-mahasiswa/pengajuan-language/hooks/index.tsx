import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStepApproval } from '../../types/index'

export const UseGetSubmissionSKMLanguage = () => {
  const [language, setLanguage] = useState<{
    id: IStepApproval
    en: IStepApproval
    zh: IStepApproval
    ar: IStepApproval
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faq-language'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-mahasiswa-pengajuan-translate`).then(
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

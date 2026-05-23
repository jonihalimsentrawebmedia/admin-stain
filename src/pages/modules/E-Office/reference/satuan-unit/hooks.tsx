import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IInstitution {
  id_satuan_organisasi: string
  kelompok: string
  nama: string
  singkatan: string | null
  logo: string | null
}

export const UseGetUnitInstitution = () => {
  const [institution, setInstitution] = useState<IInstitution[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['institution'],
    queryFn: () =>
      AxiosClient.get('/eoffice/ref/satuan-organisasi-children?page=0&limit=0').then(
        (res) => res.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInstitution(data.data)
    }
  }, [data])

  return { loading, institution }
}

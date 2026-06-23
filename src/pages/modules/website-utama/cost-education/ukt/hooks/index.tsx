import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface props extends BasicProps {
  id_fakultas: string
  id_prodi: string
  id_jenjang: string
  id_jalur_masuk: string
}

export const UseGetCostEducation = (props: props) => {
  const {
    id_fakultas,
    id_prodi,
    id_jenjang,
    id_jalur_masuk,
    page = '1',
    limit = '10',
    search = '',
  } = props

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'cost_education',
      {
        page,
        limit,
        search,
        id_fakultas,
        id_prodi,
        id_jenjang,
        id_jalur_masuk,
      },
    ],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)
      if (id_fakultas) params.append('id_fakultas', id_fakultas)
      if (id_prodi) params.append('id_prodi', id_prodi)
      if (id_jenjang) params.append('id_jenjang', id_jenjang)
      if (id_jalur_masuk) params.append('id_jalur_masuk', id_jalur_masuk)

      const res = await AxiosClient.get(`/website-utama/biaya-pendidikan-ukt?${params.toString()}`)
      return res.data
    },
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { costEducation: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetStatusPublish = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status_publish'],
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-ukt/tipe`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { publish: data, loading }
}


export const UseGetUKTBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-ukt'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-ukt-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}

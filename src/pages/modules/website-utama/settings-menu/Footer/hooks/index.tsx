import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface FooterSetting {
  id_satuan_organisasi: string
  text_footer: string
  created_at: string // ISO Date string
  created_user: string
  updated_at: string // ISO Date string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IFooterLog {
  jenis_data: string
  nama_user: string
  action: 'create' | 'update' | 'delete' | string
  action_name: string
  diubah_pada: string // ISO Date string
  data_lama: string
  data_baru: string
}

export const UseGetFooter = () => {
  const { data: queryData, isLoading, isFetching } = useQuery<FooterSetting>({
    queryKey: ['footer'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/footer').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { textFooter: queryData, loading }
}

export const UseGetFooterLog = () => {
  const { data: queryData, isLoading, isFetching } = useQuery<IFooterLog[]>({
    queryKey: ['footer-log'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/footer-log').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { footerLog: queryData ?? [], loading }
}

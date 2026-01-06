import { useEffect, useState } from 'react'
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
  const [textFooter, setTextFooter] = useState<FooterSetting>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['footer'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/footer').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTextFooter(data)
    }
  }, [data])

  return { textFooter, loading }
}

export const UseGetFooterLog = () => {
  const [footerLog, setFooterLog] = useState<IFooterLog[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['footer-log'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/footer-log').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFooterLog(data)
    }
  }, [data])

  return { footerLog, loading }
}

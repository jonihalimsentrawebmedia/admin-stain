import { Switch } from '@/components/ui/switch'
import type { Menu } from '../model'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  data: Menu
}
const ButtonActiveMenu = ({ data }: Props) => {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const updateStatus = async () => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/menu/${data.id_menu}`, {
      nama_menu: data.nama_menu,
      controller: data.controller,
      halaman: data.halaman,
      url: data.url,
      id_parent_menu: data.id_parent_menu,
      status: data.status == 'Y' ? 'N' : 'Y',
      urutan: data.urutan,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-menus'],
          })

          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  if (loading) {
    return <Skeleton />
  }
  return (
    <Switch
      onCheckedChange={() => {
        updateStatus()
      }}
      checked={data.status == 'Y'}
    />
  )
}

export default ButtonActiveMenu

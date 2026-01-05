import { Switch } from '@/components/ui/switch.tsx'
import type { IRegistrationPath } from '../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const ChangeStatus = (data: IRegistrationPath) => {
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerChange = async (e: any) => {
    console.log(e)
    setLoading(true)
    await AxiosClient.patch(
      `/website-utama/jalur-pendaftaran/${data?.id_jalur_pendaftaran}/status`,
      {
        status: e ? 'Y' : 'N',
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['register-path'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Switch
        disabled={loading}
        checked={data.status === 'Y'}
        onCheckedChange={async (e) => {
          await HandlerChange(e)
        }}
      />
    </>
  )
}

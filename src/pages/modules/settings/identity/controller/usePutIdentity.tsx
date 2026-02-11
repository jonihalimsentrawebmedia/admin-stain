import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

import { IdentityResolver, type IdentityType } from '../model'
interface Props{
    setIsEdit:Dispatch<SetStateAction<boolean>>
}
const usePutIdentity = ({setIsEdit}:Props) => {

  const form = useForm<IdentityType>({
    resolver: zodResolver(IdentityResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: IdentityType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/identitas`, {
        ...data,
      })

      if (res.data.status) {
        await queryClient.invalidateQueries({
          queryKey: ['settings-identity'],
        })
        setIsEdit(false)
        toast.success(res.data.message)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    handleSave,
    form,
  }
}

export default usePutIdentity

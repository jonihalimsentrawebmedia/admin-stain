import { zodResolver } from '@hookform/resolvers/zod'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CollaborationResolver, type ICollaborationTypeForm } from '../model/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

const usePostCalloboration = () => {
  const navigate = useNavigate()
  const form = useForm<ICollaborationTypeForm>({
    resolver: zodResolver(CollaborationResolver),
   
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ICollaborationTypeForm) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/website-utama/kerjasama`, {
        ...data,
      })

      if (res.data.status) {
        await queryClient.invalidateQueries({
          queryKey: ['list-calloboration'],
        })
        toast.success(res.data.message)
        goToBack()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  function goToBack() {
   
      navigate(-1)
    
  }
  return {
    loading,
    handleSave,
    form,
    goToBack,
  }
}

export default usePostCalloboration
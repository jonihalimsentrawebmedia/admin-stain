import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UsersResolver, type UsersType } from '../model'
import AxiosClient from '@/provider/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import useGetUsersDetail from '../controller/useGetUsersDetail'

const UsersEditViewModel = () => {
  const { user } = useGetUsersDetail({})
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params
  const form = useForm<UsersType>({
    resolver: zodResolver(UsersResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: UsersType) {
    setLoading(true)
    const temp = {
      ...data,
      level_user: {
        id_level_user: data.level_user.id_level_user,
        list_unit: data.satuan_kerja,
      },
    }
    try {
      const res = await AxiosClient.put(`/pengaturan/manajemen-user/users/${id}`, {
        ...temp,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        goToBack()
        await queryClient.invalidateQueries({
          queryKey: ['users-list', 'users-detail'],
        })
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

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
        level_user: {
          id_level_user: user.level_users_multi[0].id_level_user,
        },
        satuan_kerja: user.level_users_multi[0].list_unit,
      })
    }
  }, [user])
  return {
    form,
    loading,
    handleSave,
    navigate,
    goToBack,
  }
}

export default UsersEditViewModel

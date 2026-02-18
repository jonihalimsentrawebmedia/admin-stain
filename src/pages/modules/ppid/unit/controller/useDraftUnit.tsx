import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { SatuanOrganisasiResolver, type SatuanOrganisasiType } from '@/pages/modules/settings/model'
import useGetUnit from './useGetLembaga'

const useDraftUnit = () => {
  const {unit } = useGetUnit()

  const navigate = useNavigate()
  const form = useForm<SatuanOrganisasiType>({
    resolver: zodResolver(SatuanOrganisasiResolver),
    defaultValues: {},
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave() {
    setLoading(true)

    try {
      const res = await AxiosClient.post(`/unit-ppid/profil/draft`, {
        ...form.watch(),
      })

      if (res.data.status) {
        toast.success(res.data.message)
        goToBack()
        await queryClient.invalidateQueries({
          queryKey: ['unit-ppid'],
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
    if (unit) {
      const temp: any = { ...unit }
      form.reset({
        ...temp,
      })
    }
  }, [unit])
  return {
    loading,
    handleSave,
    form,
    goToBack,
  }
}

export default useDraftUnit

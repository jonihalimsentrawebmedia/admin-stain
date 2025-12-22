import { useForm } from 'react-hook-form'
import { SatuanOrganisasiResolver, type SatuanOrganisasiType } from '../model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface Props {
  kelompok?: string
}
const usePostSatuanOrganisasi = ({ kelompok }: Props) => {
  const navigate = useNavigate()
  const form = useForm<SatuanOrganisasiType>({
    resolver: zodResolver(SatuanOrganisasiResolver),
    defaultValues: {
      is_alamat_sama_parent:false
    },
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: SatuanOrganisasiType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/satuan-organisasi/${kelompok ?? ''}`, {
        ...data,
      })

      if (res.data.status) {
        await queryClient.invalidateQueries({
          queryKey: ['satuan-organisasi-list', kelompok],
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
    if (kelompok == 'PRODI') {
      navigate('/modules/settings/prodi')
    } else {
      navigate(-1)
    }
  }
  return {
    loading,
    handleSave,
    form,
    goToBack,
  }
}

export default usePostSatuanOrganisasi

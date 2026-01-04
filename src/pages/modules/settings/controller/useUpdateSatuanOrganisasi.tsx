import { useForm } from 'react-hook-form'
import { SatuanOrganisasiResolver, type SatuanOrganisasiType } from '../model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import useGetSatuanOrganisasiDetail from './useGetSatuanOrganisasiDetail'

interface Props {
  kelompok?: string
}
const useUpdateSatuanOrganisasi = ({ kelompok }: Props) => {
  const { satuanOrganisasi } = useGetSatuanOrganisasiDetail({
    kelompok: kelompok,
  })
  const params = useParams()
  const { id } = params
  const navigate = useNavigate()
  const form = useForm<SatuanOrganisasiType>({
    resolver: zodResolver(SatuanOrganisasiResolver),
    defaultValues: {
      
    },
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: SatuanOrganisasiType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/pengaturan/satuan-organisasi/${kelompok ?? ''}/${id}`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        goToBack()
        await queryClient.invalidateQueries({
          queryKey: ['satuan-organisasi-list', 'satuan-organisasi-list-detail', kelompok],
        })
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

  useEffect(() => {
    if (satuanOrganisasi) {
      const temp: any = { ...satuanOrganisasi }
      form.reset({
        ...temp,
        parent_id_temp:
          kelompok == 'PRODI' ? satuanOrganisasi.id_parent_satuan_organisasi : undefined,
      })
    }
  }, [satuanOrganisasi])
  return {
    loading,
    handleSave,
    form,
    goToBack,
  }
}

export default useUpdateSatuanOrganisasi

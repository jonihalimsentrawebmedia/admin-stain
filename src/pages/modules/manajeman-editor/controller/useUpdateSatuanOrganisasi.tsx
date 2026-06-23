import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import useGetSatuanOrganisasiDetail from './useGetSatuanOrganisasiDetail'
import { SatuanOrganisasiResolver, type SatuanOrganisasiType } from '../../settings/model'

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
    defaultValues: {},
  })

  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: (data: SatuanOrganisasiType) =>
      AxiosClient.post(`/editor/profil/${id}`, data),
    onSuccess: (res) => {
      if (res.data.status) {
        toast.success(res.data.message)
        goToBack()
        queryClient.invalidateQueries({
          queryKey: [
            'editor-satuan-organisasi-list',
            'editor-satuan-organisasi-list-detail',
            kelompok,
          ],
        })
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    },
  })

  function handleSave(data: SatuanOrganisasiType) {
    mutate(data)
  }

  function goToBack() {
    if (kelompok == 'PRODI') {
      navigate('/modules/editor/dashboard')
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
    loading: isPending,
    handleSave,
    form,
    goToBack,
  }
}

export default useUpdateSatuanOrganisasi

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ResolverRegistration, type TResolverRegistration } from '../data/resolver.tsx'
import { FormRegistration } from '../components/forms.tsx'
import { UseGetDetailRegistration } from '../hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'

const UpdateRegistration = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading: detailLoading } = UseGetDetailRegistration(id ?? '')
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverRegistration>({
    resolver: zodResolver(ResolverRegistration),
    defaultValues: {
      status: 'MENUNGGU',
    },
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        no_pendaftaran: detail.no_pendaftaran,
        tanggal_pendaftaran: detail.tanggal_pendaftaran?.split('T')[0] ?? '',
        status: detail.status,
        id_pasien: detail.id_pasien,
        id_poli: detail.id_poli,
        id_dokter: detail.id_dokter,
      })
    }
  }, [detail, form])

  if (detailLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  const HandleSave = async (value: TResolverRegistration) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/pelayanan/pendaftaran/${id}`, {
      ...value,
      tanggal_pendaftaran: new Date(value.tanggal_pendaftaran).toISOString(),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/services/registration')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <ButtonTitleGroup isBack label={'Edit Pendaftaran'} buttonGroup={[]} />
      <FormRegistration loading={loading} form={form} HandleSave={HandleSave} isEdit />
    </div>
  )
}

export default UpdateRegistration

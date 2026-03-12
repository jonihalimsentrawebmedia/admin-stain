import { useForm } from 'react-hook-form'
import { type JobVacancyType, ResolverJobVacancy } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/form.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const CreatedJobVacancy = () => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')

  const [loading, setLoading] = useState(false) ?? ''

  const navigate = useNavigate()

  const form = useForm<JobVacancyType>({
    resolver: zodResolver(ResolverJobVacancy),
    defaultValues: {
      lowongan_internal: type === 'internal',
      id_mitra_kerja: 'Sekolah Tinggi Agama Islam Negeri Mandailing Natal',
    },
  })

  const handleSave = async (e: JobVacancyType) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/lowongan-pekerjaan', {
      ...e,
      tgl_buka_pekerjaan: new Date(e.tgl_buka_pekerjaan).toISOString(),
      tgl_tutup_pekerjaan: new Date(e.tgl_tutup_pekerjaan).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          navigate('/modules/pusat-karir/service/job-vacancy')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <div className="space-y-5">
        <FormJobVacancy form={form} loading={loading} HandleSave={handleSave} />
      </div>
    </>
  )
}

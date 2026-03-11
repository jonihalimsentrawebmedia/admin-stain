import { useForm } from 'react-hook-form'
import { type JobVacancyType, ResolverJobVacancy } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/form.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/hoooks'

export const UpdatedJobVacancy = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false) ?? ''
  const navigate = useNavigate()

  const { jobVacancy } = UseGetDetailJobVacancy(id as string)

  useEffect(() => {
    if (jobVacancy) {
      form.reset({
        ...(jobVacancy as any),
        lowongan_internal: jobVacancy.lowongan_internal,
        id_mitra_kerja: jobVacancy.lowongan_internal
          ? jobVacancy.nama_mitra_kerja
          : jobVacancy.id_mitra_kerja,
      })
    }
  }, [jobVacancy])

  const form = useForm<JobVacancyType>({
    resolver: zodResolver(ResolverJobVacancy),
  })

  const handleSave = async (e: JobVacancyType) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/lowongan-pekerjaan/${id}`, {
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

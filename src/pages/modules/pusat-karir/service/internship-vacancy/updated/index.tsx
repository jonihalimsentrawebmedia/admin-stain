import { useForm } from 'react-hook-form'
import { type JobVacancyType, ResolverJobVacancy } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/form.tsx'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailInternshipVacancy } from '@/pages/modules/pusat-karir/service/internship-vacancy/hooks'
import { format } from 'date-fns'

export const UpdatedInternshipVacancy = () => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')

  const [loading, setLoading] = useState(false) ?? ''

  const { id } = useParams()
  const { internshipVacancy } = UseGetDetailInternshipVacancy(id as string)
  const navigate = useNavigate()

  useEffect(() => {
    if (internshipVacancy) {
      form.reset({
        ...(internshipVacancy as any),
        lowongan_internal: internshipVacancy.lowongan_internal,
        tgl_buka_pekerjaan: internshipVacancy?.tgl_buka_pekerjaan
          ? format(internshipVacancy?.tgl_buka_pekerjaan, 'yyyy-MM-dd')
          : '',
        tgl_tutup_pekerjaan: internshipVacancy?.tgl_tutup_pekerjaan
          ? format(internshipVacancy?.tgl_tutup_pekerjaan, 'yyyy-MM-dd')
          : '',
        id_mitra_kerja: internshipVacancy.lowongan_internal
          ? internshipVacancy.nama_mitra_kerja
          : internshipVacancy.id_mitra_kerja,
      })
    }
  }, [internshipVacancy])

  const form = useForm<JobVacancyType>({
    resolver: zodResolver(ResolverJobVacancy),
    defaultValues: {
      lowongan_internal: type === 'internal',
      id_mitra_kerja: 'Sekolah Tinggi Agama Islam Negeri Mandailing Natal',
    },
  })

  const handleSave = async (e: JobVacancyType) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/lowongan-magang-pekerjaan/${id}`, {
      ...e,
      tgl_buka_pekerjaan: new Date(e.tgl_buka_pekerjaan).toISOString(),
      tgl_tutup_pekerjaan: new Date(e.tgl_tutup_pekerjaan).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          navigate('/modules/pusat-karir/service/internship-vacancy')
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
        <FormJobVacancy
          label={'Buka Lowongan Magang'}
          form={form}
          loading={loading}
          isMagang
          HandleSave={handleSave}
        />
      </div>
    </>
  )
}

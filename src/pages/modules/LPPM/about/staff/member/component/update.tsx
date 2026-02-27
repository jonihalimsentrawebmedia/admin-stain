import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  MemberResolver,
  type MemberSchema,
} from '@/pages/modules/LPPM/about/staff/member/hooks/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormMemberStaff } from '@/pages/modules/LPPM/about/staff/member/component/form.tsx'
import { UseGetMemberDetail } from '@/pages/modules/LPPM/about/staff/member/hooks'

export const UpdateStaffMember = () => {
  const { id, memberId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { detail } = UseGetMemberDetail(memberId ?? '')

  const form = useForm<MemberSchema>({
    resolver: zodResolver(MemberResolver),
    defaultValues: {
      id_staff: id,
    },
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        id_staff: detail?.id_staff,
        status: detail.status,
        jabatan: detail.jabatan,
        nip: detail.nip,
        nama_anggota: detail.nama_anggota,
        url_gambar: detail.url_gambar,
      })
    }
  }, [detail])

  const handleSave = async (e: MemberSchema) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/staff-anggota/${detail?.id_staff_anggota}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <FormMemberStaff form={form} loading={loading} handleSave={handleSave} />
    </>
  )
}

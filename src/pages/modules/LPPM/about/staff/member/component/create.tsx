import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  MemberResolver,
  type MemberSchema,
} from '@/pages/modules/LPPM/about/staff/member/hooks/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormMemberStaff } from '@/pages/modules/LPPM/about/staff/member/component/form.tsx'

export const CreateStaffMember = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const form = useForm<MemberSchema>({
    resolver: zodResolver(MemberResolver),
    defaultValues: {
      id_staff: id,
    },
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async (e: MemberSchema) => {
    setLoading(true)
    await AxiosClient.post('/lppm/staff-anggota', e)
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

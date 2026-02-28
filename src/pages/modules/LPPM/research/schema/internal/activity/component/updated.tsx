import { FormActivity } from '@/pages/modules/LPPM/research/schema/internal/activity/component/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverActivity, type SchemaActivity } from '../data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UseGetActivityProgramDetail } from '@/pages/modules/LPPM/research/schema/internal/activity/hooks'

export const UpdatedFormActivity = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { detail } = UseGetActivityProgramDetail(id ?? '')

  const navigate = useNavigate()

  const form = useForm<SchemaActivity>({
    resolver: zodResolver(ResolverActivity),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        urutan: detail?.urutan,
        deskripsi: detail?.deskripsi,
      })
    }
  }, [detail])

  const HandleSave = async (e: SchemaActivity) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/daftar-program-kegiatan/${detail?.id_daftar_program_kegiatan}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate(-1)
          toast.success(res.data.message || 'Success tambah data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah data')
      })
  }

  return (
    <>
      <FormActivity form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

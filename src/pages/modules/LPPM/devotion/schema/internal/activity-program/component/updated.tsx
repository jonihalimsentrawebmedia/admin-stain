import { FormActivityProgram } from './form'
import { useForm } from 'react-hook-form'
import { ResolverActivityProgram, type SchemaActivityProgram } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetActivityProgramDetail } from '../hooks/index'

export const UpdatedActivityProgram = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const { detail } = UseGetActivityProgramDetail(id ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        deskripsi: detail?.deskripsi,
        urutan: detail?.urutan,
      })
    }
  }, [detail])

  const form = useForm<SchemaActivityProgram>({
    resolver: zodResolver(ResolverActivityProgram),
  })

  const HandleAddStudyCenter = async (e: SchemaActivityProgram) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/daftar-skema/${detail?.id_daftar_skema}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success tambah data')
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah data')
      })
  }

  return (
    <>
      <FormActivityProgram
        form={form}
        loading={loading}
        HandleSave={HandleAddStudyCenter}
        label={'Edit Program Kegiatan'}
      />
    </>
  )
}

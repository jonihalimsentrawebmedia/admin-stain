import { FormStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/component/form.tsx'
import { useForm } from 'react-hook-form'
import { ResolverStudyCenter, type SchemaStudyCenter } from '../data/reasolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetStudyCenterDetail } from '../hook/index'

export const UpdateStudyCenter = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const { detail } = UseGetStudyCenterDetail(id ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        deskripsi: detail?.deskripsi,
        urutan: detail?.urutan,
      })
    }
  }, [detail])

  const form = useForm<SchemaStudyCenter>({
    resolver: zodResolver(ResolverStudyCenter),
  })

  const HandleAddStudyCenter = async (e: SchemaStudyCenter) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/pusat-studi/${detail?.id_pusat_studi}`, e)
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
      <FormStudyCenter
        form={form}
        loading={loading}
        HandleSave={HandleAddStudyCenter}
        label={'Tambah Data'}
      />
    </>
  )
}

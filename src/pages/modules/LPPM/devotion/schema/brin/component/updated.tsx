import { FormDataBRIN } from './form'
import { useForm } from 'react-hook-form'
import { ResolverBRIN, type schemaBRIN } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailBRIN } from '../hooks/index'

export const UpdatedDataBRIN = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const { detail } = UseGetDetailBRIN(id ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        deskripsi: detail?.deskripsi,
        urutan: detail?.urutan,
      })
    }
  }, [detail])

  const form = useForm<schemaBRIN>({
    resolver: zodResolver(ResolverBRIN),
  })

  const HandleAddStudyCenter = async (e: schemaBRIN) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/brin/${detail?.id_brin}`, e)
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
      <FormDataBRIN
        form={form}
        loading={loading}
        HandleSave={HandleAddStudyCenter}
        label={'Edit Pendanan BRIN'}
      />
    </>
  )
}

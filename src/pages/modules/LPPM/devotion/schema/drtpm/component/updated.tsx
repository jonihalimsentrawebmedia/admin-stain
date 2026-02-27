import { FormDataDRTPM } from './form.tsx'
import { useForm } from 'react-hook-form'
import { ResolverDRTPM, type schemaDRTPM } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailDRTPM } from '../hooks/index'

export const UpdatedDataDRTPM = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const { detail } = UseGetDetailDRTPM(id ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        deskripsi: detail?.deskripsi,
        urutan: detail?.urutan,
      })
    }
  }, [detail])

  const form = useForm<schemaDRTPM>({
    resolver: zodResolver(ResolverDRTPM),
  })

  const HandleAddStudyCenter = async (e: schemaDRTPM) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/drtpm/${detail?.id_drtpm}`, e)
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
      <FormDataDRTPM
        form={form}
        loading={loading}
        HandleSave={HandleAddStudyCenter}
        label={'Edit Pendanan DRTPM'}
      />
    </>
  )
}

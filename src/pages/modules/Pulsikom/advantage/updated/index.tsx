import { UseGetAdvantageDetail } from '@/pages/modules/Pulsikom/advantage/hooks'

import { FormAdvantage } from '@/pages/modules/Pulsikom/advantage/component/form.tsx'
import { useEffect, useState } from 'react'
import {
  ResolverAdvantage,
  type TResolverAdvantage,
} from '@/pages/modules/Pulsikom/advantage/data/resolver.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdatedAdvantage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { detail } = UseGetAdvantageDetail((id as string) ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        urutan: detail?.urutan,
        nama_keunggulan: detail?.nama_keunggulan,
        url_gambar: detail?.url_gambar,
        deskripsi_singkat: detail?.deskripsi_singkat,
      })
    }
  }, [detail])

  const [loading, setLoading] = useState(false)
  const form = useForm<TResolverAdvantage>({
    resolver: zodResolver(ResolverAdvantage),
  })

  const HandleSave = async (value: TResolverAdvantage) => {
    setLoading(true)
    await AxiosClient.put('/pusilkom/keunggulan/' + id, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/pulsikom/advantage')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormAdvantage title={'Edit Keunggulan'} form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}

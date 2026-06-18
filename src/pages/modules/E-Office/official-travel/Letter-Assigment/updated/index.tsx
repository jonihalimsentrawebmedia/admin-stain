import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormLetterTask from '../component/form.tsx'
import { ResolverLetterTask, type TResolverLetterTask } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetLetterAssigmentDetail } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/hooks'
import { format } from 'date-fns'

const UpdatedLetterAssigment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')

  const [loading, setLoading] = useState(false)
  const { detail } = UseGetLetterAssigmentDetail(id as string)

  const form = useForm<TResolverLetterTask>({
    resolver: zodResolver(ResolverLetterTask),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        ...(detail as any),
        tanggal_surat: detail?.tanggal_surat ? format(detail?.tanggal_surat, 'yyyy-MM-dd') : '',
        tanggal_mulai: detail.tanggal_mulai ? format(detail?.tanggal_mulai, 'yyyy-MM-dd') : '',
        tanggal_akhir: detail.tanggal_akhir ? format(detail?.tanggal_akhir, 'yyyy-MM-dd') : '',
      })
    }
  }, [detail])

  const HandleSave = async (value: TResolverLetterTask) => {
    setLoading(true)
    const tempEmployee = value?.pegawai.map((row, k) => ({
      ...row,
      urutan: k + 1,
    }))

    try {
      const res = await AxiosClient.put(`/eoffice/mail-surat-tugas/${id}`, {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
        tanggal_akhir: new Date(value.tanggal_akhir).toISOString(),
        pegawai: tempEmployee,
      })

      if (res.data.status) {
        setLoading(false)
        toast.success(res.data.message || 'Surat Tugas / SPD berhasil diperbarui')
        if (from === 'detail') {
          navigate(`/modules/e-office/official-travel/letter-assignment/detail/${id}`)
        } else {
          navigate('/modules/e-office/official-travel/letter-assignment')
        }
      }
    } catch (err: any) {
      setLoading(false)
      toast.error(err?.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="space-y-5">
      <ButtonTitleGroup label={'Buat Surat Tugas / SPD'} buttonGroup={[]} />
      <FormLetterTask form={form} loading={loading} HandleSave={HandleSave} />
    </div>
  )
}

export default UpdatedLetterAssigment

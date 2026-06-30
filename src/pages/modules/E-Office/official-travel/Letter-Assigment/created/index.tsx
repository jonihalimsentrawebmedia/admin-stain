import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormLetterTask from '../component/form.tsx'
import { ResolverLetterTask, type TResolverLetterTask } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

const CreatedLetterAssigment = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterTask>({
    resolver: zodResolver(ResolverLetterTask),
  })

  const HandleSave = async (value: TResolverLetterTask) => {
    setLoading(true)
    const tempEmployee = value?.pegawai.map((row, k) => ({
      ...row,
      urutan: k + 1,
    }))

    try {
      const res = await AxiosClient.post('/eoffice/mail-surat-tugas', {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
        tanggal_akhir: new Date(value.tanggal_akhir).toISOString(),
        pegawai: tempEmployee,
      })

      if (res.data.status) {
        setLoading(false)
        toast.success('Surat Tugas / SPD berhasil dibuat')
        navigate('/modules/e-office/official-travel/letter-assignment')
      }
    } catch (err: any) {
      setLoading(false)
      toast.error(err?.response?.data?.message || 'Error')
    }
  }

  console.log(form.formState.errors)

  return (
    <div className="space-y-5">
      <ButtonTitleGroup label={'Buat Surat Tugas / SPD'} buttonGroup={[]} />
      <FormLetterTask form={form} loading={loading} HandleSave={HandleSave} />
    </div>
  )
}

export default CreatedLetterAssigment

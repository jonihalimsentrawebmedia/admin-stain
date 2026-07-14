import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverPatient, type TResolverPatient } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormPatient from '../components/forms'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UseGetMedicalNumber } from '@/pages/modules/SIM-RS/reference/patient/hooks'

const CreatePatient = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPatient>({
    resolver: zodResolver(ResolverPatient),
    defaultValues: {
      is_status: true,
    },
  })
  const { medicalNumber } = UseGetMedicalNumber()

  useEffect(() => {
    if (medicalNumber) {
      form.reset({
        medical_record_number: medicalNumber,
      })
    }
  }, [medicalNumber])

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverPatient) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/pasien', {
      ...value,
      tanggal_lahir: new Date(value.tanggal_lahir).toISOString(),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/reference/patient')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  console.log(form.formState.errors)

  return (
    <>
      <div>
        <ButtonTitleGroup isBack label={'Tambah Data Pasien'} buttonGroup={[]} />
        <FormPatient loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreatePatient

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverStudentData, type TResolverStudentData } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormStudentData from '@/pages/modules/E-Office/students/student-data/component/form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const CreateStudentData = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverStudentData>({
    resolver: zodResolver(ResolverStudentData),
  })

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverStudentData) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mahasiswa', {
      ...value,
      tanggal_lahir: new Date(value.tanggal_lahir).toISOString(),
      semester_masuk: Number(value.semester_masuk),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/e-office/student/student-data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div>
        <ButtonTitleGroup
          isBack
          label={'Tambah Data Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Mahasiswa'} valueGuide="E_OFFICE_STUDENTS" />,
            },
          ]}
        />
        <FormStudentData loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreateStudentData

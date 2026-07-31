import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverStudentData, type TResolverStudentData } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormStudentData from '@/pages/modules/E-Office/students/student-data/component/form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailStudentData } from '@/pages/modules/E-Office/students/student-data/hooks'
import { format } from 'date-fns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const UpdatedStudentData = () => {
  const { id } = useParams()
  const { studentData } = UseGetDetailStudentData(id as string)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverStudentData>({
    resolver: zodResolver(ResolverStudentData),
  })

  useEffect(() => {
    if (studentData) {
      form.reset({
        nim: studentData.nim,
        nama_mahasiswa: studentData?.nama_mahasiswa,
        id_mahasiswa_unit: studentData.id_mahasiswa_unit,
        id_mahasiswa_status: studentData.id_mahasiswa_status,
        angkatan: studentData.angkatan,
        semester_masuk: studentData.semester_masuk.toString(),
        id_mahasiswa_jalur_masuk: studentData.id_mahasiswa_jalur_masuk,
        nik: studentData.nik,
        jenis_kelamin: studentData.jenis_kelamin,
        id_mahasiswa_agama: studentData.id_mahasiswa_agama,
        tempat_lahir: studentData.tempat_lahir,
        tanggal_lahir: studentData?.tanggal_lahir
          ? format(studentData.tanggal_lahir, 'yyyy-MM-dd')
          : '',
        no_hp: studentData.no_hp,
        email: studentData.email,
        alamat: studentData.alamat,
        nama_ayah: studentData.nama_ayah,
        nama_ibu: studentData.nama_ibu,
        nama_wali: studentData.nama_wali ?? '',
        url_foto_mahasiswa: studentData.url_foto_mahasiswa ?? '',
      })
    }
  }, [studentData])

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverStudentData) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/mahasiswa/${id}`, {
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
          label={'Edit Data Mahasiswa'}
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

export default UpdatedStudentData

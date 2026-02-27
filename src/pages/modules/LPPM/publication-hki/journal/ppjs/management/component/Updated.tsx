import {FormManagement} from '@/pages/modules/LPPM/publication-hki/component/form.tsx'
import {useForm} from 'react-hook-form'
import {
  type SchemaUserManagement,
  UserManagementResolver,
} from '@/pages/modules/LPPM/publication-hki/component/resolver.tsx'
import {zodResolver} from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {UseGetDetailUserManagement} from '@/pages/modules/LPPM/publication-hki/book/hooks'

export const UpdatedUserManagementPPJS = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {id} = useParams()

  const {userManagement} = UseGetDetailUserManagement({
    context: 'pusat-ppjs',
    id: id ?? '',
  })

  useEffect(() => {
    if (userManagement) {
      form.reset({
        context: userManagement?.context.toLowerCase().split('_').join(' '),
        urutan: userManagement?.urutan,
        nama: userManagement?.nama,
        url_gambar: userManagement.url_gambar,
        nip: userManagement.nip,
        status: userManagement.status,
        email: userManagement.email,
        jabatan: userManagement.jabatan,
        nidn: userManagement.nidn,
        golongan: userManagement.golongan,
        pangkat: userManagement.pangkat,
        publikasi: userManagement.publikasi,
      })
    }
  }, [userManagement])

  const form = useForm<SchemaUserManagement>({
    resolver: zodResolver(UserManagementResolver),
  })

  const HandleSave = async (data: SchemaUserManagement) => {
    setLoading(true)
    await AxiosClient.put(
      `/lppm/pusat-publikasi-anggota/pusat-ppjs/${userManagement?.id_anggota}`,
      data
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message)
          setLoading(false)
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <FormManagement form={form} HandleSave={HandleSave} loading={loading}/>
    </>
  )
}

import { useForm } from 'react-hook-form'
import useGetProfile from './controller/useGetProfile'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileViewModel = () => {
  const navigate = useNavigate()
  const form = useForm()
  const {  profile } = useGetProfile()
  const field = [
    {
      label: 'Nama Lengkap',
      name: 'nama_lengkap',
    },
    {
      label: 'Jabatan',
      name: 'jabatan',
    },
    {
      label: 'Jenis Kelamin',
      name: 'jenis_kelamin',
      component: <div>{profile?.jenis_kelamin == 'L' ? 'Laki Laki' : 'Perempuan'}</div>,
    },
    {
      label: 'Telepon',
      name: 'telepon',
    },
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Level user',
      name: 'level_user',
    },

    {
      label: 'Satuan Kerja',
      name: 'satuan_kerja',
      component: <div>{profile?.satuan_kerja ?? 'Tidak Ada Satuan Kerja'}</div>,
    },
  ]
  useEffect(() => {
    if (profile) {
      form.reset({
        ...profile,
      })
    }
  }, [profile])

  function goToEdit() {
    navigate(`/modules/settings/dashboard/profile/edit`)
  }
  return {
    form,
    profile,
    field,goToEdit
  }
}

export default ProfileViewModel

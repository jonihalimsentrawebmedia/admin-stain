import { useForm } from 'react-hook-form'
import useGetProfile from '../controller/useGetProfile'
import { useEffect } from 'react'

const EditProfileViewModel = () => {
  const form = useForm()
  const { profile } = useGetProfile()
  const field = [
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
  return {
    field,
    form,profile,
  }
}

export default EditProfileViewModel

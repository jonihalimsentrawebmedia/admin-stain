import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import useGetUsersDetail from '../controller/useGetUsersDetail'
const UsersDetailViewModel = () => {
  const { user } = useGetUsersDetail({})
  const form = useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const fieldImage = [
    {
      label: 'Foto',
      name: 'gambar',
      component: (
        <div className="bg-[#F5FFFA] max-w-[200px] ">
          <img src={form.watch('gambar')} alt="logo" />
        </div>
      ),
    },
  ]
  const fieldConfiguration = [
    { name: 'nama_lengkap', label: 'Nama Lengkap' },
    { name: 'jabatan', label: 'Jabatan' },
    {
      name: 'jenis_kelamin',
      label: 'Jenis Kelamin',
      component: <div>{user?.jenis_kelamin == 'P' ? 'Perempuan' : 'Laki-Laki'}</div>,
    },
    { name: 'telepon', label: 'Telepon' },
    { name: 'email', label: 'Email' },
    {
      name: 'level_users_multi',
      label: 'Level User',
      component: (
        <div>
          {user?.level_users_multi.length == 1 ? (
            user.level_users_multi[0].nama_level_user
          ) : (
            <ul className="list-outside list-disc pl-2 ml-2">
              {user?.level_users_multi.map((item) => (
                <li key={item.id_users_multi_level + item.id_user}>{item.nama_level_user}</li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
    {
      name: 'updated_at',
      label: 'Satuan Kerja',
      component: (
        <div>
          <span >{user?.satuan_kerja.join(', ')}</span>
        </div>
      ),
    },
  ]
  function goToEdit() {
    navigate(`/modules/settings/users/edit/${id}`)
  }
  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
      })
    }
  }, [user])
  return {
    fieldConfiguration,
    fieldImage,
    form,
    goToEdit,
  }
}

export default UsersDetailViewModel

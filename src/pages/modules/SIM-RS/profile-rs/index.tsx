import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverProfileHospital, type TResolverProfileHospital } from './data/resolver.tsx'
import { UseGetProfileHospital } from './hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import FormProfileHospital from './component/forms.tsx'
import { FaEdit } from 'react-icons/fa'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

const ProfileHospitalPage = () => {
  const { profile, loading: loadingProfile } = UseGetProfileHospital()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverProfileHospital>({
    resolver: zodResolver(ResolverProfileHospital),
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        nama: profile.nama,
        alamat: profile.alamat,
        email: profile.email,
        telepon: profile.telepon,
        url_logo: profile.url_logo,
      })
    }
  }, [profile])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverProfileHospital) => {
    setLoading(true)
    await AxiosClient.post('/simrs/profil/rumah-sakit', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setIsEdit(false)
          toast.success(res.data.message || 'Berhasil mengupdate profil rumah sakit')
          queryClient.invalidateQueries({ queryKey: ['profile-hospital'] })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  if (loadingProfile)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )

  return (
    <>
      {isEdit ? (
        <>
          <FormProfileHospital
            setIsEdit={setIsEdit}
            loading={loading}
            form={form}
            HandleSave={HandleSave}
          />
        </>
      ) : (
        <div className={'mt-5 space-y-6'}>
          <ButtonTitleGroup
            label={'Profil Rumah Sakit'}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                ),
              },
            ]}
          />

          <div className="p-4 sm:p-6 bg-white rounded-lg border space-y-4">
            <TitleLine title="Logo" />
            {profile?.url_logo ? (
              <img
                src={profile.url_logo}
                alt="Logo Rumah Sakit"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded border"
              />
            ) : (
              <p className="text-gray-400">Belum ada logo</p>
            )}
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-lg border space-y-4">
            <TitleLine title="Identitas Rumah Sakit" />
            <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-4">
              <p className="font-medium text-gray-600">Nama Rumah Sakit</p>
              <p>{profile?.nama ?? '-'}</p>
              <p className="font-medium text-gray-600">Alamat</p>
              <p>{profile?.alamat ?? '-'}</p>
              <p className="font-medium text-gray-600">Email</p>
              <p>{profile?.email ?? '-'}</p>
              <p className="font-medium text-gray-600">Telepon</p>
              <p>{profile?.telepon ?? '-'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileHospitalPage

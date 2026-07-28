import { useEffect, useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetProfileLeader } from '@/pages/modules/LPPM/about/leader/hooks'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { FormProfileInformation } from '@/pages/modules/LPPM/about/leader/component/form.tsx'
import { useForm } from 'react-hook-form'
import { type ProfileData, ProfileResolver } from './hooks/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const ProfileLeaderPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { profileLeader } = UseGetProfileLeader()

  const form = useForm<ProfileData>({
    resolver: zodResolver(ProfileResolver),
  })

  useEffect(() => {
    if (profileLeader) {
      form.reset({
        nama: profileLeader?.nama_ketua,
        deskripsi: profileLeader?.deskripsi,
        url_gambar: profileLeader?.url_gambar,
      })
    }
  }, [profileLeader])

  const queryClient = useQueryClient()

  const HandleSave = async (e: ProfileData) => {
    setLoading(true)
    await AxiosClient.post('/lppm/ketua', {
      ...e,
      nama_ketua: e.nama,
    })
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['about-profile-leader'],
          })
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      {isEdit ? (
        <>
          <FormProfileInformation
            form={form}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            loading={loading}
            handleSubmit={HandleSave}
            label={'Profil Ketua LPPM'}
          />
        </>
      ) : (
        <>
          <div className={'mt-5 flex flex-col gap-5'}>
            <ButtonTitleGroup
              label={'Profil Ketua LPPM'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide="Profil Ketua LPPM"
                      valueGuide="LPPM_TENTANG_PROFIL_KETUA"
                    />
                  ),
                },
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />

            {profileLeader?.url_gambar && (
              <img
                src={profileLeader?.url_gambar}
                alt={'leader'}
                className={'w-full sm:w-[240px] h-auto sm:h-[320px] object-cover rounded max-w-[240px]'}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-4">
              <p className="text-gray-500 text-sm sm:text-base">Nama Ketua *</p>
              <p className="break-words">{profileLeader?.nama_ketua}</p>
              <p className="text-gray-500 text-sm sm:text-base">Deskripsi *</p>
              <RenderHTMLContent content={profileLeader?.deskripsi ?? ''} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

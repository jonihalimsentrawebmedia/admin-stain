import { useEffect, useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetGreetingLeader } from './hooks/index.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { useForm } from 'react-hook-form'
import { type ProfileData, ProfileResolver } from './hooks/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { FormGreetingLeader } from './component/form.tsx'

export const ProfileGreetingLeaderPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { profileLeader } = UseGetGreetingLeader()

  const form = useForm<ProfileData>({
    resolver: zodResolver(ProfileResolver),
  })

  useEffect(() => {
    if (profileLeader) {
      form.reset({
        nama_lengkap: profileLeader?.nama_lengkap,
        isi: profileLeader?.isi,
        url_photo: profileLeader?.url_photo,
      })
    }
  }, [profileLeader])

  const queryClient = useQueryClient()

  const HandleSave = async (e: ProfileData) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/sambutan-kepala', {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['about-greeting-leader'],
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
          <FormGreetingLeader
            form={form}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            loading={loading}
            handleSubmit={HandleSave}
            label={'Sambutan Ketua Pusat Karir'}
          />
        </>
      ) : (
        <>
          <div className={'mt-5 flex flex-col gap-5'}>
            <ButtonTitleGroup
              label={'Sambutan Ketua Pusat Karir'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />

            {profileLeader?.url_photo && (
              <img
                src={profileLeader?.url_photo}
                alt={'leader'}
                className={'size-[320px] w-[240px] object-cover'}
              />
            )}

            <div className="grid grid-cols-[12rem_1fr] gap-4">
              <p className="text-gray-500">Nama *</p>
              <p>{profileLeader?.nama_lengkap}</p>
              <p className="text-gray-500">Deskripsi *</p>
              <RenderHTMLContent content={profileLeader?.isi ?? ''} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

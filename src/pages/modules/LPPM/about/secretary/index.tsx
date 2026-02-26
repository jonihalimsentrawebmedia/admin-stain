import { useEffect, useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { FormProfileInformation } from '@/pages/modules/LPPM/about/leader/component/form.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { type ProfileData, ProfileResolver } from '../leader/hooks/resolver'
import { UseGetSecretary } from '@/pages/modules/LPPM/about/secretary/hooks'

export const ProfileSecretaryPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { detailSecretary } = UseGetSecretary()

  const form = useForm<ProfileData>({
    resolver: zodResolver(ProfileResolver),
  })

  useEffect(() => {
    if (detailSecretary) {
      form.reset({
        nama: detailSecretary?.nama_sekretaris,
        deskripsi: detailSecretary?.deskripsi,
        url_gambar: detailSecretary?.url_gambar,
      })
    }
  }, [detailSecretary])

  const queryClient = useQueryClient()

  const HandleSave = async (e: ProfileData) => {
    setLoading(true)
    await AxiosClient.post('/lppm/sekretaris', {
      ...e,
      nama_sekretaris: e.nama,
    })
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['about-secretary'],
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
            label={'Profil Sekretaris LPPM'}
          />
        </>
      ) : (
        <>
          <div className={'mt-5 flex flex-col gap-5'}>
            <ButtonTitleGroup
              label={'Profil Sekretaris LPPM'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />

            {detailSecretary?.url_gambar && (
              <img
                src={detailSecretary?.url_gambar}
                alt={'leader'}
                className={'size-[320px] w-[240px] object-cover'}
              />
            )}

            <div className="grid grid-cols-[12rem_1fr] gap-4">
              <p className="text-gray-500">Nama *</p>
              <p>{detailSecretary?.nama_sekretaris}</p>
              <p className="text-gray-500">Deskripsi *</p>
              <RenderHTMLContent content={detailSecretary?.deskripsi ?? ''} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

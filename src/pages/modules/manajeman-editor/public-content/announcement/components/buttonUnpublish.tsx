import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import { MdCancel } from 'react-icons/md'

export const ButtonAnnouncementUnpublishManagementEditor = (data: IAnnouncement) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSubmission = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/pengumuman/${data?.id_pengumuman}/status-publish`, {
      status_publish: 'UNPUBLISH',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Publish data Pengumuman')
          queryClient.invalidateQueries({
            queryKey: ['management-editor-announcement'],
          })
          queryClient.invalidateQueries({
            queryKey: ['management-editor-announcement-status'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        size={'sm'}
        variant={'outline'}
        className={'text-red-500 border-red-500 hover:text-red-500'}
      >
        <MdCancel />
        Unpublish
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        isAuto
        className={'rounded lg:max-w-xl'}
        title={'Unpublish Pengumuman'}
        description={'Apakah anda yakin untuk mengUnpublish Pengumuman yang dipilih?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <p className="text-gray-500">Judul</p>
          <p>{data?.judul_pengumuman}</p>
          <p className="text-gray-500">Penulis</p>
          <p>{data?.penulis}</p>

          <div className="flex items-center justify-end">
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
                {
                  type: 'add',
                  label: '',
                  element: (
                    <Button
                      disabled={loading}
                      className={'bg-red-500 hover:bg-red-600'}
                      onClick={HandleSubmission}
                    >
                      <MdCancel />
                      Unpublish Pengumuman
                    </Button>
                  ),
                  onClick: () => setOpen(!open),
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

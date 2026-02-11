import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import { Check } from 'lucide-react'

export const ButtonAnnouncementPublish = (data: IAnnouncement) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSubmission = async () => {
    setLoading(true)
    await AxiosClient.patch(`/lembaga/pengumuman/${data?.id_pengumuman}/status-publish`, {
      status_publish: 'PUBLISHED',
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Publish data Pengumuman')
          queryClient.invalidateQueries({
            queryKey: ['list-announcement-lembaga'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-announcement-lembaga'],
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
        className={'text-green-500 border-green-500 hover:text-green-500'}
      >
        <Check />
        Publish Sekarang
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Publish Pengumuman'}
        description={'Apakah anda yakin untuk mempublish Pengumuman yang dipilih?'}
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
                      className={'bg-green-500 hover:bg-green-600'}
                      onClick={HandleSubmission}
                    >
                      <Check />
                      Publish Sekarang
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

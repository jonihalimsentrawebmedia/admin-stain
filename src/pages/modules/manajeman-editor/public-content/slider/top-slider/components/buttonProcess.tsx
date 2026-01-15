import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { FastForward } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ButtonProcessManagementEditor = (data: IListSlider) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`editor/slider-atas/${data?.id_slider_atas}/status-publish`, {
      status_publish: 'PROSES_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
           queryClient.invalidateQueries({
            queryKey: ['list-slider-draft-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-slider-editor'],
          })
          toast.success(res.data.message || 'Success Mengajukan data berita')
          setOpen(false)
          setLoading(false)
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
        className={'border-primary text-primary hover:text-green-600'}
      >
        <FastForward />
        Proses Konten
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Proses Konten'}
        description={'Apakah anda yakin untuk memproses konten yang diajukan?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div>
          <img
            src={data?.gambar}
            alt="image"
            className="w-[290px] h-[174px] rounded object-cover"
          />
          <p className={'text-gray-500'}>Keterangan</p>
          <p dangerouslySetInnerHTML={{ __html: data?.keterangan ?? '' }} />
        </div>

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
                      className={'bg-primary hover:bg-green-600'}
                      onClick={HandleApprove}
                    >
                      <FastForward />
                      Proses Konten
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

export default ButtonProcessManagementEditor

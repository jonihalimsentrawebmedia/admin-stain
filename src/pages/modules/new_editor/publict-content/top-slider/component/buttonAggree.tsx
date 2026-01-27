import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import AxiosClient from '@/provider/axios.tsx'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ButtonAgreeManagementEditor = (data: IListSlider) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/slider-atas/${data?.id_slider_atas}/status-publish`, {
      status_publish: 'DISETUJUI_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
          navigate('/modules/editor/dashboard')
          toast.success(res.data.message || 'Success Mengajukan data pengumuman')
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
        className={'border-green-500 text-green-500 hover:text-green-600'}
      >
        <Check />
        Setujui
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Setujui Slider Atas'}
        description={'Apakah anda yakin untuk menyetujui slider atas?'}
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
                      className={'border-green-500 text-white hover:text-white'}
                      onClick={HandleApprove}
                    >
                      <Check />
                      Setujui
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

export default ButtonAgreeManagementEditor

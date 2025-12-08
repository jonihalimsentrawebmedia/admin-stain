import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Check } from 'lucide-react'

interface Props {
  data: IListBottomSlider
}

export const ButtonPublishedBottom = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.patch(`website-utama/slider-bawah/${data?.id_slider_bawah}/status-publish`, {
      status_publish: 'PUBLISHED',
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message || 'Success Mengajukan data slider bawah')
          queryClient.invalidateQueries({
            queryKey: ['list-slider-bottom'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-slider-bottom'],
          })
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
        Publish Sekarang
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded'}
        title={'Ajukan Ke Editor?'}
        description={'Apakah anda yakin untuk mengajukan slider ini ke editor?'}
      >
        <div>
          <img
            src={data?.gambar}
            alt="image"
            className="w-[290px] h-[174px] rounded object-cover"
          />
          <p className={'text-gray-500'}>Keterangan</p>
          <p dangerouslySetInnerHTML={{ __html: data?.keterangan ?? '' }} />
        </div>

        <div className={'flex justify-end gap-1.5'}>
          <Button
            onClick={() => setOpen(!open)}
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
          >
            Batal
          </Button>
          <Button
            variant={'outline'}
            disabled={loading}
            onClick={HandlerDelete}
            className={'border-green-500 text-green-500 hover:text-green-600'}
          >
            <Check />
            Publish Sekarang
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

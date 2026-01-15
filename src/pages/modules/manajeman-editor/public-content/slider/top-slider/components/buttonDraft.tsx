import { IconCancel } from '@/components/common/icon'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'

interface Props {
  data: IListSlider
}

export const ButtonDraft = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDraft = async () => {
    setLoading(true)
    await AxiosClient.patch(`editor/slider-atas/${data?.id_slider_atas}/status-publish`, {
      status_publish: 'DRAFT',
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message || 'Success Mengajukan data slider atas')
          queryClient.invalidateQueries({
            queryKey: ['list-slider-draft-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-slider-editor'],
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
        variant={'outline'}
        className={'border border-yellow-500 hover:text-yellow-500 text-yellow-500'}
      >
        <IconCancel />
        Kembali Ke Draft
      </Button>

      <DialogCustom
        open={open}
        isAuto
        setOpen={setOpen}
        className={'rounded lg:min-w-2xl'}
        title={'Kembali Ke Draft'}
        description={'Apakah anda yakin untuk mengembalikan draft yang diajukan ke draft?'}
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
            disabled={loading}
            onClick={HandlerDraft}
            className={'border bg-yellow-500 hover:bg-yellow-600'}
          >
            <IconCancel color={'fill-white'} />
            Kembalikan Ke Draft
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

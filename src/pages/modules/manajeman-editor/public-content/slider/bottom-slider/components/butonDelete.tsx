import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface Props {
  data: IListBottomSlider
}

export const ButonDeleteBottomSlider = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/editor/slider-bawah/${data?.id_slider_bawah}`)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message || 'Success menghapus data slider Bawah')
          queryClient.invalidateQueries({
            queryKey: ['list-slider-bottom-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-slider-bottom-editor'],
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
      >
        <FaTrash />
      </button>
      <DialogCustom
        className={'rounded'}
        open={open}
        isAuto
        setOpen={setOpen}
        title={'Hapus Data Slider Bawah?'}
        description={'Apakah anda yakin untuk menghapus sldier yang dipilih?'}
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
          <Button disabled={loading} onClick={HandlerDelete} variant={'destructive'}>
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

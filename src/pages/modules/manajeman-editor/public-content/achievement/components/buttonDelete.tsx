import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IAchievementDetail } from '@/pages/modules/new_editor/publict-content/achievement/data/index'

export const ButtonDeleteAchievement = (data: IAchievementDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/editor/prestasi/${data?.id_prestasi}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data inovasi berdampak')
          queryClient.invalidateQueries({
            queryKey: ['list-achievement-editor'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-achievement-editor'],
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        className={'rounded'}
        setOpen={setOpen}
        title={'Hapus Konten Prestasi?'}
        description={'Apakah anda yakin untuk menghapus Prestasi yang ditulis?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          {data?.gambar_tambahan.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {data?.gambar_tambahan.map((item, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={item?.gambar}
                      className={'w-full h-[250px] object-cover'}
                      alt={item?.keterangan}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className={'absolute right-0 bottom-0'} />
              <CarouselPrevious className={'absolute left-0 bottom-0'} />
            </Carousel>
          ) : (
            <img src={data?.gambar} alt={'image'} className={'w-full h-[250px] object-cover'} />
          )}

          <p className="text-gray-500">Judul</p>
          <p>{data?.judul}</p>
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
                    <Button disabled={loading} variant={'destructive'} onClick={HandlerDelete}>
                      <FaTrash />
                      Hapus
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
